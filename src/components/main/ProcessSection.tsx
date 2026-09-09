import { Reveal } from "@/components/reveal";

const STEPS = [
    {
        index: "01",
        title: "Written brief",
        points: [
            "What you're making, plus whatever shows it",
            "Ack within 12 hours, questions welcome anytime",
            "Fixed quote within two business days, no calls needed",
        ],
    },
    {
        index: "02",
        title: "Fixed quote",
        points: [
            "Scope, timeline, and one locked price in writing",
            "Half upfront via Wise, half on handoff",
            "Two revision rounds, batched in writing. New scope quoted separately",
            "If the fit is wrong, decline in writing",
        ],
    },
    {
        index: "03",
        title: "Build and handoff",
        points: [
            "Demos on longer builds, from a clean repo",
            "Docs included for handoff",
            "30 days of free fixes for delivered work after handoff",
            "You own all of it at handoff",
        ],
    },
] as const;

export function ProcessSection() {
    return (
        <section id="process" className="scroll-mt-24 px-4 py-20 sm:px-6 md:py-24">
            <div className="mx-auto w-full max-w-7xl">
                <Reveal>
                    <h2 className="max-w-xl text-3xl font-semibold tracking-tighter sm:text-4xl">How I work</h2>
                    <p className="mt-3 max-w-[60ch] leading-relaxed text-zinc-600 dark:text-zinc-400">
                        Short process, fixed price, no surprises.
                    </p>
                </Reveal>

                <ol className="mt-10 border-t border-zinc-200 dark:border-white/10">
                    {STEPS.map((step, i) => (
                        <li key={step.index} className="border-b border-zinc-200 dark:border-white/10">
                            <Reveal
                                delay={i * 0.06}
                                className="grid gap-2 py-8 sm:grid-cols-[88px_220px_1fr] sm:gap-6"
                            >
                                <span className="font-mono text-sm text-emerald-700 dark:text-emerald-400">
                                    {step.index}
                                </span>
                                <span className="text-xl font-semibold tracking-tight">{step.title}</span>
                                <ul className="max-w-[60ch] space-y-1.5 text-sm leading-relaxed text-zinc-600 marker:text-emerald-700 dark:text-zinc-400 dark:marker:text-emerald-400">
                                    {step.points.map((point) => (
                                        <li key={point} className="list-disc list-inside">
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </Reveal>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
