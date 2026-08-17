"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const project = String(form.get("project") ?? "AI film project");
    const brief = String(form.get("brief") ?? "");
    const subject = `Project inquiry — ${project} — ${name}`;
    const body = `Hi Sana,\n\nI’m ${name}.\n\nProject: ${project}\n\n${brief}`;

    window.location.href = `mailto:artiste.sanasheikh@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="ticket-confirmation" role="status">
        <span>Draft opened</span>
        <p>Your email app has the project details ready to send.</p>
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
        <span>Open Project Enquiry</span>
        <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
