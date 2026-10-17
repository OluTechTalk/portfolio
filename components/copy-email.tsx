"use client";

import { useState } from "react";

// The email is shown as selectable text; this button copies it, falling back
// to selecting the text when the clipboard API isn't available.
export function CopyEmail({ email }: { email: string }) {
  const [label, setLabel] = useState("Copy address");

  function reset() {
    setTimeout(() => setLabel("Copy address"), 2200);
  }

  function selectText() {
    const el = document.getElementById("contact-email");
    if (!el) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    setLabel("Press copy to finish");
    reset();
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setLabel("Copied");
      reset();
    } catch {
      selectText();
    }
  }

  return (
    <>
      <span className="email" id="contact-email">
        {email}
      </span>
      <button type="button" className="btn" onClick={copy}>
        <span aria-live="polite">{label}</span>
      </button>
    </>
  );
}
