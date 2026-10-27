"use client";

import { useState } from "react";
import { PillButton } from "./ui";

export function ResendForm() {
  const [state, setState] = useState<"idle" | "busy" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("busy");
    const email = new FormData(e.currentTarget).get("email");
    const res = await fetch("/api/license/resend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setState(res.ok ? "sent" : "error");
  }

  if (state === "sent") {
    return (
      <p className="rounded-2xl border border-ink bg-green px-4 py-3 text-sm">
        If that email bought vibeediting, the license key is on its way. Check your spam folder too. You can ask
        again after 5 minutes.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        name="email"
        required
        placeholder="you@example.com"
        autoComplete="email"
        className="flex-1 rounded-full border border-ink bg-paper px-5 py-3 placeholder:text-ink-mute focus:shadow-sticker focus:outline-none"
      />
      <PillButton type="submit" variant="solid" disabled={state === "busy"}>
        {state === "busy" ? "Sending…" : "Resend my key"}
      </PillButton>
      {state === "error" && <p className="text-sm text-pink-deep">Enter a valid email address.</p>}
    </form>
  );
}
