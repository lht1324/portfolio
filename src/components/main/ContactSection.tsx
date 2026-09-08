import {
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
import { CTA_LABEL, MAILTO, SITE } from "@/content/site";
import { Reveal } from "@/components/reveal";

const SOCIALS = [
  { label: "GitHub", href: SITE.github, icon: GithubLogo },
  { label: "LinkedIn", href: SITE.linkedin, icon: LinkedinLogo },
  { label: "X", href: SITE.x, icon: XLogo },
] as const;

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto w-full max-w-3xl text-center">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tighter sm:text-4xl">
            Have something AI-adjacent to build?
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] leading-relaxed text-zinc-600 dark:text-zinc-400">
            Send a brief: what you&apos;re making, relevant links, budget range,
            timeline. Ack within 12 hours, full reply within two business
            days.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <a
              href={MAILTO}
              className="flex h-12 items-center rounded-full bg-emerald-700 px-8 text-sm font-medium text-white transition-colors hover:bg-emerald-800 active:translate-y-[1px] dark:bg-emerald-400 dark:text-zinc-950 dark:hover:bg-emerald-300"
            >
              {CTA_LABEL}
            </a>
            <a
              href={MAILTO}
              className="flex items-center gap-2 font-mono text-sm text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
            >
              <EnvelopeSimple size={16} />
              {SITE.email}
            </a>
          </div>
          <ul className="mt-8 flex items-center justify-center gap-3">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${SITE.name} on ${social.label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition-colors hover:border-zinc-500 hover:text-zinc-950 active:scale-[0.98] dark:border-white/15 dark:text-zinc-300 dark:hover:border-white/40 dark:hover:text-white"
                >
                  <social.icon size={18} />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 px-4 py-8 sm:px-6 dark:border-white/10">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
          © 2026 {SITE.name} · {SITE.location}
        </p>
        <div className="flex items-center gap-5 font-mono text-xs text-zinc-500 dark:text-zinc-400">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-zinc-900 dark:hover:text-white"
            >
              {social.label}
            </a>
          ))}
          <a
            href="#top"
            className="transition-colors hover:text-zinc-900 dark:hover:text-white"
          >
            Top
          </a>
        </div>
      </div>
    </footer>
  );
}
