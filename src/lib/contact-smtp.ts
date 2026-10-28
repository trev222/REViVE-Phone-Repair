import nodemailer from "nodemailer";
import type { ContactEnvironment, ContactSender } from "./contact";
import { site } from "./site";

export function createSmtpSender(
  environment: ContactEnvironment,
): ContactSender | undefined {
  const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD, CONTACT_FROM } = environment;
  const port = Number(environment.SMTP_PORT || "587");
  if (
    !SMTP_HOST ||
    !CONTACT_FROM ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535 ||
    Boolean(SMTP_USER) !== Boolean(SMTP_PASSWORD)
  )
    return undefined;

  return async (message) => {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: environment.SMTP_SECURE
        ? environment.SMTP_SECURE === "true"
        : port === 465,
      requireTLS: environment.SMTP_REQUIRE_TLS !== "false",
      auth:
        SMTP_USER && SMTP_PASSWORD
          ? { user: SMTP_USER, pass: SMTP_PASSWORD }
          : undefined,
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
      disableFileAccess: true,
      disableUrlAccess: true,
    });
    try {
      const result = await transport.sendMail({
        ...message,
        from: CONTACT_FROM,
        to: environment.CONTACT_TO || site.email,
      });
      if (!result.accepted.length || result.rejected.length)
        throw new Error("Recipient rejected");
    } finally {
      transport.close();
    }
  };
}
