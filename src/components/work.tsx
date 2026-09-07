import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { PROJECTS } from "@/content/site";
import { Reveal } from "@/components/reveal";

function StackRow({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-zinc-300 px-3 py-1 font-mono text-xs text-zinc-600 dark:border-white/15 dark:text-zinc-300"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Work() {
  return (
    <section id="work" className="scroll-mt-24 px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <h2 className="max-w-xl text-3xl font-semibold tracking-tighter sm:text-4xl">
            Selected work
          </h2>
          <p className="mt-3 max-w-[60ch] leading-relaxed text-zinc-600 dark:text-zinc-400">
            Live products, linked below.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-4">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.06}>
              <article className="grid overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 lg:grid-cols-2">
                <div className="flex flex-col justify-center gap-4 p-7 sm:p-10">
                  <p className="font-mono text-xs text-emerald-800 dark:text-emerald-300">
                    {project.status}
                  </p>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {project.name}
                  </h3>
                  <p className="max-w-[52ch] text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {project.description}
                  </p>
                  <StackRow items={project.stack} />
                </div>
                <a
                  href={project.href ?? undefined}
                  target={project.href ? "_blank" : undefined}
                  rel={project.href ? "noopener noreferrer" : undefined}
                  aria-label={`${project.name}: visit ${project.displayUrl}`}
                  className={
                    i === 0
                      ? "bg-grid group flex min-h-56 flex-col justify-between bg-emerald-700/[0.08] p-7 text-zinc-900 sm:p-10 lg:min-h-72 dark:bg-emerald-400/[0.08] dark:text-white"
                      : "bg-grid group flex min-h-56 flex-col justify-between bg-zinc-900 p-7 text-white sm:p-10 lg:min-h-72 dark:bg-zinc-100 dark:text-zinc-950"
                  }
                >
                  <span className="flex items-center justify-between font-mono text-xs opacity-70">
                    <span>Live site</span>
                    <ArrowUpRight
                      size={20}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                  <span className="text-3xl font-semibold tracking-tighter sm:text-4xl">
                    {project.displayUrl}
                  </span>
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
