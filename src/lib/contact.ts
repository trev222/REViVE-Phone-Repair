import nodemailer from "nodemailer";
import { site } from "./site";

export type ContactEnvironment = Partial<
  Record<
    | "SITE_URL"
    | "SMTP_HOST"
    | "SMTP_USER"
    | "SMTP_PASSWORD"
    | "SMTP_PORT"
    | "SMTP_SECURE"
    | "SMTP_REQUIRE_TLS"
    | "CONTACT_FROM"
    | "CONTACT_TO",
    string
  >
>;
const maximumBodyBytes = 24_000;

function error(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export async function handleContact(
  request: Request,
  environment: ContactEnvironment,
) {
  const origin = request.headers.get("origin");
  const requestUrl = new URL(request.url);
  // Next.js may normalize request.url to localhost even when the browser uses
  // 127.0.0.1. Match the incoming Host as well as the configured public origin.
  const requestOrigin = `${requestUrl.protocol}//${request.headers.get("host") || requestUrl.host}`;
  if (
    origin &&
    origin !== requestOrigin &&
    origin !== new URL(environment.SITE_URL || site.url).origin
  ) {
    return error("Please submit the form from our website.", 403);
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return error("Please submit the contact form as JSON.", 415);
  }
  if (Number(request.headers.get("content-length")) > maximumBodyBytes) {
    return error("Your message is too long.", 413);
  }

  let data: Record<string, unknown>;
  try {
    // Bound the actual stream too; Content-Length may be absent or inaccurate.
    const reader = request.body?.getReader();
    if (!reader) return error("Please complete the contact form.", 400);
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > maximumBodyBytes) {
        await reader.cancel();
        return error("Your message is too long.", 413);
      }
      chunks.push(value);
    }
    const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      return error("Please complete the contact form.", 400);
    data = parsed as Record<string, unknown>;
  } catch {
    return error("Please complete the contact form.", 400);
  }

  // Silently discard submissions that fill the hidden anti-spam field.
  if (typeof data.address === "string" && data.address.trim())
    return Response.json({ ok: true });
  const field = (key: string) =>
    typeof data[key] === "string" ? data[key].trim() : "";
  const quoteRequest = "first_name" in data || "last_name" in data;
  const firstName = field("first_name");
  const lastName = field("last_name");
  if (
    quoteRequest &&
    [firstName, lastName].some(
      (value) => !value || value.length > 50 || /[\r\n]/.test(value),
    )
  ) {
    return error(
      "Please enter your first and last name, each 50 characters or fewer.",
      400,
    );
  }
  const name = quoteRequest ? `${firstName} ${lastName}` : field("name");
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const message = field(quoteRequest ? "notes" : "message");
  const phone = field("phone");
  const service = field("service_type");
  const preferredDate = field("preferred_date");
  const timeWindow = field("time_window");
  const serviceLabels: Record<string, string> = {
    "screen-repair": "Screen repair",
    battery: "Battery replacement",
    "water-damage": "Water damage repair",
    buyback: "Sell / trade-in my phone",
    other: "Other repair",
  };
  const timeLabels: Record<string, string> = {
    morning: "Morning (10 am – 12 pm)",
    afternoon: "Afternoon (12 pm – 3 pm)",
    "late-afternoon": "Late afternoon (3 pm – 5 pm)",
  };
  if (data.location !== "covington")
    return error("Please select the Covington location.", 400);
  if (!name || name.length > (quoteRequest ? 101 : 50) || /[\r\n]/.test(name))
    return error("Please enter a name of 50 characters or fewer.", 400);
  if (
    !email ||
    email.length > 254 ||
    !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)
  )
    return error("Please enter a valid email address.", 400);
  if ((!quoteRequest && !message) || message.length > 5000)
    return error("Please enter a message of 5,000 characters or fewer.", 400);
  if (phone && (phone.length > 40 || !/^[\d+(). x-]+$/i.test(phone)))
    return error("Please enter a valid phone number.", 400);
  if (service && !Object.hasOwn(serviceLabels, service))
    return error("Please choose one of the listed services.", 400);
  if (timeWindow && !Object.hasOwn(timeLabels, timeWindow))
    return error("Please choose one of the listed contact times.", 400);
  if (
    preferredDate &&
    (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate) ||
      !Number.isFinite(Date.parse(preferredDate)) ||
      new Date(preferredDate).toISOString().slice(0, 10) !== preferredDate)
  )
    return error("Please enter a valid preferred date.", 400);

  const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD, CONTACT_FROM } = environment;
  const port = Number(environment.SMTP_PORT || "587");
  if (
    !SMTP_HOST ||
    !CONTACT_FROM ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535 ||
    Boolean(SMTP_USER) !== Boolean(SMTP_PASSWORD)
  ) {
    return error(
      "The contact form is temporarily unavailable. Please email or call us directly.",
      503,
    );
  }

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
      from: CONTACT_FROM,
      to: environment.CONTACT_TO || site.email,
      replyTo: { name, address: email },
      subject: "Revive my Phone!",
      text: `Location: Covington\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nService: ${service ? serviceLabels[service] : "Not specified"}\nPreferred date: ${preferredDate || "Not specified"}\nBest time to reach visitor: ${timeWindow ? timeLabels[timeWindow] : "Not specified"}\n\nMessage:\n${message || "No additional details."}`,
    });
    if (!result.accepted.length || result.rejected.length)
      throw new Error("Recipient rejected");
    return Response.json({ ok: true });
  } catch {
    // Do not log customer messages or SMTP credentials.
    console.error("Contact email delivery failed.");
    return error(
      "We couldn’t send your message. Please try again or contact us directly.",
      502,
    );
  } finally {
    transport.close();
  }
}
