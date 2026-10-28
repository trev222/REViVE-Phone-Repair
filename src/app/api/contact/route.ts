import { handleContact } from "@/lib/contact";

export const runtime = "nodejs";

export function POST(request: Request) {
  return handleContact(request, {
    SITE_URL: process.env.SITE_URL,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_SECURE: process.env.SMTP_SECURE,
    SMTP_REQUIRE_TLS: process.env.SMTP_REQUIRE_TLS,
    CONTACT_FROM: process.env.CONTACT_FROM,
    CONTACT_TO: process.env.CONTACT_TO,
  });
}
