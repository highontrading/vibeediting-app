"use client";

import { useState } from "react";
import { Button } from "./ui";

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
      <p className="rounded-lg border border-neon/40 bg-neon/5 px-4 py-3 text-sm">
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
        className="flex-1 rounded-lg border border-line-strong bg-bg px-3.5 py-2.5 placeholder:text-dim focus:border-neon focus:outline-none"
      />
      <Button type="submit" disabled={state === "busy"}>
        {state === "busy" ? "Sending…" : "Resend my key"}
      </Button>
      {state === "error" && <p className="text-sm text-rose">Enter a valid email address.</p>}
    </form>
  );
}
