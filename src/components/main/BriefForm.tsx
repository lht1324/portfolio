"use client";

// Shape rule: fields rounded-xl (16px), buttons and chips pill.
import { useCallback, useEffect, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import { PaperclipIcon, XIcon } from "@phosphor-icons/react";
import { CTA_LABEL } from "@/content/site";

const SERVICE_OPTIONS = ["AI code rescue", "AI media pipelines", "Payments and the hard parts", "MVP builds"] as const;

const MAX_FILES = 3;
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const BLOCKED_EXTENSIONS = [
    "exe",
    "msi",
    "bat",
    "cmd",
    "com",
    "scr",
    "pif",
    "ps1",
    "vbs",
    "vbe",
    "js",
    "jse",
    "wsf",
    "wsh",
    "jar",
    "dll",
    "msc",
    "msp",
    "reg",
    "cpl",
    "hta",
] as const;

function fileExtension(name: string) {
    const dot = name.lastIndexOf(".");
    return dot === -1 ? "" : name.slice(dot + 1).toLowerCase();
}
const MAX_BODY_CHARS = 5000;
const MIN_BODY_CHARS = 20;

const FIELD_LABEL = "mb-2 block text-sm font-medium";
const TEXT_INPUT =
    "w-full rounded-xl border border-zinc-300 bg-white px-4 text-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-emerald-700 dark:border-white/15 dark:bg-zinc-900 dark:placeholder:text-zinc-500 dark:focus:border-emerald-400";
const FIELD_ERROR = "mt-1.5 text-sm text-red-600 dark:text-red-400";
const HELPER = "mt-1.5 text-xs text-zinc-500 dark:text-zinc-400";

function isEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function BriefForm() {
    const [services, setServices] = useState<string[]>([]);
    const [email, setEmail] = useState("");
    const [body, setBody] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<{ services?: string; email?: string; body?: string; files?: string }>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [dragging, setDragging] = useState(false);

    // Stray drops outside the zone must never navigate the page away.
    useEffect(() => {
        const onGuard = (event: globalThis.DragEvent) => event.preventDefault();
        window.addEventListener("dragover", onGuard);
        window.addEventListener("drop", onGuard);
        return () => {
            window.removeEventListener("dragover", onGuard);
            window.removeEventListener("drop", onGuard);
        };
    }, []);

    const onToggleService = useCallback((option: string) => {
        setServices((prev) =>
            prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option],
        );
    }, []);

    const onChangeEmail = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }, []);

    const onChangeBody = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        setBody(event.target.value);
    }, []);

    const onPickFiles = useCallback(
        (picked: File[]) => {
            const merged = [...files];
            for (const file of picked) {
                const duplicate = merged.some(
                    (kept) =>
                        kept.name === file.name && kept.size === file.size && kept.lastModified === file.lastModified,
                );
                if (!duplicate) {
                    merged.push(file);
                }
            }
            if (merged.length > MAX_FILES) {
                setErrors((prev) => ({ ...prev, files: `Up to ${MAX_FILES} files.` }));
                return;
            }
            const blocked = merged.find((file) =>
                (BLOCKED_EXTENSIONS as readonly string[]).includes(fileExtension(file.name)),
            );
            if (blocked) {
                setErrors((prev) => ({ ...prev, files: `${blocked.name} can't be attached. Zip it or remove it.` }));
                return;
            }
            const oversized = merged.find((file) => file.size > MAX_FILE_BYTES);
            if (oversized) {
                setErrors((prev) => ({ ...prev, files: `${oversized.name} is over 10 MB.` }));
                return;
            }
            setErrors((prev) => ({ ...prev, files: undefined }));
            setFiles(merged);
        },
        [files],
    );

    const onChangeFiles = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            onPickFiles(Array.from(event.target.files ?? []));
            event.target.value = "";
        },
        [onPickFiles],
    );

    const onRemoveFile = useCallback((index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
        setErrors((prev) => ({ ...prev, files: undefined }));
    }, []);

    const onDragOverFiles = useCallback((event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setDragging(true);
    }, []);

    const onDragLeaveFiles = useCallback(() => {
        setDragging(false);
    }, []);

    const onDropFiles = useCallback(
        (event: DragEvent<HTMLLabelElement>) => {
            event.preventDefault();
            setDragging(false);
            if (event.dataTransfer.files.length > 0) {
                onPickFiles(Array.from(event.dataTransfer.files));
            }
        },
        [onPickFiles],
    );

    const onSubmitBriefForm = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const nextErrors: typeof errors = {};
            if (services.length === 0) {
                nextErrors.services = "Pick at least one.";
            }
            if (!isEmail(email)) {
                nextErrors.email = "Enter a valid email address.";
            }
            if (body.trim().length < MIN_BODY_CHARS) {
                nextErrors.body = `A sentence or two at least (${MIN_BODY_CHARS} characters).`;
            } else if (body.length > MAX_BODY_CHARS) {
                nextErrors.body = `Keep it under ${MAX_BODY_CHARS} characters.`;
            }
            setErrors(nextErrors);
            if (Object.values(nextErrors).some(Boolean)) {
                return;
            }

            setSending(true);
            setSubmitError(null);
            try {
                const form = event.currentTarget;
                const formData = new FormData(form);
                formData.set("email", email.trim());
                formData.set("body", body);
                formData.delete("files");
                files.forEach((file) => formData.append("files", file));
                formData.set("services", JSON.stringify(services));
                const response = await fetch("/api/brief", { method: "POST", body: formData });
                const payload = (await response.json()) as { success: boolean; error?: string };
                if (!payload.success) {
                    setSubmitError(payload.error ?? "Something went wrong. Email me directly instead.");
                    return;
                }
                setSent(true);
            } catch {
                setSubmitError("Network error. Email me directly instead.");
            } finally {
                setSending(false);
            }
        },
        [services, email, body, files],
    );

    const onResetBriefForm = useCallback(() => {
        setSent(false);
        setServices([]);
        setEmail("");
        setBody("");
        setFiles([]);
        setErrors({});
        setSubmitError(null);
    }, []);

    if (sent) {
        return (
            <div className="rounded-2xl border border-emerald-700/25 bg-emerald-700/[0.07] p-7 text-center sm:p-8 dark:border-emerald-400/25 dark:bg-emerald-400/[0.07]">
                <p className="text-xl font-semibold tracking-tight">Got it. I will reply within two business days.</p>
                <p className="mx-auto mt-3 max-w-[52ch] text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Your brief is on my list. Ack within 12 hours, questions and fixed quote within two business
                    days. No calls needed.
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
            noValidate
            className="rounded-2xl border border-zinc-200 p-7 text-left sm:p-8 dark:border-white/10"
        >
            <fieldset>
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
                {errors.services ? <p className={FIELD_ERROR}>{errors.services}</p> : null}
            </fieldset>

            <div className="mt-5">
                <label htmlFor="brief-email" className={FIELD_LABEL}>
                    Email
                </label>
                <input
                    id="brief-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="jane@company.com"
                    value={email}
                    onChange={onChangeEmail}
                    className={`${TEXT_INPUT} h-12`}
                />
                {errors.email ? (
                    <p className={FIELD_ERROR}>{errors.email}</p>
                ) : (
                    <p className={HELPER}>Replies go to this address.</p>
                )}
            </div>

            <div className="mt-5">
                <label htmlFor="brief-body" className={FIELD_LABEL}>
                    Details
                </label>
                <textarea
                    id="brief-body"
                    name="body"
                    rows={5}
                    required
                    placeholder="What did you build, what broke, links to the live site or repo..."
                    value={body}
                    onChange={onChangeBody}
                    className={`${TEXT_INPUT} min-h-32 py-3 leading-relaxed`}
                />
                {errors.body ? (
                    <p className={FIELD_ERROR}>{errors.body}</p>
                ) : (
                    <p className={HELPER}>A few sentences beat a long spec. Links welcome.</p>
                )}
            </div>

            <div className="mt-5">
                <span id="brief-files-label" className={FIELD_LABEL}>
                    Files <span className="font-normal text-zinc-500 dark:text-zinc-400">(optional)</span>
                </span>
                <label
                    htmlFor="brief-files"
                    onDragOver={onDragOverFiles}
                    onDragLeave={onDragLeaveFiles}
                    onDrop={onDropFiles}
                    className={`flex min-h-28 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed px-4 py-6 text-sm transition-colors ${
                        dragging
                            ? "border-emerald-700/60 bg-emerald-700/[0.06] text-zinc-900 dark:border-emerald-400/60 dark:bg-emerald-400/[0.06] dark:text-white"
                            : "border-zinc-300 text-zinc-600 hover:border-zinc-500 dark:border-white/15 dark:text-zinc-300 dark:hover:border-white/40"
                    }`}
                >
                    <span className="flex items-center gap-2.5">
                        <PaperclipIcon size={18} />
                        <span>Attach screenshots, code, or docs.</span>
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">Click to browse or drag and drop</span>
                </label>
                {files.length > 0 ? (
                    <ul className="mt-2.5 space-y-1.5">
                        {files.map((file, index) => (
                            <li
                                key={`${file.name}-${file.size}-${file.lastModified}`}
                                className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-white/10"
                            >
                                <span className="truncate text-zinc-700 dark:text-zinc-300">{file.name}</span>
                                <button
                                    type="button"
                                    onClick={() => onRemoveFile(index)}
                                    aria-label={`Remove ${file.name}`}
                                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-zinc-500 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                                >
                                    <XIcon size={14} />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : null}
                <input
                    id="brief-files"
                    name="files"
                    type="file"
                    multiple
                    onChange={onChangeFiles}
                    aria-labelledby="brief-files-label"
                    className="sr-only"
                />
                {errors.files ? (
                    <p className={FIELD_ERROR}>{errors.files}</p>
                ) : (
                    <p className={HELPER}>Up to 10 MB each, max {MAX_FILES} files.</p>
                )}
            </div>

            <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

            {submitError ? (
                <p role="alert" className="mt-5 rounded-xl border border-red-600/25 bg-red-600/[0.06] px-4 py-3 text-sm text-red-700 dark:text-red-300">
                    {submitError}
                </p>
            ) : null}

            <button
                type="submit"
                disabled={sending}
                className="mt-7 flex h-12 w-full items-center justify-center rounded-full bg-emerald-700 px-8 text-sm font-medium text-white transition-colors hover:bg-emerald-800 active:translate-y-[1px] disabled:opacity-60 dark:bg-emerald-400 dark:text-zinc-950 dark:hover:bg-emerald-300"
            >
                {sending ? "Sending..." : CTA_LABEL}
            </button>
        </form>
    );
}
