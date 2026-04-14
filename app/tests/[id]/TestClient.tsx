"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function TestClient({ test }: any) {
  const [aiText, setAiText] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [showParams, setShowParams] = useState(false);

  const handleAI = async () => {
    setLoading(true);
    const res = await fetch("/api/ai-test", {
      method: "POST",
      body: JSON.stringify({ testName: test.name }),
    });
    const data = await res.json();
    setAiText(data.text);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100">
        <Navbar/>

      {/* HERO */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <Image src={test.image} alt={test.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">
            {test.name}
          </h1>
          <p className="text-sm mt-1">🧪 {test.parameters}</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-4 -mt-16">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8"
        >

          {/* DESCRIPTION */}
          <p className="text-gray-600">{test.description}</p>

          {/* LOCATION CHECK */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">📍 Check Availability</h3>
            <div className="flex gap-2">
              <input
                placeholder="Enter your city"
                className="input flex-1"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button className="btn-primary px-4">Check</button>
            </div>
          </div>

          {/* AI */}
          <button
            onClick={handleAI}
            className="mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl"
          >
            {loading ? "Generating..." : "✨ Explain this Test"}
          </button>

          {aiText && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 bg-purple-50 p-4 rounded-xl"
            >
              {aiText}
            </motion.div>
          )}

          {/* PARAMETERS ACCORDION */}
          <div className="mt-8">
            <button
              onClick={() => setShowParams(!showParams)}
              className="w-full text-left font-semibold text-lg"
            >
              📊 Included Tests {showParams ? "▲" : "▼"}
            </button>

            {showParams && (
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-600">
                {test.includes?.map((item: string, i: number) => (
                  <div key={i}>✔ {item}</div>
                ))}
              </div>
            )}
          </div>

          {/* REVIEWS */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-4">
              ⭐ User Reviews
            </h3>

            <div className="space-y-4">
              {[1, 2, 3].map((r) => (
                <div
                  key={r}
                  className="p-4 bg-gray-50 rounded-xl border"
                >
                  <p className="text-sm text-gray-700">
                    “Very smooth experience. Reports were fast and accurate.”
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    — User {r}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 flex justify-between items-center">
            <p className="text-2xl font-bold text-indigo-600">
              ₹{test.price}
            </p>

            <Link
              href={`/book/${test.id}`}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold"
            >
              Book Test →
            </Link>
          </div>

        </motion.div>
      </div>

      {/* GLOBAL INPUT STYLE */}
      <style jsx>{`
        .input {
          @apply border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500;
        }
        .btn-primary {
          @apply bg-indigo-600 text-white rounded-xl px-4 py-2;
        }
      `}</style>
       <Footer/>
    </div>
   
  );
}