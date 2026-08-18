"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const company = String(form.get("company") ?? "Independent");
    const project = String(form.get("project") ?? "AI film project");
    const budget = String(form.get("budget") ?? "Not specified");
    const timeline = String(form.get("timeline") ?? "Not specified");
    const brief = String(form.get("brief") ?? "");
    const subject = `Project inquiry — ${project} — ${name}`;
    const body = `Hi Sana,\n\nI’m ${name} from ${company}.\nReply to: ${email}\n\nProject: ${project}\nBudget: ${budget}\nTimeline: ${timeline}\n\nBrief:\n${brief}`;

    window.location.href = `mailto:artiste.sanasheikh@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="ticket-confirmation" role="status">
        <span>Project draft prepared</span>
        <p>Your email application has the full project brief ready to review and send.</p>
      </div>
    );
  }

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <div className="ticket-field">
        <label htmlFor="name">Your name</label>
        <input id="name" name="name" autoComplete="name" placeholder="Name / studio…" required />
      </div>

      <div className="ticket-field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" spellCheck={false} placeholder="you@studio.com…" required />
      </div>

      <div className="ticket-field">
        <label htmlFor="company">Company or artist name</label>
        <input id="company" name="company" autoComplete="organization" placeholder="Company / independent…" />
      </div>

      <div className="ticket-field">
        <label htmlFor="project">Production type</label>
        <select id="project" name="project" autoComplete="off" defaultValue="" required>
          <option value="" disabled>Select a format</option>
          <option>Cinematic AI ad</option>
          <option>Music video</option>
          <option>Brand identity film</option>
          <option>Short film / trailer</option>
          <option>Creative direction</option>
        </select>
      </div>

      <div className="ticket-field">
        <label htmlFor="budget">Budget range</label>
        <select id="budget" name="budget" autoComplete="off" defaultValue="" required>
          <option value="" disabled>Select a range</option>
          <option>Under ₹50K</option>
          <option>₹50K – ₹2L</option>
          <option>₹2L – ₹10L</option>
          <option>International budget</option>
        </select>
      </div>

      <div className="ticket-field">
        <label htmlFor="timeline">Desired timeline</label>
        <select id="timeline" name="timeline" autoComplete="off" defaultValue="" required>
          <option value="" disabled>Select timing</option>
          <option>Within 2 weeks</option>
          <option>Within 1 month</option>
          <option>1–3 months</option>
          <option>Exploring / flexible</option>
        </select>
      </div>

      <div className="ticket-field ticket-field-wide">
        <label htmlFor="brief">The brief</label>
        <textarea
          id="brief"
          name="brief"
          autoComplete="off"
          rows={4}
          placeholder="What should the audience feel? Share the story, timing and scope…"
          required
        />
      </div>

      <button className="ticket-submit" type="submit">
        <span>Prepare Email Enquiry</span>
        <span aria-hidden="true">↗</span>
      </button>
      <p className="ticket-note">Opens a pre-filled email draft. Sana responds to project enquiries within 48 hours.</p>
    </form>
  );
}
