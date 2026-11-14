"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { LogoMark } from "./logo";
import { SearchButton } from "./search";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/") || (href === "/articles" && pathname.startsWith("/articles")));

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-ink-950/95 backdrop-blur-xl">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-amber-400 focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-ink-950">
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 text-white" aria-label={`${site.name} home`}>
          <LogoMark />
          <span className="font-display text-[19px] font-semibold tracking-tight">
            IA <span className="text-amber-400">Playbook</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active(item.href) ? "page" : undefined}
              className={cn("rounded-md px-3 py-2 text-sm transition-colors hover:text-white", active(item.href) ? "text-white" : "text-mist")}
            >
              {item.label}
              {active(item.href) && <span className="mx-auto mt-0.5 block h-0.5 w-4 rounded bg-amber-400" aria-hidden="true" />}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <SearchButton />
          <button
            ref={toggle}
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md text-white hover:bg-white/10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-white/[0.07] bg-ink-950 lg:hidden">
          <Container className="flex flex-col py-2">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-white/[0.06] py-3.5 text-[15px] text-mist hover:text-white">
                {item.label}
              </Link>
            ))}
            <Link href="/resources" onClick={() => setOpen(false)} className="py-3.5 text-[15px] text-mist hover:text-white">Resources</Link>
          </Container>
        </nav>
      )}
    </header>
  );
}
