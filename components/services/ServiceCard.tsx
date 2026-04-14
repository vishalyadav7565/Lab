"use client";

import { useState } from "react";
import { Droplet, ShoppingCart, ShieldCheck, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function BloodTests() {
  const [cart, setCart] = useState<typeof tests>([]);
  const [activeTab, setActiveTab] = useState("All");

  const tests = [
    {
      name: "CBC Test",
      desc: "Complete Blood Count to check overall health.",
      price: 399,
      original: 699,
      tag: "Popular",
    },
    {
      name: "LFT Test",
      desc: "Liver Function Test to check liver health.",
      price: 499,
      original: 899,
      tag: "Popular",
    },
    {
      name: "KFT Test",
      desc: "Kidney Function Test to monitor kidney health.",
      price: 499,
      original: 799,
      tag: "Recommended",
    },
    {
      name: "Blood Sugar",
      desc: "Check glucose levels in your blood.",
      price: 199,
      original: 299,
      tag: "Basic",
    },
    {
      name: "Thyroid Test",
      desc: "Detect thyroid hormone imbalance.",
      price: 349,
      original: 599,
      tag: "Popular",
    },
    {
      name: "Lipid Profile",
      desc: "Check cholesterol and heart health.",
      price: 599,
      original: 999,
      tag: "Recommended",
    },
  ];

  const filteredTests =
    activeTab === "All"
      ? tests
      : tests.filter((t) => t.tag === activeTab);

  const addToCart = (test: typeof tests[0]) => {
    setCart([...cart, test]);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* 🔥 HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
              Popular Blood Tests
            </h2>
            <p className="text-gray-600 mt-1 text-sm">
              Book affordable tests with accurate results
            </p>
          </div>

          {/* 🛒 CART */}
          <div className="flex items-center gap-2 text-blue-600 bg-white px-4 py-2 rounded-xl shadow">
            <ShoppingCart />
            <span className="font-semibold">{cart.length}</span>
          </div>
        </div>

        {/* 🔥 TRUST BADGES */}
        <div className="flex flex-wrap gap-6 mb-10 text-sm text-gray-600">
          <span className="flex items-center gap-2">
            <ShieldCheck size={16} /> NABL Certified Labs
          </span>
          <span className="flex items-center gap-2">
            <Clock size={16} /> Reports in 24 hrs
          </span>
          <span className="flex items-center gap-2">
            <Droplet size={16} /> Free Home Collection
          </span>
        </div>

        {/* 🔥 FILTER TABS */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {["All", "Popular", "Recommended", "Basic"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white border text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 🔥 CARDS */}
        <div className="grid md:grid-cols-3 gap-8">
          {filteredTests.map((test, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              className="relative bg-white border rounded-2xl p-6 shadow-sm hover:shadow-xl transition"
            >

              {/* 🏷️ TAG */}
              <span className="absolute top-4 right-4 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                {test.tag}
              </span>

              {/* ICON + TITLE */}
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Droplet className="text-blue-600" size={22} />
                </div>
                <h3 className="text-lg font-semibold text-blue-900">
                  {test.name}
                </h3>
              </div>

              {/* DESC */}
              <p className="text-gray-600 text-sm mb-4">
                {test.desc}
              </p>

              {/* PRICE */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-blue-900">
                  ₹{test.price}
                </span>
                <span className="line-through text-gray-400 text-sm">
                  ₹{test.original}
                </span>
                <span className="text-green-600 text-sm font-medium">
                  {Math.round(
                    ((test.original - test.price) / test.original) * 100
                  )}
                  % OFF
                </span>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3">
                <button
                  onClick={() => addToCart(test)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Add to Cart
                </button>

                <button className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50">
                  Details
                </button>
              </div>

            </motion.div>
          ))}
        </div>

        {/* 🔥 CTA */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
            View All Tests
          </button>
        </div>

      </div>
    </section>
  );
}