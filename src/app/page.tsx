import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Work } from "@/components/work";
import { About } from "@/components/about";
import { Process } from "@/components/process";
import { Contact, Footer } from "@/components/contact";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Work />
        <Services />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
