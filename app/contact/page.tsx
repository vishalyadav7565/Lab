"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin } from "lucide-react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import AIChatWidget from "@/components/AIChatWidget";

export default function ContactPage() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
  });

  const position = { lat: 28.6139, lng: 77.2090 };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-200">

      <Navbar />

      {/* 🔥 HERO */}
      <section className="relative text-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-indigo-600/80 blur-2xl opacity-30"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Get in Touch
          </h1>
          <p className="mt-4 text-gray-600">
            We’d love to hear from you — reach out anytime
          </p>
        </motion.div>
      </section>

      {/* 🔥 CONTACT CARDS */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">

        {[{
          icon: <Phone />,
          title: "Call Us",
          value: "+91 7572055787"
        },
        {
          icon: <Mail />,
          title: "Email",
          value: "info@cbcbloodtest.in"
        },
        {
          icon: <MapPin />,
          title: "Location",
          value: "Delhi, India"
        }].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="glass-card p-6 rounded-2xl text-center"
          >
            <div className="text-blue-600 mb-3 flex justify-center">
              {item.icon}
            </div>
            <h3 className="font-semibold text-gray-900">{item.title}</h3>
            <p className="text-gray-600 mt-1">{item.value}</p>
          </motion.div>
        ))}

      </section>

      {/* 🔥 FORM + MAP */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="glass-card p-6 rounded-2xl"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Send Message
          </h2>

          <div className="space-y-5">

            {["Name", "Email", "Phone"].map((label, i) => (
              <div key={i} className="floating-group">
                <input className="floating-input" placeholder=" " />
                <label>{label}</label>
              </div>
            ))}

            <div className="floating-group">
              <textarea className="floating-input h-28" placeholder=" " />
              <label>Message</label>
            </div>

            <button className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition shadow-xl">
              Send Message
            </button>

          </div>
        </motion.div>

        {/* MAP */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="rounded-2xl overflow-hidden shadow-xl h-[400px]"
        >
          {isLoaded && (
            <GoogleMap
              center={position}
              zoom={14}
              mapContainerStyle={{ width: "100%", height: "100%" }}
            >
              <Marker position={position} />
            </GoogleMap>
          )}
        </motion.div>

      </section>

      {/* ⭐ FAQ */}
      <section className="max-w-4xl mx-auto px-6 pb-16">

        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
          FAQs
        </h2>

        {[
          {
            q: "How does home collection work?",
            a: "Book online, choose slot, we come to your home.",
          },
          {
            q: "Is it safe?",
            a: "Yes, we follow strict hygiene protocols.",
          },
          {
            q: "Report time?",
            a: "Usually within 6–24 hours.",
          },
        ].map((item, i) => (
          <details key={i} className="glass-card p-4 mb-4 rounded-xl">
            <summary className="font-semibold text-gray-900 cursor-pointer">
              {item.q}
            </summary>
            <p className="text-gray-600 mt-2 text-sm">{item.a}</p>
          </details>
        ))}

      </section>

      {/* 📲 WHATSAPP */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition z-50"
      >
        💬
      </a>
      <Footer />

      {/* 🎨 STYLES */}
      <style jsx>{`
        .glass-card {
          background: rgba(255,255,255,0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.3);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .floating-group {
          position: relative;
        }

        .floating-input {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: 1px solid #ccc;
          background: white;
          outline: none;
        }

        .floating-group label {
          position: absolute;
          left: 12px;
          top: 14px;
          font-size: 14px;
          color: #666;
          transition: 0.3s;
        }

        .floating-input:focus + label,
        .floating-input:not(:placeholder-shown) + label {
          top: -8px;
          font-size: 12px;
          background: white;
          padding: 0 5px;
        }
      `}</style>

    </div>
  );
}