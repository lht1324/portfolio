import { Resend } from "resend";
import { getNextBaseResponse } from "@/lib/utils/getNextBaseResponse";

const CONTACT_TO = "contact@jaeholee.xyz";
const BRIEF_FROM = "Portfolio Brief <brief@jaeholee.xyz>";

const SERVICE_OPTIONS = ["AI code rescue", "AI media pipeline", "Payments and billing", "MVP build"] as const;

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

function isEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function escapeHtml(value: string) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        return getNextBaseResponse({
            success: false,
            status: 500,
            error: `Email service not configured. Email your brief directly to ${CONTACT_TO}.`,
        });
    }

    let form: FormData;
    try {
        form = await request.formData();
    } catch {
        return getNextBaseResponse({
            success: false,
            status: 400,
            error: "Invalid form submission.",
        });
    }

    // Honeypot: bots fill it, humans never see it. Pretend success.
    if (String(form.get("company") ?? "").trim() !== "") {
        return getNextBaseResponse({
            success: true,
            status: 200,
        });
    }

    const email = String(form.get("email") ?? "").trim();
    const body = String(form.get("body") ?? "");
    let services: string[] = [];
    try {
        const parsed: unknown = JSON.parse(String(form.get("services") ?? "[]"));
        if (Array.isArray(parsed)) {
            services = parsed.filter((item): item is string => typeof item === "string");
        }
    } catch {
        services = [];
    }
    const files = form.getAll("files").filter((entry): entry is File => entry instanceof File && entry.size > 0);

    if (services.length === 0 || !services.every((item) => (SERVICE_OPTIONS as readonly string[]).includes(item))) {
        return getNextBaseResponse({
            success: false,
            status: 400,
            error: "Pick at least one service.",
        });
    }
    if (!isEmail(email)) {
        return getNextBaseResponse({
            success: false,
            status: 400,
            error: "Enter a valid email address.",
        });
    }
    if (body.trim().length < MIN_BODY_CHARS || body.length > MAX_BODY_CHARS) {
        return getNextBaseResponse({
            success: false,
            status: 400,
            error: "Details are too short or too long.",
        });
    }
    if (files.length > MAX_FILES) {
        return getNextBaseResponse({
            success: false,
            status: 400,
            error: `Up to ${MAX_FILES} files.`,
        });
    }
    for (const file of files) {
        if ((BLOCKED_EXTENSIONS as readonly string[]).includes(fileExtension(file.name))) {
            return getNextBaseResponse({
                success: false,
                status: 400,
                error: `${file.name} can't be attached. Zip it or remove it.`,
            });
        }
        if (file.size > MAX_FILE_BYTES) {
            return getNextBaseResponse({
                success: false,
                status: 400,
                error: `${file.name} is over 10 MB.`,
            });
        }
    }

    const stamp = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Seoul",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(new Date());
    const subject = `Project brief: ${services.join(", ")} - ${email} (${stamp} KST)`;
    const text = [
        `Services: ${services.join(", ")}`,
        `From: ${email}`,
        "",
        body.trim(),
        "",
        files.length > 0 ? `Attachments: ${files.map((file) => file.name).join(", ")}` : "Attachments: none",
    ].join("\n");
    const html = [
        `<h2 style="margin:0 0 8px;">New project brief</h2>`,
        `<p style="margin:0 0 4px;"><strong>Services:</strong> ${escapeHtml(services.join(", "))}</p>`,
        `<p style="margin:0 0 16px;"><strong>From:</strong> ${escapeHtml(email)}</p>`,
        `<hr style="border:none;border-top:1px solid #e4e4e7;margin:0 0 16px;" />`,
        `<div style="white-space:pre-wrap;">${escapeHtml(body.trim())}</div>`,
    ].join("\n");

    const attachments = await Promise.all(
        files.map(async (file) => ({
            filename: file.name,
            content: Buffer.from(await file.arrayBuffer()).toString("base64"),
            contentType: file.type,
        })),
    );

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
        from: BRIEF_FROM,
        to: CONTACT_TO,
        replyTo: email,
        subject,
        text,
        html,
        attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
        return getNextBaseResponse({
            success: false,
            status: 502,
            error: `Send failed (${error.message}). Email your brief directly to ${CONTACT_TO}.`,
        });
    }
    return getNextBaseResponse({
        success: true,
        status: 200,
        message: "Brief received.",
    });
}
