"use client";

import { useEffect, useState } from "react";
import { ArrowDownIcon, ArrowUpRightIcon, XIcon } from "@phosphor-icons/react";
import { CTA_LABEL, PROJECTS, type Project } from "@/content/site";
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

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name}: status`}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-zinc-950/60 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-7 sm:p-8 dark:border-white/10 dark:bg-zinc-900">
        <button
          type="button"
          onClick={onClose}
          autoFocus
          aria-label="Close dialog"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:text-zinc-900 dark:border-white/15 dark:text-zinc-400 dark:hover:text-white"
        >
          <XIcon size={17} />
        </button>
        <p className="font-mono text-xs text-emerald-800 dark:text-emerald-300">
          {project.status}
        </p>
        <h3 className="mt-3 pr-10 text-2xl font-semibold tracking-tight">
          {project.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>
        <div className="mt-5">
          <StackRow items={project.stack} />
        </div>
        <p className="mt-5 border-t border-zinc-200 pt-5 text-sm leading-relaxed text-zinc-600 dark:border-white/10 dark:text-zinc-400">
          Currently in development. The live link activates at launch. Want
          something similar built?
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a
            href="#contact"
            onClick={onClose}
            className="flex h-11 items-center justify-center gap-1.5 rounded-full bg-emerald-700 px-6 text-sm font-medium text-white transition-colors hover:bg-emerald-800 active:translate-y-[1px] dark:bg-emerald-400 dark:text-zinc-950 dark:hover:bg-emerald-300"
          >
            {CTA_LABEL}
            <ArrowDownIcon size={16} />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 items-center justify-center rounded-full border border-zinc-300 px-6 text-sm font-medium transition-colors hover:border-zinc-500 active:translate-y-[1px] dark:border-white/20 dark:hover:border-white/50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function WorkSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="work" className="scroll-mt-24 px-4 py-20 sm:px-6 md:-mt-[10dvh] md:min-h-[calc(100dvh-4rem)] md:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <h2 className="max-w-xl text-3xl font-semibold tracking-tighter sm:text-4xl">
            Selected work
          </h2>
          <p className="mt-3 max-w-[60ch] leading-relaxed text-zinc-600 dark:text-zinc-400">
            One live product, one in development.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-4">
          {PROJECTS.map((project, i) => {
            const isLive = project.status === "Live in production";
            return (
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
                  {isLive && project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name}: visit ${project.displayUrl}`}
                      className={
                        i === 0
                          ? "bg-grid group flex min-h-56 flex-col justify-between bg-emerald-700/[0.08] p-7 text-zinc-900 sm:p-10 lg:min-h-72 dark:bg-emerald-400/[0.08] dark:text-white"
                          : "bg-grid group flex min-h-56 flex-col justify-between bg-zinc-900 p-7 text-white sm:p-10 lg:min-h-72 dark:bg-zinc-100 dark:text-zinc-950"
                      }
                    >
                      <span className="flex items-center justify-between font-mono text-xs opacity-70">
                        <span>Live site</span>
                        <ArrowUpRightIcon
                          size={20}
                          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                      <span className="text-3xl font-semibold tracking-tighter sm:text-4xl">
                        {project.displayUrl}
                      </span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelected(project)}
                      aria-label={`${project.name}: view status`}
                      aria-haspopup="dialog"
                      className="bg-grid group flex min-h-56 cursor-pointer flex-col justify-between bg-zinc-900 p-7 text-left text-white sm:p-10 lg:min-h-72 dark:bg-zinc-100 dark:text-zinc-950"
                    >
                      <span className="flex items-center justify-between font-mono text-xs opacity-70">
                        <span>{project.status}</span>
                        <ArrowUpRightIcon
                          size={20}
                          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                      <span className="text-3xl font-semibold tracking-tighter sm:text-4xl">
                        {project.displayUrl}
                      </span>
                    </button>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
