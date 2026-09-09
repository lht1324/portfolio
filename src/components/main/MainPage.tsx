import { HeroSection } from "@/components/main/HeroSection";
import { WorkSection } from "@/components/main/WorkSection";
import { ServicesSection } from "@/components/main/ServicesSection";
import { AboutSection } from "@/components/main/AboutSection";
import { ProcessSection } from "@/components/main/ProcessSection";
import { ContactSection, Footer } from "@/components/main/ContactSection";

export function MainPage() {
  return (
    <>
      <main>
        <HeroSection />
        <WorkSection />
        <ServicesSection />
        <AboutSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
