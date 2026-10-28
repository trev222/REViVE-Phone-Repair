import { handleContact } from "../src/lib/contact";

type RateLimiter = {
  limit(options: { key: string }): Promise<{ success: boolean }>;
};
type EmailBinding = {
  send(message: {
    from: { email: string; name: string };
    to: string;
    replyTo: { email: string; name: string };
    subject: string;
    text: string;
  }): Promise<{ messageId: string }>;
};
export type EmailEnvironment = {
  EMAIL?: EmailBinding;
  CONTACT_RATE_LIMITER?: RateLimiter;
  CONTACT_SITE_LIMITER?: RateLimiter;
  CONTACT_EMAIL_ENABLED?: string;
};

// This Worker is private: Pages calls it through the CONTACT_EMAIL service binding.
// Sender and recipient are fixed here and in the email binding, never supplied by a visitor.
export default {
  async fetch(
    request: Request,
    environment: EmailEnvironment,
  ): Promise<Response> {
    const respond = (error: string, status: number) =>
      Response.json(
        { error },
        { status, headers: { "Cache-Control": "no-store" } },
      );
    if (new URL(request.url).pathname !== "/api/contact")
      return respond("Not found.", 404);
    if (request.method !== "POST")
      return new Response(null, {
        status: 405,
        headers: { Allow: "POST", "Cache-Control": "no-store" },
      });
    if (
      environment.CONTACT_EMAIL_ENABLED !== "true" ||
      !environment.EMAIL ||
      !environment.CONTACT_RATE_LIMITER ||
      !environment.CONTACT_SITE_LIMITER
    ) {
      return respond(
        "The contact form is temporarily unavailable. Please email or call us directly.",
        503,
      );
    }

    const sender = async (message: {
      replyTo: { name: string; address: string };
      subject: string;
      text: string;
    }) => {
      const result = await environment.EMAIL!.send({
        from: {
          email: "quotes@revivephonerepair.com",
          name: "REViVE website quotes",
        },
        to: "revivecovington@gmail.com",
        replyTo: { name: message.replyTo.name, email: message.replyTo.address },
        subject: message.subject,
        text: message.text,
      });
      if (!result?.messageId)
        throw new Error("Email provider did not acknowledge the message");
    };

    try {
      // Cloudflare supplies this header on the public Pages request. IPs are not logged or stored.
      const ip = request.headers.get("CF-Connecting-IP");
      if (!ip)
        return respond(
          "We couldn’t verify your request. Please email or call us directly.",
          503,
        );
      const perVisitor = await environment.CONTACT_RATE_LIMITER.limit({
        key: ip,
      });
      if (!perVisitor.success)
        return respond(
          "Too many requests. Please wait a minute and try again.",
          429,
        );
      // Both limits are approximate and local to each Cloudflare location.
      const total = await environment.CONTACT_SITE_LIMITER.limit({
        key: "contact",
      });
      if (!total.success)
        return respond(
          "We’re receiving too many requests. Please wait a minute or call us directly.",
          429,
        );
      const response = await handleContact(
        request,
        { SITE_URL: "https://revivephonerepair.com" },
        sender,
      );
      response.headers.set("Cache-Control", "no-store");
      return response;
    } catch {
      console.error("Contact email service unavailable.");
      return respond(
        "We couldn’t send your message. Please try again or contact us directly.",
        502,
      );
    }
  },
};
