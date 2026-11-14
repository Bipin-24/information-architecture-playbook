"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 1800); } catch { /* clipboard unavailable: ignore */ }
      }}
      className="inline-flex h-9 items-center gap-2 rounded-md border border-line bg-card px-3 text-sm font-medium transition-colors hover:border-amber-500"
      aria-label={`Copy ${label} to clipboard`}
    >
      {done ? <Check className="size-4 text-emerald-700" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
      <span aria-live="polite">{done ? "Copied" : "Copy"}</span>
    </button>
  );
}
