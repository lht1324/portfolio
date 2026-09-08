"use client";

// BIP 포스트 캡처용 목업. 실제 전송은 하지 않는다.
// Resend 연동 작업 때 실제 전송 폼으로 교체한다.
import { useCallback, useState, type ChangeEvent, type FormEvent } from "react";
import { PaperclipIcon } from "@phosphor-icons/react";
import { CTA_LABEL } from "@/content/site";

const SERVICE_OPTIONS = [
    "AI code rescue",
    "AI media pipeline",
    "Payments and billing",
    "MVP build",
] as const;

const BUDGET_OPTIONS = [
    "Under $500",
    "$500 to $1,000",
    "$1,000 to $3,000",
    "$3,000 or more",
] as const;

const TIMELINE_OPTIONS = ["ASAP", "Within 2 weeks", "Within a month", "Flexible"] as const;

const FIELD_LABEL = "mb-2 block text-sm font-medium";
const TEXT_INPUT =
    "h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 text-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-emerald-700 dark:border-white/15 dark:bg-zinc-900 dark:placeholder:text-zinc-500 dark:focus:border-emerald-400";

export function BriefFormMock() {
    const [services, setServices] = useState<string[]>([]);
    const [fileNames, setFileNames] = useState<string[]>([]);
    const [sent, setSent] = useState(false);

    const onToggleService = useCallback((option: string) => {
        setServices((prev) =>
            prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option],
        );
    }, []);

    const onChangeFiles = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setFileNames(Array.from(event.target.files ?? []).map((file) => file.name));
    }, []);

    const onSubmitBriefForm = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSent(true);
    }, []);

    const onResetBriefForm = useCallback(() => {
        setSent(false);
        setServices([]);
        setFileNames([]);
    }, []);

    if (sent) {
        return (
            <div className="rounded-2xl border border-emerald-700/25 bg-emerald-700/[0.07] p-7 text-center sm:p-8 dark:border-emerald-400/25 dark:bg-emerald-400/[0.07]">
                <p className="text-xl font-semibold tracking-tight">
                    Got it. I will reply within two business days.
                </p>
                <p className="mx-auto mt-3 max-w-[52ch] text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Your brief is on my list. Ack within 12 hours, questions and fixed quote within two
                    business days. No calls needed.
                </p>
                <p className="mt-4 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    (Demo preview, not wired yet.)
                </p>
                <button
                    type="button"
                    onClick={onResetBriefForm}
                    className="mx-auto mt-6 flex h-11 items-center rounded-full border border-zinc-300 px-6 text-sm font-medium transition-colors hover:border-zinc-500 active:translate-y-[1px] dark:border-white/20 dark:hover:border-white/50"
                >
                    Write another brief
                </button>
            </div>
        );
    }

    return (
        <form
            onSubmit={onSubmitBriefForm}
            className="rounded-2xl border border-zinc-200 p-7 text-left sm:p-8 dark:border-white/10"
        >
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="brief-name" className={FIELD_LABEL}>
                        Name
                    </label>
                    <input
                        id="brief-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Jane Kim"
                        className={TEXT_INPUT}
                    />
                </div>
                <div>
                    <label htmlFor="brief-email" className={FIELD_LABEL}>
                        Email
                    </label>
                    <input
                        id="brief-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="jane@company.com"
                        className={TEXT_INPUT}
                    />
                </div>
            </div>

            <fieldset className="mt-5">
                <legend className={FIELD_LABEL}>What do you need?</legend>
                <div className="flex flex-wrap gap-2">
                    {SERVICE_OPTIONS.map((option) => {
                        const pressed = services.includes(option);
                        return (
                            <button
                                key={option}
                                type="button"
                                aria-pressed={pressed}
                                onClick={() => onToggleService(option)}
                                className={
                                    pressed
                                        ? "rounded-full border border-emerald-700/40 bg-emerald-700/[0.08] px-4 py-2 text-sm font-medium text-emerald-900 transition-colors dark:border-emerald-400/40 dark:bg-emerald-400/[0.08] dark:text-emerald-200"
                                        : "rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-600 transition-colors hover:border-zinc-500 dark:border-white/15 dark:text-zinc-300 dark:hover:border-white/40"
                                }
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>
            </fieldset>

            <div className="mt-5">
                <label htmlFor="brief-title" className={FIELD_LABEL}>
                    Project title
                </label>
                <input
                    id="brief-title"
                    name="title"
                    type="text"
                    placeholder="Project brief: fix my AI-built checkout"
                    className={TEXT_INPUT}
                />
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="brief-budget" className={FIELD_LABEL}>
                        Budget range
                    </label>
                    <select id="brief-budget" name="budget" defaultValue="" className={TEXT_INPUT}>
                        <option value="" disabled>
                            Select a range
                        </option>
                        {BUDGET_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="brief-timeline" className={FIELD_LABEL}>
                        Timeline
                    </label>
                    <select id="brief-timeline" name="timeline" defaultValue="" className={TEXT_INPUT}>
                        <option value="" disabled>
                            Select timing
                        </option>
                        {TIMELINE_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mt-5">
                <label htmlFor="brief-body" className={FIELD_LABEL}>
                    Details
                </label>
                <textarea
                    id="brief-body"
                    name="body"
                    rows={5}
                    placeholder="What did you build, what broke, links to the live site or repo..."
                    className="min-h-32 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm leading-relaxed outline-none transition-colors placeholder:text-zinc-400 focus:border-emerald-700 dark:border-white/15 dark:bg-zinc-900 dark:placeholder:text-zinc-500 dark:focus:border-emerald-400"
                />
            </div>

            <div className="mt-5">
                <span id="brief-files-label" className={FIELD_LABEL}>
                    Files (optional)
                </span>
                <label
                    htmlFor="brief-files"
                    className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-dashed border-zinc-300 px-4 py-3.5 text-sm text-zinc-600 transition-colors hover:border-zinc-500 dark:border-white/15 dark:text-zinc-300 dark:hover:border-white/40"
                >
                    <PaperclipIcon size={18} />
                    <span className="truncate">
                        {fileNames.length > 0
                            ? fileNames.join(", ")
                            : "Attach a zip or screenshots (up to 3 files)"}
                    </span>
                </label>
                <input
                    id="brief-files"
                    name="files"
                    type="file"
                    multiple
                    onChange={onChangeFiles}
                    aria-labelledby="brief-files-label"
                    className="sr-only"
                />
            </div>

            <button
                type="submit"
                className="mt-7 flex h-12 w-full items-center justify-center rounded-full bg-emerald-700 px-8 text-sm font-medium text-white transition-colors hover:bg-emerald-800 active:translate-y-[1px] dark:bg-emerald-400 dark:text-zinc-950 dark:hover:bg-emerald-300"
            >
                {CTA_LABEL}
            </button>
            <p className="mt-3 text-center font-mono text-xs text-zinc-500 dark:text-zinc-400">
                (Demo preview, not wired yet.)
            </p>
        </form>
    );
}
