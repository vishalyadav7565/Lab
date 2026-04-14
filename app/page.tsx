import Navbar from "@/components/Navbar";
import Hero from "@/components/home/Hero";
import BloodTests from "@/components/services/ServiceCard";
import WhyChooseUs from "@/components/services/WhyChooseUs";
import Packages from "@/components/services/Packages";
import HomeCollection from "@/components/services/HomeCollection";
import Footer from "@/components/Footer";
import PackagesSection from "@/components/home/Populartest";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <PackagesSection/>
      <WhyChooseUs />
      <Packages />
      <HomeCollection />
      <Footer />
    </>
  );
}