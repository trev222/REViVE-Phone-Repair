"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/lib/site";

type Feedback = { kind: "error" | "success"; message: string } | null;

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (feedback) feedbackRef.current?.focus();
  }, [feedback]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    setPending(true);
    setFeedback(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await response.json();
      if (!response.ok) {
        setFeedback({
          kind: "error",
          message:
            result.error ||
            "Your message could not be sent. Please try again or contact us directly.",
        });
      } else {
        form.reset();
        setFeedback({
          kind: "success",
          message:
            "Thank you. Your request has been sent. We’ll contact you to confirm the details and any preferred visit time.",
        });
      }
    } catch {
      setFeedback({
        kind: "error",
        message:
          "We couldn’t connect to send your message. Please try again or contact us directly.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      action="/api/contact"
      method="post"
      onSubmit={submit}
      aria-busy={pending}
      className="booking-form"
      aria-labelledby="form-heading"
    >
      <span
        id="form-heading"
        style={{
          whiteSpace: "pre-line",
          fontFamily: "var(--font-sans)",
          fontSize: "12px",
          fontWeight: "500",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "hsl(var(--muted-foreground))",
          display: "block",
          marginBottom: "24px",
        }}
      >
        Send us a message
      </span>
      {feedback && (
        <div
          ref={feedbackRef}
          tabIndex={-1}
          className={`form-feedback ${feedback.kind}`}
          role={feedback.kind === "error" ? "alert" : "status"}
        >
          <p>{feedback.message}</p>
          {feedback.kind === "error" && (
            <p>
              <a href={`mailto:${site.email}`}>Email us</a> or{" "}
              <a href={site.phoneHref}>call {site.phone}</a>.
            </p>
          )}
        </div>
      )}
      <input type="hidden" name="location" value="covington" />
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="address">Leave this field empty</label>
        <input
          type="text"
          name="address"
          id="address"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <fieldset disabled={pending} className="contents">
        <div className="form-group" aria-label="Contact information">
          <div className="field-row">
            <div className="field">
              <label
                htmlFor="first-name"
                style={{
                  whiteSpace: "pre-line",
                  fontFamily: "var(--font-sans)",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "hsl(var(--secondary-foreground))",
                  lineHeight: "1.4",
                  display: "block",
                }}
              >
                First name
              </label>
              <input
                id="first-name"
                placeholder="First"
                autoComplete="given-name"
                required
                aria-invalid="false"
                type="text"
                name="first_name"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "hsl(var(--foreground))",
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "14px",
                  height: "48px",
                  padding: "0px 20px",
                  width: "100%",
                  appearance: "none",
                  outline: "none",
                  boxSizing: "border-box",
                  border: "1px solid hsl(var(--border))",
                  minWidth: "0",
                }}
                maxLength={50}
              />
            </div>
            <div className="field">
              <label
                htmlFor="last-name"
                style={{
                  whiteSpace: "pre-line",
                  fontFamily: "var(--font-sans)",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "hsl(var(--secondary-foreground))",
                  lineHeight: "1.4",
                  display: "block",
                }}
              >
                Last name
              </label>
              <input
                id="last-name"
                placeholder="Last"
                autoComplete="family-name"
                required
                aria-invalid="false"
                type="text"
                name="last_name"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "hsl(var(--foreground))",
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "14px",
                  height: "48px",
                  padding: "0px 20px",
                  width: "100%",
                  appearance: "none",
                  outline: "none",
                  boxSizing: "border-box",
                  border: "1px solid hsl(var(--border))",
                  minWidth: "0",
                }}
                maxLength={50}
              />
            </div>
          </div>
          <div className="field">
            <label
              htmlFor="email"
              style={{
                whiteSpace: "pre-line",
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: "500",
                color: "hsl(var(--secondary-foreground))",
                lineHeight: "1.4",
                display: "block",
              }}
            >
              Email address
            </label>
            <input
              id="email"
              placeholder="name@example.com"
              autoComplete="email"
              required
              aria-invalid="false"
              type="email"
              name="email"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                fontWeight: "400",
                color: "hsl(var(--foreground))",
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
                borderRadius: "14px",
                height: "48px",
                padding: "0px 20px",
                width: "100%",
                appearance: "none",
                outline: "none",
                boxSizing: "border-box",
                border: "1px solid hsl(var(--border))",
                minWidth: "0",
              }}
              maxLength={254}
            />
          </div>
          <div className="field">
            <label
              htmlFor="phone"
              style={{
                whiteSpace: "pre-line",
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: "500",
                color: "hsl(var(--secondary-foreground))",
                lineHeight: "1.4",
                display: "block",
              }}
            >
              Phone number
            </label>
            <input
              id="phone"
              placeholder="Your phone number"
              autoComplete="tel"
              type="tel"
              name="phone"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                fontWeight: "400",
                color: "hsl(var(--foreground))",
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "14px",
                height: "48px",
                padding: "0px 20px",
                width: "100%",
                appearance: "none",
                outline: "none",
                boxSizing: "border-box",
                minWidth: "0",
              }}
              maxLength={40}
            />
          </div>
        </div>
        <div
          aria-hidden="true"
          style={{ height: "1px", backgroundColor: "hsl(var(--border))" }}
        ></div>
        <div className="form-group" aria-label="Device and visit details">
          <span
            style={{
              whiteSpace: "pre-line",
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: "500",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "hsl(var(--muted-foreground))",
              display: "block",
            }}
          >
            What do you need?
          </span>
          <div className="field">
            <label
              htmlFor="service-type"
              style={{
                whiteSpace: "pre-line",
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: "500",
                color: "hsl(var(--secondary-foreground))",
                lineHeight: "1.4",
                display: "block",
              }}
            >
              Service needed
            </label>
            <select
              defaultValue=""
              id="service-type"
              name="service_type"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                fontWeight: "400",
                color: "hsl(var(--foreground))",
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "14px",
                height: "48px",
                padding: "0px 44px 0px 20px",
                width: "100%",
                appearance: "none",
                outline: "none",
                boxSizing: "border-box",
                cursor: "pointer",
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236B6B68' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 18px center",
                minWidth: "0",
              }}
            >
              <option value="" disabled>
                Select a service…
              </option>
              <option value="screen-repair">Screen repair</option>
              <option value="battery">Battery replacement</option>
              <option value="water-damage">Water damage repair</option>
              <option value="buyback">Sell / trade-in my phone</option>
              <option value="other">Other repair</option>
            </select>
          </div>
          <div className="field-row">
            <div className="field">
              <label
                htmlFor="preferred-date"
                style={{
                  whiteSpace: "pre-line",
                  fontFamily: "var(--font-sans)",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "hsl(var(--secondary-foreground))",
                  lineHeight: "1.4",
                  display: "block",
                }}
              >
                Preferred date
              </label>
              <input
                id="preferred-date"
                type="date"
                name="preferred_date"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "hsl(var(--foreground))",
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "14px",
                  height: "48px",
                  padding: "0px 20px",
                  width: "100%",
                  appearance: "none",
                  outline: "none",
                  boxSizing: "border-box",
                  minWidth: "0",
                }}
              />
            </div>
            <div className="field">
              <label
                htmlFor="time-window"
                style={{
                  whiteSpace: "pre-line",
                  fontFamily: "var(--font-sans)",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "hsl(var(--secondary-foreground))",
                  lineHeight: "1.4",
                  display: "block",
                }}
              >
                Best time to reach you
              </label>
              <select
                id="time-window"
                name="time_window"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "hsl(var(--foreground))",
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "14px",
                  height: "48px",
                  padding: "0px 44px 0px 20px",
                  width: "100%",
                  appearance: "none",
                  outline: "none",
                  boxSizing: "border-box",
                  cursor: "pointer",
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236B6B68' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 18px center",
                  minWidth: "0",
                }}
              >
                <option value="morning">Morning (10 am – 12 pm)</option>
                <option value="afternoon">Afternoon (12 pm – 3 pm)</option>
                <option value="late-afternoon">
                  Late afternoon (3 pm – 5 pm)
                </option>
              </select>
            </div>
          </div>
          <div className="field">
            <label
              htmlFor="notes"
              style={{
                whiteSpace: "pre-line",
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: "500",
                color: "hsl(var(--secondary-foreground))",
                lineHeight: "1.4",
                display: "block",
              }}
            >
              Tell us about your device
            </label>
            <textarea
              id="notes"
              name="notes"
              placeholder="e.g. iPhone 14 Pro, cracked screen, still powers on"
              rows={3}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                fontWeight: "400",
                color: "hsl(var(--foreground))",
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "14px",
                height: "auto",
                padding: "14px 20px",
                width: "100%",
                appearance: "none",
                outline: "none",
                boxSizing: "border-box",
                resize: "vertical",
                minHeight: "96px",
                lineHeight: "1.625",
                minWidth: "0",
              }}
              maxLength={5000}
            ></textarea>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "14px",
            paddingTop: "8px",
          }}
        >
          <button
            type="submit"
            disabled={pending}
            className="contact-submit-btn"
          >
            {pending ? "Sending…" : "Send message"}
            <span aria-hidden="true" className="contact-submit-chip">
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"></path>
              </svg>
            </span>
          </button>
          <p
            style={{
              whiteSpace: "pre-line",
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: "400",
              color: "hsl(var(--muted-foreground))",
              lineHeight: "1.5",
            }}
          >
            We'll never share your info. Expect a reply within one business day.
          </p>
        </div>
      </fieldset>
      <noscript>
        <p>
          Please enable JavaScript to use this form, or{" "}
          <a href={`mailto:${site.email}`}>email us directly</a>.
        </p>
      </noscript>
    </form>
  );
}
