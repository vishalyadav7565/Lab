"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { tests } from "@/app/data/tests";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AllTestsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useRouter();

  const categories = ["All", ...new Set(tests.map(t => t.category))];

  const filteredTests = tests.filter((test) => {
    return (
      (selectedCategory === "All" || test.category === selectedCategory) &&
      test.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <Navbar />

      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold">Book Lab Tests Easily</h1>
        <p className="mt-3 opacity-90">
          Get accurate reports with home sample collection
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {[
            "🔥 50% OFF",
            "💉 Free Collection",
            "⚡ Fast Reports",
          ].map((offer, i) => (
            <div
              key={i}
              className="bg-white/20 backdrop-blur-md px-5 py-2 rounded-xl text-sm"
            >
              {offer}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-4 gap-6">

        {/* 🔥 SIDEBAR FILTER */}
        <div className="bg-zinc-500 p-5 rounded-2xl shadow-md h-fit sticky top-20">

          <h2 className="font-semibold mb-3">Categories</h2>

          <div className="space-y-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`block w-full text-left px-3 py-2 rounded-lg ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* CONTENT */}
        <div className="md:col-span-3">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="🔍 Search any test..."
            className="w-full p-4 rounded-2xl shadow-md border mb-6 outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-6">

            {filteredTests.map((test) => (
              <div
                key={test.id}
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-2xl transition border hover:border-blue-400 group relative"
              >

                <span className="absolute top-3 right-3 bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                  20% OFF
                </span>

                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                  {test.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {test.parameters}
                </p>

                <p className="text-sm text-gray-500">
                  {test.reportTime}
                </p>

                <div className="flex justify-between items-center mt-4">

                  <div>
                    <span className="text-xl font-bold text-blue-600">
                      ₹{test.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through ml-2">
                      ₹{test.price + 500}
                    </span>
                  </div>

                  <button
                    onClick={() => router.push(`/tests/${test.id}`)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-105 transition"
                  >
                    Book
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

      {/* 📱 MOBILE STICKY CTA */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-3 flex justify-between items-center md:hidden">

        <span className="text-sm text-gray-600">
          Need help choosing?
        </span>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">
          Book Now
        </button>

      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}