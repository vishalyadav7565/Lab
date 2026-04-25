import Navbar from "@/components/Navbar";
import Hero from "../app/home/Hero";
import PackagesSection from "../app/home/Packages";
import PopularTests from "../app/home/Populartest";
import WhyChooseUs from "@/components/services/WhyChooseUs";
import HomeCollection from "@/components/services/HomeCollection";
import Footer from "@/components/Footer";
import PackagesSection2 from "../app/home/Packages";
import OfferPopup from "./home/OfferPopup";
import AIChatWidget from "@/components/AIChatWidget";

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <Hero/>

      {/* 🔥 MAIN CONVERSION SECTION */}
      <PopularTests/>

      {/* 🧪 POPULAR TESTS */}
      <PackagesSection2/>

      {/* ⭐ TRUST SECTION */}
      <WhyChooseUs />

      {/* 🚚 SERVICE HIGHLIGHT */}
      <HomeCollection />
      <OfferPopup/>

      <Footer />

      <OfferPopup/>

{/* 🤖 AI FLOAT */}


<Footer />
    </>
  );
}