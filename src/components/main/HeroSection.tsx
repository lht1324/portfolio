import Image from "next/image";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { CTA_LABEL, SITE } from "@/content/site";
import { Reveal } from "@/components/reveal";

export function HeroSection() {
  return (
    <section id="top" className="scroll-mt-24 px-4 pt-24 sm:px-6 md:flex md:min-h-[calc(100dvh-4rem)] md:flex-col md:justify-center md:py-16">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-7">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-zinc-200 py-1.5 pl-3 pr-4 text-xs text-zinc-600 dark:border-white/15 dark:text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for new projects · Seoul (KST)
          </p>
          <h1 className="mt-6 max-w-xl text-4xl font-semibold leading-[1.05] tracking-tighter sm:text-5xl lg:text-6xl">
            I ship AI products{" "}
            <span className="text-emerald-700 dark:text-emerald-400">
              past the demo stage.
            </span>
          </h1>
          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Freelance developer for Replicate and fal.ai builds, production
            refactors, and MVPs that actually launch.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="flex h-12 items-center justify-center rounded-full bg-emerald-700 px-7 text-sm font-medium text-white transition-colors hover:bg-emerald-800 active:translate-y-[1px] sm:w-auto dark:bg-emerald-400 dark:text-zinc-950 dark:hover:bg-emerald-300"
            >
              {CTA_LABEL}
            </a>
            <a
              href="#work"
              className="group flex h-12 items-center justify-center gap-1.5 rounded-full border border-zinc-300 px-7 text-sm font-medium transition-colors hover:border-zinc-500 active:translate-y-[1px] dark:border-white/20 dark:hover:border-white/50"
            >
              See selected work
              <ArrowRightIcon
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="lg:col-span-5">
          <figure className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div
              aria-hidden
              className="bg-grid absolute -inset-3 rounded-[20px] text-zinc-900 dark:text-white"
            />
            <a
              href="/pfp.jpg"
              target="_blank"
              rel="noreferrer"
              aria-label={`Open full-resolution portrait of ${SITE.name} in a new tab`}
              title="Open full-resolution portrait"
              className="relative block cursor-zoom-in"
            >
              <Image
                src="/pfp.webp"
                alt={`Portrait of ${SITE.name}`}
                width={640}
                height={640}
                priority
                sizes="(max-width: 1023px) 90vw, 480px"
                className="relative aspect-square w-full rounded-2xl border border-zinc-200 object-cover object-top dark:border-white/15"
              />
            </a>
            <figcaption className="relative mt-3 font-mono text-xs text-zinc-500 dark:text-zinc-400">
              {SITE.name}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
