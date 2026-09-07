export const SITE = {
  name: "Jaeho Lee",
  url: "https://jaeholee.xyz",
  email: "contact@jaeholee.xyz",
  location: "Seoul, South Korea",
  role: "Freelance developer for AI products",
  github: "https://github.com/lht1324",
  linkedin:
    "https://www.linkedin.com/in/%EC%9E%AC%ED%98%B8-%EC%9D%B4-4b5121165/",
  x: "https://x.com/jaeholeeeee",
} as const;

export const MAILTO = `mailto:${SITE.email}?subject=${encodeURIComponent(
  "Intro call: my project in one line",
)}`;

export const CTA_LABEL = "Book an intro call";

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
] as const;

export const STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Replicate",
  "fal.ai",
] as const;

export type Project = {
  name: string;
  status: string;
  description: string;
  stack: readonly string[];
  href: string | null;
  displayUrl: string | null;
};

export const PROJECTS: readonly Project[] = [
  {
    name: "ShortReal AI",
    status: "Live in production",
    description:
      "AI short-form video generation service. Prompt to finished short, with the render pipeline and delivery handled end to end.",
    stack: ["Next.js", "Replicate", "fal.ai"],
    href: "https://shortreal.ai",
    displayUrl: "shortreal.ai",
  },
  {
    name: "TailorAd",
    status: "Launching soon",
    description:
      "AI still-image ad creative studio. Product photos in, scroll-stopping ad stills out, tuned for paid social.",
    stack: ["Next.js", "Replicate", "fal.ai"],
    href: "https://tailoredad.com",
    displayUrl: "tailoredad.com",
  },
] as const;

export const TIMELINE = [
  {
    period: "Now",
    title: "Independent freelance developer",
    detail: "AI products, media pipelines, and MVPs. Operating ShortReal AI.",
  },
  {
    period: "2021 to 2023",
    title: "Developer, AutoCrypt",
    detail: "Android and web development.",
  },
  {
    period: "2018 to 2025",
    title: "B.S. Computer Engineering, Gachon University",
    detail: "",
  },
] as const;
