import { ArrowUpRightIcon, XLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/content/site";
import { BriefForm } from "@/components/main/BriefForm";
import { CopyEmailButton } from "@/components/main/CopyEmailButton";
import { Reveal } from "@/components/reveal";

const SOCIALS = [{ label: "X", href: SITE.x, icon: XLogoIcon }] as const;

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 px-4 py-16 sm:px-6 md:flex md:min-h-[calc(100dvh-4rem)] md:flex-col md:justify-center md:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
            <div>
              <div>
              <h2 className="text-3xl font-semibold tracking-tighter sm:text-4xl">
                Have something AI-adjacent to build?
              </h2>
              <p className="mt-4 max-w-[52ch] leading-relaxed text-zinc-600 dark:text-zinc-400">
                Send a brief: what you&apos;re making, plus whatever shows
                it. Links, screenshots, a Notion page, plain words. All
                welcome.
              </p>
              </div>
              <dl className="mt-10 border-t border-zinc-200 dark:border-white/10">
                <div className="grid grid-cols-[104px_1fr] items-center gap-4 border-b border-zinc-200 py-4 dark:border-white/10">
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                    Email
                  </dt>
                  <dd>
                    <CopyEmailButton email={SITE.email} />
                  </dd>
                </div>
                <div className="grid grid-cols-[104px_1fr] items-center gap-4 border-b border-zinc-200 py-4 dark:border-white/10">
                  <dt className="flex items-center font-mono text-xs uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                    <XLogoIcon size={15} aria-label="X" />
                  </dt>
                  <dd>
                    <a
                      href={SITE.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-sm text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-zinc-950 hover:decoration-zinc-500 dark:text-zinc-400 dark:decoration-white/20 dark:hover:text-white dark:hover:decoration-white/50"
                    >
                      @jaeholeeeee
                      <ArrowUpRightIcon size={14} />
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-[104px_1fr] items-center gap-4 border-b border-zinc-200 py-4 dark:border-white/10">
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                    Based in
                  </dt>
                  <dd className="text-sm text-zinc-600 dark:text-zinc-400">
                    {SITE.location} · KST (UTC+9)
                  </dd>
                </div>
                <div className="grid grid-cols-[104px_1fr] items-center gap-4 border-b border-zinc-200 py-4 dark:border-white/10">
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                    Response
                  </dt>
                  <dd className="text-sm text-zinc-600 dark:text-zinc-400">
                    Ack within 12 hours, full reply within two business days
                  </dd>
                </div>
              </dl>
            </div>
            <div className="w-full text-left">
              <BriefForm />
            </div>
          </div>
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
