import Image from "next/image";
import { SITE, STACK, TIMELINE } from "@/content/site";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 px-4 py-20 sm:px-6 md:min-h-[calc(100dvh-4rem)] md:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <h2 className="max-w-xl text-3xl font-semibold tracking-tighter sm:text-4xl">
            About
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <a
              href="/pfp.jpg"
              target="_blank"
              rel="noreferrer"
              aria-label={`Open full-resolution portrait of ${SITE.name} in a new tab`}
              title="Open full-resolution portrait"
              className="block cursor-zoom-in"
            >
              <Image
                src="/pfp.webp"
                alt={`Portrait of ${SITE.name}`}
              width={640}
              height={800}
              loading="lazy"
              sizes="(max-width: 1023px) 90vw, 480px"
              className="aspect-[4/5] w-full rounded-2xl border border-zinc-200 object-cover dark:border-white/15"
              />
            </a>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="max-w-[60ch] text-lg leading-relaxed">
                I&apos;m Jaeho Lee, a freelance developer in Seoul. I spent two
                years as a developer at AutoCrypt, then went independent to
                build AI products full time.
              </p>
              <p className="mt-4 max-w-[60ch] leading-relaxed text-zinc-600 dark:text-zinc-400">
                My work lives where AI demos meet production reality: media
                pipelines, billing, and code that survives contact with real
                users.
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Core stack">
                {STACK.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-zinc-900 px-3.5 py-1.5 font-mono text-xs text-white dark:bg-zinc-100 dark:text-zinc-950"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <ol className="mt-10 border-t border-zinc-200 dark:border-white/10">
                {TIMELINE.map((entry) => (
                  <li
                    key={entry.title}
                    className="grid gap-1 border-b border-zinc-200 py-5 sm:grid-cols-[140px_1fr] sm:gap-6 dark:border-white/10"
                  >
                    <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      {entry.period}
                    </span>
                    <span>
                      <span className="block font-medium">{entry.title}</span>
                      {entry.detail && (
                        <span className="mt-1 block text-sm text-zinc-600 dark:text-zinc-400">
                          {entry.detail}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
