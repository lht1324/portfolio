"use client";

import { useEffect, useState } from "react";
import { ListIcon, MoonIcon, SunIcon, XIcon } from "@phosphor-icons/react";
import { CTA_LABEL, MAILTO, NAV_LINKS, SITE } from "@/content/site";
import { useTheme } from "@/components/theme-provider";

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

export function SiteNav() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const topEl = document.getElementById("top");
    const all = topEl ? [...targets, topEl] : targets;
    if (all.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setActive(entry.target.id === "top" ? null : `#${entry.target.id}`);
        }
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );
    all.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-zinc-200/70 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-zinc-950/80">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6"
      >
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight">
          jaeholee<span className="text-emerald-700 dark:text-emerald-400">.xyz</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={
                  isActive
                    ? "text-sm text-zinc-950 transition-colors hover:text-zinc-950 dark:text-white dark:hover:text-white"
                    : "text-sm text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                }
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggle}
            suppressHydrationWarning
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition-colors hover:border-zinc-400 active:scale-[0.98] dark:border-white/15 dark:text-zinc-300 dark:hover:border-white/40"
          >
            {theme === "dark" ? <SunIcon size={17} /> : <MoonIcon size={17} />}
          </button>
          <a
            href={MAILTO}
            className="flex h-9 items-center rounded-full bg-emerald-700 px-4 text-sm font-medium text-white transition-colors hover:bg-emerald-800 active:translate-y-[1px] dark:bg-emerald-400 dark:text-zinc-950 dark:hover:bg-emerald-300"
          >
            {CTA_LABEL}
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggle}
            suppressHydrationWarning
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 dark:border-white/15 dark:text-zinc-300"
          >
            {theme === "dark" ? <SunIcon size={17} /> : <MoonIcon size={17} />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 dark:border-white/15 dark:text-zinc-200"
          >
            {open ? <XIcon size={18} /> : <ListIcon size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-zinc-200/70 bg-white px-4 pb-6 pt-3 md:hidden dark:border-white/10 dark:bg-zinc-950">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "true" : undefined}
                  className={
                    isActive
                      ? "rounded-lg px-3 py-2.5 text-base text-zinc-950 hover:bg-zinc-100 dark:text-white dark:hover:bg-white/5"
                      : "rounded-lg px-3 py-2.5 text-base text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-white/5"
                  }
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href={MAILTO}
              className="mt-3 flex h-11 items-center justify-center rounded-full bg-emerald-700 text-sm font-medium text-white dark:bg-emerald-400 dark:text-zinc-950"
            >
              {CTA_LABEL}
            </a>
            <p className="mt-3 text-center font-mono text-xs text-zinc-500">
              {SITE.email}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
