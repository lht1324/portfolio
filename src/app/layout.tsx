import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SITE } from "@/content/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Jaeho Lee · Freelance Developer for AI Products",
    template: "%s · Jaeho Lee",
  },
  description:
    "Freelance developer in Seoul. Replicate and fal.ai builds, production refactors, and MVPs with a fixed quote.",
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: "Jaeho Lee",
    title: "Jaeho Lee · Freelance Developer for AI Products",
    description:
      "Replicate and fal.ai builds, production refactors, and MVPs that actually launch.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaeho Lee · Freelance Developer for AI Products",
    description:
      "Replicate and fal.ai builds, production refactors, and MVPs that actually launch.",
  },
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('jl-theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Seoul", addressCountry: "KR" },
  jobTitle: SITE.role,
  sameAs: [SITE.github, SITE.linkedin, SITE.x],
  knowsAbout: ["Next.js", "React", "TypeScript", "Node.js", "Replicate", "fal.ai"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-full bg-white font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
