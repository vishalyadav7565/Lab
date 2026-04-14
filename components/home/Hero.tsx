"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const categories = ["CBC", "Diabetes", "Thyroid", "Full Body", "Vitamin"];

const stats = [
  { label: "Tests Available", value: "100+" },
  { label: "Happy Patients", value: "10K+" },
  { label: "Reports Delivered", value: "50K+" },
];

export default function Hero() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔥 AI Suggestion API Call (Debounced)
  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const delay = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/ai-tests", {
          method: "POST",
          body: JSON.stringify({ query }),
        });

        const data = await res.json();
        setSuggestions(data.tests || []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">

      {/* 🌄 Background */}
      <div className="absolute inset-0 -z-10">
        <CldImage
          src="lab_pmzgac"
          alt="Lab"
          fill
          priority
          className="object-cover opacity-20"
        />
      </div>
      <div className="absolute inset-0 bg-white/90 -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div>
          <p className="text-blue-600 font-semibold text-sm mb-2">
            Trusted Diagnostic Lab
          </p>

          <h1 className="text-3xl md:text-5xl font-bold text-blue-900 leading-tight max-w-xl">
            Book Lab Tests Easily,
            Get Accurate Reports Fast
          </h1>

          <p className="mt-4 text-gray-600 text-base md:text-lg max-w-lg">
            We deliver excellence in pathology services with strict quality
            control ensuring accurate and reliable results at affordable prices.
          </p>

          {/* 🔍 SEARCH */}
          <div className="mt-6 relative">
            <div className="bg-white border rounded-xl flex items-center shadow-md px-3">
              <Search className="text-blue-500" />

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tests or symptoms..."
                className="w-full px-3 py-3 outline-none"
              />

              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                Search
              </button>
            </div>

            {/* 🤖 AI Suggestions */}
            {query && (
              <div className="absolute w-full bg-white shadow-lg mt-2 rounded-xl border z-50">
                {loading ? (
                  <p className="p-3 text-sm text-gray-500">Thinking...</p>
                ) : suggestions.length > 0 ? (
                  suggestions.map((item, i) => (
                    <p
                      key={i}
                      onClick={() => setQuery(item)}
                      className="p-3 text-sm hover:bg-blue-50 cursor-pointer"
                    >
                      {item}
                    </p>
                  ))
                ) : (
                  <p className="p-3 text-sm text-gray-400">
                    No suggestions found
                  </p>
                )}
              </div>
            )}
          </div>

          {/* 🧪 Categories */}
          <div className="mt-5 flex flex-wrap gap-3">
            {categories.map((item, i) => (
              <span
                key={i}
                onClick={() => setQuery(item)}
                className="px-4 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 cursor-pointer"
              >
                {item}
              </span>
            ))}
          </div>

          {/* 📊 Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
            {stats.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-white rounded-xl shadow p-4 text-center"
              >
                <h3 className="text-xl font-bold text-blue-900">
                  {item.value}
                </h3>
                <p className="text-gray-600 text-xs">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative flex justify-center"
        >
          <Image
            src="/blood.png"
            alt="Lab"
            width={450}
            height={380}
            className="rounded-2xl shadow-xl hover:scale-105 transition"
          />

          {/* Floating Cards */}
          <div className="absolute top-6 left-0 bg-white shadow-md px-4 py-2 rounded-xl text-sm">
            <p className="font-semibold text-blue-900">Home Collection</p>
            <p className="text-gray-500">Available</p>
          </div>

          <div className="absolute bottom-6 right-0 bg-white shadow-md px-4 py-2 rounded-xl text-sm">
            <p className="font-semibold text-blue-900">Reports in 24 hrs</p>
            <p className="text-gray-500">Accurate & Fast</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}