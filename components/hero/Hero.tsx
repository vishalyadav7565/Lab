"use client";

import { useState } from "react";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const categories = [
  "CBC",
  "Diabetes",
  "Thyroid",
  "Full Body",
  "Vitamin",
];

const stats = [
  { label: "Tests Available", value: "100+" },
  { label: "Happy Patients", value: "10K+" },
  { label: "Reports Delivered", value: "50K+" },
];

export default function Hero() {
  const [query, setQuery] = useState("");

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">

      {/* ✅ BACKGROUND IMAGE */}
      <div className="absolute inset-0 -z-10">
        <CldImage
          src="lab_pmzgac" // 👈 replace with your public ID
          alt="Lab Background"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-20"
        />
      </div>
      {/* ✅ OVERLAY */}
      <div className="absolute inset-0 bg-white/85 -z-10"></div>

      {/* ✅ CONTENT */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-10 md:gap-12 items-center">

        {/* LEFT */}
        <div>
          <p className="text-blue-600 font-semibold text-sm mb-2">
            Trusted Diagnostic Lab
          </p>

          <h1 className="text-3xl md:text-5xl font-bold text-blue-900 leading-tight">
            Book Lab Tests Easily,
            <br />
            Get Accurate Reports Fast
          </h1>

          <p className="mt-4 text-gray-600 text-base md:text-lg">
            Book blood tests online with certified labs. Fast reports
            and home sample collection.
          </p>

          {/* 🔍 SEARCH */}
          <div className="mt-6 bg-white border-2 border-blue-300 rounded-xl p-2 flex items-center shadow-sm">
            <Search className="text-blue-600 ml-2" />

            <input
              type="text"
              placeholder="Search tests (CBC, Thyroid...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-3 py-2 outline-none text-blue-900 text-sm md:text-base"
            />

            <button className="bg-blue-600 text-white px-4 md:px-5 py-2 rounded-lg hover:bg-blue-700 transition">
              Search
            </button>
          </div>

          {/* 🧪 CATEGORY PILLS */}
          <div className="mt-5 flex flex-wrap gap-2 md:gap-3">
            {categories.map((item, i) => (
              <span
                key={i}
                className="px-3 md:px-4 py-1.5 text-xs md:text-sm bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 cursor-pointer"
              >
                {item}
              </span>
            ))}
          </div>

          {/* 📊 STATS */}
          <div className="mt-8 flex flex-wrap gap-6 md:gap-8">
            {stats.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-blue-900">
                  {item.value}
                </h3>
                <p className="text-gray-600 text-xs md:text-sm">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex justify-center"
        >
          <Image
            src="/blood.png"
            alt="Lab"
            width={450}
            height={380}
            className="rounded-xl shadow-lg"
          />

          {/* FLOATING CARD 1 */}
          <div className="absolute top-4 md:top-6 left-0 bg-white border border-blue-100 shadow-md px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm">
            <p className="font-semibold text-blue-900">
              Home Collection
            </p>
            <p className="text-gray-500">Available</p>
          </div>

          {/* FLOATING CARD 2 */}
          <div className="absolute bottom-4 md:bottom-6 right-0 bg-white border border-blue-100 shadow-md px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm">
            <p className="font-semibold text-blue-900">
              Reports in 24 hrs
            </p>
            <p className="text-gray-500">Accurate & Fast</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}