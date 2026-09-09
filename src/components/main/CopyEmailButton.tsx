"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CheckIcon, CopySimpleIcon } from "@phosphor-icons/react";

export function CopyEmailButton({ email }: { email: string }) {
    const [copied, setCopied] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        };
    }, []);

    const onCopyEmail = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(email);
        } catch {
            const area = document.createElement("textarea");
            area.value = email;
            document.body.appendChild(area);
            area.select();
            document.execCommand("copy");
            document.body.removeChild(area);
        }
        setCopied(true);
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => setCopied(false), 2000);
    }, [email]);

    return (
        <button
            type="button"
            onClick={onCopyEmail}
            aria-live="polite"
            title="Click to copy"
            className="flex cursor-pointer items-center gap-2 font-mono text-sm text-zinc-600 transition-colors hover:text-zinc-950 hover:underline hover:decoration-zinc-300 hover:underline-offset-4 dark:text-zinc-400 dark:hover:text-white dark:hover:decoration-white/20"
        >
            {copied ? <CheckIcon size={16} /> : <CopySimpleIcon size={16} />}
            {copied ? "Copied" : email}
        </button>
    );
}
