import Navbar from "@/components/Navbar";
import Hero from "@/components/hero/Hero";
import BloodTests from "@/components/services/ServiceCard";
import WhyChooseUs from "@/components/services/WhyChooseUs";
import Packages from "@/components/services/Packages";
import HomeCollection from "@/components/services/HomeCollection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <BloodTests />
      <WhyChooseUs />
      <Packages />
      <HomeCollection />
      <Footer />
    </>
  );
}