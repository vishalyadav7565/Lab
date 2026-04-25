"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Users, Activity } from "lucide-react";
import Image from "next/image";
import DoctorImage from "@/public/image/Doctor.jpeg";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AIChatWidget from "@/components/AIChatWidget";

export default function About() {
  const images = [
    "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/lab1.jpg",
    "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/lab2.jpg",
    "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/lab3.jpg",
  ];

  const [index, setIndex] = useState(0);

  // 🔄 AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
<section className="relative h-[90vh] flex items-center justify-center overflow-hidden">

      {/* 🔥 BACKGROUND SLIDER */}
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute w-full h-full bg-cover bg-center transition-all duration-1000 ${
            i === index ? "opacity-100 scale-110" : "opacity-0 scale-100"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* 🌈 GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-indigo-800/60 to-purple-700/60"></div>

      {/* ✨ CONTENT */}
      <div className="relative z-10 text-center px-6 text-white">

        {/* HEADING */}
        <motion.h1
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          About Our Diagnostic Lab
        </motion.h1>

        {/* TEXT */}
        <motion.p
          key={"text-" + index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 max-w-2xl mx-auto text-gray-200"
        >
          Delivering accurate, fast, and reliable diagnostic services
          with advanced technology and expert medical professionals.
        </motion.p>

        {/* BADGES */}
        <motion.div
          key={"badges-" + index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          {[
            "✔ 10K+ Patients",
            "✔ Certified Lab",
            "✔ Fast Reports",
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/20 backdrop-blur-md px-5 py-2 rounded-xl text-sm"
            >
              {item}
            </div>
          ))}
        </motion.div>

      </div>

    </section>


      {/* ABOUT */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Who We Are
            </h2>

            <p className="mt-4 text-gray-600 leading-relaxed">
              We are a modern diagnostic platform dedicated to delivering
              accurate, fast, and reliable lab testing services.
            </p>

            <p className="mt-3 text-gray-600">
              Our mission is to simplify healthcare by bringing lab services
              directly to your home with complete safety and accuracy.
            </p>

            {/* POINTS */}
            <div className="mt-6 space-y-3">
              {[
                "100% accurate and verified reports",
                "Home sample collection",
                "Fast digital reports",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">
                    ✓
                  </span>
                  <p className="text-gray-700 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative group">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={Image}
                alt="Doctor"
                className="w-full h-96 object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            {/* FLOAT CARD */}
            <div className="absolute -bottom-6 left-6 bg-white p-4 rounded-xl shadow-lg">
              <p className="text-sm font-semibold text-gray-900">
                10+ Years Experience
              </p>
              <p className="text-xs text-gray-500">
                Trusted by thousands
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* VIDEO */}
      <section className="py-16 text-center bg-white">
        <h2 className="text-3xl font-bold text-gray-900">
          Inside Our Lab
        </h2>

        <p className="text-gray-500 mt-2 mb-6">
          See how we ensure quality and accuracy
        </p>

        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-xl">
          <video
            src="/video/doctor.mp4"
            controls
            className="w-full h-[400px] object-cover"
          />
        </div>
      </section>

      {/* DOCTORS */}
      {/* DOCTOR SECTION 🔥 */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold text-gray-900">
            Meet Our Expert
          </h2>

          <p className="text-gray-500 mt-2 mb-10">
            Experienced professionals dedicated to your health
          </p>

          <div className="max-w-sm mx-auto bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition">

            <Image
                    src={DoctorImage}
                    alt="Doctor"
                    className="w-full h-100 object-cover group-hover:scale-105 transition duration-500"
                  />

            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              Akansha Verma
            </h3>

            <p className="text-blue-600 text-sm font-medium">
              MSC Medical Laboratory Technology (MLT)


            </p>

            <p className="text-gray-600 text-sm mt-3">
              6+ years of experience in diagnostic medicine, specializing
              in pathology and clinical testing with a focus on accuracy
              and patient care.
            </p>

          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 text-center gap-6">
          {[
            ["10K+", "Happy Patients"],
            ["50K+", "Reports Delivered"],
            ["100+", "Tests Available"],
          ].map((item, i) => (
            <div key={i}>
              <h3 className="text-3xl font-bold text-blue-600">
                {item[0]}
              </h3>
              <p className="text-gray-600 text-sm">{item[1]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-100">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold text-gray-900">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">

            <div className="card gradient-blue">
              <ShieldCheck size={28} />
              <h3>Certified Lab</h3>
              <p>Accurate & trusted reports with certification.</p>
            </div>

            <div className="card gradient-purple">
              <Users size={28} />
              <h3>Expert Team</h3>
              <p>Highly experienced medical professionals.</p>
            </div>

            <div className="card gradient-green">
              <Activity size={28} />
              <h3>Fast Reports</h3>
              <p>Quick turnaround with digital access.</p>
            </div>

          </div>

        </div>
      </section>
      {/* 📍 LOCATION SECTION */}
<section className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

    {/* LEFT - ADDRESS */}
    <div>
      <h2 className="text-3xl font-bold text-gray-900">
        Visit Our Lab
      </h2>

      <p className="text-gray-500 mt-3">
        You can visit our diagnostic center or book home collection.
      </p>

      <div className="mt-6 space-y-4">

        <div>
          <h3 className="font-semibold text-gray-900">
            📍 Address
          </h3>
          <p className="text-gray-600 text-sm">
            Delhi, India
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">
            📞 Phone
          </h3>
          <p className="text-gray-600 text-sm">
            +91 7572055787
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">
            🕒 Timings
          </h3>
          <p className="text-gray-600 text-sm">
            Mon - Sun: 7:00 AM - 9:00 PM
          </p>
        </div>

      </div>

      {/* BUTTON */}
      <a
        href="https://www.google.com/maps?q=28.6139,77.2090"
        target="_blank"
        className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
      >
        Get Directions →
      </a>
    </div>

    {/* RIGHT - MAP */}
    <div className="rounded-3xl overflow-hidden shadow-xl border">
      <iframe
        src="https://www.google.com/maps?q=28.6139,77.2090&z=14&output=embed"
        width="100%"
        height="350"
        style={{ border: 0 }}
        loading="lazy"
      ></iframe>
    </div>

  </div>
</section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-center text-white">
        <h2 className="text-3xl font-bold">
          Book Your Test Today
        </h2>
        <p className="mt-3 opacity-90">
          Accurate reports from the comfort of your home.
        </p>

        <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
          Book Now
        </button>
      </section>
  
      <Footer />

      {/* STYLES */}
      <style jsx>{`
        .card {
          padding: 28px;
          border-radius: 20px;
          color: white;
          transition: 0.3s;
        }

        .card:hover {
          transform: translateY(-8px);
        }

        .gradient-blue {
          background: linear-gradient(135deg, #2563eb, #1e40af);
        }

        .gradient-purple {
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
        }

        .gradient-green {
          background: linear-gradient(135deg, #059669, #047857);
        }
      `}</style>
    </>
  );
}