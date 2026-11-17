import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";
import StatsBar from "@/components/Home/StatsBar";
import TrustIntro from "@/components/Home/TrustIntro";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import ServicesGrid from "@/components/Home/ServicesGrid";
import BrandsShowcase from "@/components/Home/BrandsShowcase";
import HowItWorks from "@/components/HowItWorks";
import BatteryCareTips from "@/components/Home/BatteryCareTips";
import WarningSignsSection from "@/components/Home/WarningSignsSection";
import VehicleTypesSection from "@/components/Home/VehicleTypesSection";
import AreasCovered from "@/components/Home/AreasCovered";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/Home/FAQ";
import EmergencyCTA from "@/components/Home/EmergencyCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Battery Store | Car Battery Replacement Dubai",
  description:
    "Trusted provider for car battery change in Dubai. Amaron, Varta & Bosch batteries delivered and installed in 30-45 minutes, 24/7.",
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <BrandsShowcase />
      <HowItWorks />
      <VehicleTypesSection />
      <StatsBar />
      <TrustIntro />
      <WhyChooseUs />
      <ServicesGrid />
      <BatteryCareTips />
      <WarningSignsSection />
      <AreasCovered />
      <Testimonials />
      <FAQ />
      <EmergencyCTA />
    </>
  );
}
