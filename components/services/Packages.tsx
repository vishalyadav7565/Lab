"use client";

import { useState } from "react";
import { HeartPulse, Activity, ShieldPlus, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Packages() {
  const [cart, setCart] = useState([]);

  const packages = [
    {
      icon: HeartPulse,
      name: "Basic Health Checkup",
      tests: "CBC, Blood Sugar, Hemoglobin & essential tests.",
      price: 799,
      original: 1299,
      popular: false,
      color: "text-blue-600 bg-blue-100",
    },
    {
      icon: Activity,
      name: "Advanced Health Checkup",
      tests: "CBC, LFT, KFT, Lipid Profile & more.",
      price: 1499,
      original: 2499,
      popular: true, // ⭐ highlight
      color: "text-teal-600 bg-teal-100",
    },
    {
      icon: ShieldPlus,
      name: "Full Body Checkup",
      tests: "Complete body screening with 50+ tests.",
      price: 2499,
      original: 3999,
      popular: false,
      color: "text-indigo-600 bg-indigo-100",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
            Full Body Checkup Packages
          </h2>
          <p className="text-gray-600 mt-3">
            Choose the best health package for you and your family.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">

          {packages.map((pkg, index) => {
            const Icon = pkg.icon;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className={`relative p-6 rounded-2xl border shadow-md bg-white/80 backdrop-blur-md transition hover:shadow-xl ${
                  pkg.popular ? "border-blue-500 scale-105" : "border-gray-200"
                }`}
              >

                {/* ⭐ MOST POPULAR */}
                {pkg.popular && (
                  <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <Star size={12} /> Most Popular
                  </div>
                )}

                {/* ICON */}
                <div className={`w-14 h-14 flex items-center justify-center rounded-xl mx-auto mb-4 ${pkg.color}`}>
                  <Icon size={28} />
                </div>

                {/* NAME */}
                <h3 className="text-xl font-semibold text-blue-900 text-center">
                  {pkg.name}
                </h3>

                {/* TESTS */}
                <p className="text-gray-600 mt-3 text-sm text-center">
                  {pkg.tests}
                </p>

                {/* PRICE */}
                <div className="flex justify-center items-center gap-3 mt-5">
                  <span className="text-2xl font-bold text-blue-900">
                    ₹{pkg.price}
                  </span>
                  <span className="line-through text-gray-400 text-sm">
                    ₹{pkg.original}
                  </span>
                </div>

                {/* BUTTON */}
                <button
                  onClick={() => setCart([...cart, pkg])}
                  className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                >
                  Book Package
                </button>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}