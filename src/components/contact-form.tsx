"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/lib/site";

type Feedback = { kind: "error" | "success"; message: string } | null;

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (feedback) feedbackRef.current?.focus(); }, [feedback]);

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
        setFeedback({ kind: "error", message: result.error || "Your message could not be sent. Please try again or contact us directly." });
      } else {
        form.reset();
        setFeedback({ kind: "success", message: "Thank you. Your message has been submitted. We’ll get back to you as soon as possible." });
      }
    } catch {
      setFeedback({ kind: "error", message: "We couldn’t connect to send your message. Please try again or contact us directly." });
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="contact-form">
      <h2>Contact Form</h2>
      {feedback && <div ref={feedbackRef} tabIndex={-1} className={`form-feedback ${feedback.kind}`} role={feedback.kind === "error" ? "alert" : "status"}>
        <p>{feedback.message}</p>
        {feedback.kind === "error" && <p><a href={`mailto:${site.email}`}>Email {site.email}</a> or <a href={site.phoneHref}>call {site.phone}</a>.</p>}
      </div>}
      <form action="/api/contact" method="post" onSubmit={submit} aria-busy={pending}>
        <fieldset disabled={pending}>
          <label htmlFor="location">Location</label>
          <select name="location" id="location"><option value="covington">Covington</option></select>
          <label htmlFor="name">Name <span>(required)</span></label>
          <input type="text" name="name" id="name" autoComplete="name" required maxLength={50} />
          <label htmlFor="email">Email <span>(required)</span></label>
          <input type="email" name="email" id="email" autoComplete="email" required maxLength={254} />
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="address">Leave this field empty</label>
            <input type="text" name="address" id="address" tabIndex={-1} autoComplete="off" />
          </div>
          <label htmlFor="message">Message <span>(required)</span></label>
          <textarea name="message" id="message" rows={5} required maxLength={5000} />
          <button type="submit" className="send-button">{pending ? "Sending…" : "Send"}</button>
        </fieldset>
      </form>
      <noscript><p>Please enable JavaScript to use this form, or <a href={`mailto:${site.email}`}>email us directly</a>.</p></noscript>
    </section>
  );
}
