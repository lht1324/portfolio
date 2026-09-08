import { Reveal } from "@/components/reveal";

const STEPS = [
  {
    index: "01",
    title: "Written brief",
    body: "Send one page: idea, links, budget range, timeline. Ack within 12 hours, questions and fixed quote within two business days. No calls needed.",
  },
  {
    index: "02",
    title: "Fixed quote",
    body: "Scope, timeline, and one price in writing. If the fit is wrong, I will tell you in writing.",
  },
  {
    index: "03",
    title: "Build and handoff",
    body: "Weekly demos from a clean repo. Docs included. You own all of it at handoff.",
  },
] as const;

export function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-24 px-4 py-20 sm:px-6 md:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <h2 className="max-w-xl text-3xl font-semibold tracking-tighter sm:text-4xl">
            How I work
          </h2>
          <p className="mt-3 max-w-[60ch] leading-relaxed text-zinc-600 dark:text-zinc-400">
            Short process, fixed price, no surprises.
          </p>
        </Reveal>

        <ol className="mt-10 border-t border-zinc-200 dark:border-white/10">
          {STEPS.map((step, i) => (
            <li
              key={step.index}
              className="border-b border-zinc-200 dark:border-white/10"
            >
              <Reveal
                delay={i * 0.06}
                className="grid gap-2 py-8 sm:grid-cols-[88px_220px_1fr] sm:items-baseline sm:gap-6"
              >
                <span className="font-mono text-sm text-emerald-700 dark:text-emerald-400">
                  {step.index}
                </span>
                <span className="text-xl font-semibold tracking-tight">
                  {step.title}
                </span>
                <span className="max-w-[60ch] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {step.body}
                </span>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
