import { handleContact, type ContactEnvironment } from "../src/lib/contact";
import { createSmtpSender } from "../src/lib/contact-smtp";

type Environment = ContactEnvironment & {
  ASSETS: { fetch(request: Request): Promise<Response> };
  CONTACT_EMAIL?: { fetch(request: Request): Promise<Response> };
};

export default {
  async fetch(request: Request, environment: Environment): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") {
        return Response.json(
          { error: "Use the contact form to send a message." },
          { status: 405, headers: { Allow: "POST" } },
        );
      }
      let response: Response;
      try {
        response = environment.CONTACT_EMAIL
          ? await environment.CONTACT_EMAIL.fetch(request)
          : await handleContact(
              request,
              environment,
              createSmtpSender(environment),
            );
      } catch {
        response = Response.json(
          {
            error:
              "We couldn’t send your message. Please try again or contact us directly.",
          },
          { status: 502 },
        );
      }
      // Responses returned by a service binding can have immutable headers.
      const result = new Response(response.body, response);
      result.headers.set("Cache-Control", "no-store");
      return result;
    }
    if (url.pathname.startsWith("/api/")) {
      return Response.json({ error: "Not found." }, { status: 404 });
    }
    return environment.ASSETS.fetch(request);
  },
};
