import {
  CreditCardIcon,
  FilmStripIcon,
  RocketLaunchIcon,
  WrenchIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";

const SERVICES = [
  {
    icon: WrenchIcon,
    title: "AI code rescue",
    body: "Your vibe-coded app works until it doesn't. I review AI-generated code, fix what's broken, and refactor it into a codebase you can maintain.",
    meta: "Code review · Refactoring · Bug fixes",
    price: "Starting at $500",
    featured: true,
  },
  {
    icon: FilmStripIcon,
    title: "AI media pipelines",
    body: "Video and image generation with Replicate and fal.ai. Queues, webhooks, caching, and cost control, wired correctly from day one.",
    meta: "Replicate · fal.ai · Webhooks",
    price: "Starting at $1,500",
    featured: false,
  },
  {
    icon: CreditCardIcon,
    title: "Payments and the hard parts",
    body: "Auth, billing, and subscriptions. The unglamorous work AI tools fumble, done carefully so you actually get paid.",
    meta: "Auth · Billing · Edge cases",
    price: "Starting at $1,000",
    featured: false,
  },
  {
    icon: RocketLaunchIcon,
    title: "MVP builds",
    body: "From idea to launched product. I scope it in writing first, then you get a fixed quote. No hourly fog.",
    meta: "Fixed quote after written brief",
    featured: false,
  },
] as const;

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-24 px-4 py-20 sm:px-6 md:min-h-[calc(100dvh-4rem)] md:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <h2 className="max-w-xl text-3xl font-semibold tracking-tighter sm:text-4xl">
            What I take off your plate
          </h2>
          <p className="mt-3 max-w-[60ch] leading-relaxed text-zinc-600 dark:text-zinc-400">
            The work between a working demo and a product that earns.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.06}>
              <article
                className={
                  service.featured
                    ? "h-full rounded-2xl border border-emerald-700/25 bg-emerald-700/[0.07] p-7 dark:border-emerald-400/25 dark:bg-emerald-400/[0.07]"
                    : "h-full rounded-2xl border border-zinc-200 p-7 dark:border-white/10"
                }
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-700/10 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300">
                    <service.icon size={22} weight="duotone" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {service.body}
                    </p>
                    {"price" in service && (
                      <p className="mt-4 text-lg font-semibold tracking-tight">
                        {service.price}
                      </p>
                    )}
                    <p className="mt-4 font-mono text-xs text-emerald-800 dark:text-emerald-300">
                      {service.meta}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}