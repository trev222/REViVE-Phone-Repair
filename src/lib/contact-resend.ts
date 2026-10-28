import type { ContactSender } from "./contact";

export function createResendSender(apiKey?: string): ContactSender | undefined {
  const key = apiKey?.trim();
  if (!key) return undefined;

  return async (message) => {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      // Workers supports manual/follow only. Reject redirects via response.ok
      // instead of forwarding the sending key to another destination.
      redirect: "manual",
      signal: AbortSignal.timeout(15_000),
      body: JSON.stringify({
        from: "REViVE website quotes <quotes@notifications.revivephonerepair.com>",
        to: ["revivecovington@gmail.com"],
        reply_to: message.replyTo.address,
        subject: message.subject,
        text: message.text,
      }),
    });
    if (!response.ok) {
      await response.body?.cancel();
      throw new Error("Email provider rejected the request.");
    }
    const result: unknown = await response.json();
    if (
      !result ||
      typeof result !== "object" ||
      !("id" in result) ||
      typeof result.id !== "string" ||
      !result.id.trim()
    ) {
      throw new Error("Email provider did not confirm acceptance.");
    }
  };
}
