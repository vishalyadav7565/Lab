"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";

const categories = [
  {
    title: "Full Body Checkups",
    tests: [
      {
        id: "full-body-essential",
        name: "Essential Checkup",
        price: 1599,
        original: 5243,
        parameters: "91 parameters",
        time: "Reports in 6 hrs",
      },
      {
        id: "full-body-advanced",
        name: "Advanced Checkup",
        price: 2799,
        original: 7708,
        parameters: "100 parameters",
        time: "Reports in 6 hrs",
      },
      {
        id: "full-body-ultra",
        name: "Ultra Checkup",
        price: 3499,
        original: 9999,
        parameters: "120 parameters",
        time: "Reports in 12 hrs",
      },
    ],
  },
  {
    title: "Women Health Checkups",
    tests: [
      {
        id: "women-essential",
        name: "Essential Women Care",
        price: 1599,
        original: 5563,
        parameters: "71 parameters",
        time: "Reports in 12 hrs",
      },
      {
        id: "women-advanced",
        name: "Advanced Women Care",
        price: 2699,
        original: 11013,
        parameters: "97 parameters",
        time: "Reports in 12 hrs",
      },
    ],
  },
];

export default function PackagesSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {categories.map((category, idx) => (
          <CategorySlider key={idx} category={category} />
        ))}
      </div>
    </section>
  );
}

/* ================= CATEGORY SLIDER ================= */

function CategorySlider({ category }: any) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 🔁 AUTO SCROLL
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      container.scrollBy({ left: 320, behavior: "smooth" });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-16">
      {/* TITLE */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        {category.title}
      </h2>

      <div className="relative">
        {/* LEFT BUTTON */}
        <button
          onClick={() =>
            scrollRef.current?.scrollBy({
              left: -320,
              behavior: "smooth",
            })
          }
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl p-3 rounded-full transition"
        >
          <ChevronLeft />
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={() =>
            scrollRef.current?.scrollBy({
              left: 320,
              behavior: "smooth",
            })
          }
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl p-3 rounded-full transition"
        >
          <ChevronRight />
        </button>

        {/* CARDS */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-4"
        >
          {category.tests.map((test: any, i: number) => (
            <TestCard key={i} test={test} highlight={i === 0} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= TEST CARD ================= */

function TestCard({ test, highlight }: any) {
  return (
    <div
      className={`min-w-[320px] relative group rounded-3xl overflow-hidden 
      bg-white/80 backdrop-blur-lg border border-gray-200 
      shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
        highlight ? "ring-2 ring-orange-400" : ""
      }`}
    >
      {/* 🔥 POPULAR TAG */}
      {highlight && (
        <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow">
          ⭐ Most Popular
        </div>
      )}

      {/* HEADER */}
      <div className="bg-gradient-to-br from-green-600 via-emerald-500 to-green-400 text-white p-6">
        <p className="text-xs uppercase tracking-wide opacity-80">
          Health Package
        </p>

        <h3 className="text-lg font-semibold mt-1">{test.name}</h3>

        {/* PRICE */}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-2xl font-bold">₹{test.price}</span>

          <span className="line-through text-sm opacity-70">
            ₹{test.original}
          </span>

          <span className="bg-white/20 text-xs px-2 py-1 rounded-md">
            {Math.round(
              ((test.original - test.price) / test.original) * 100
            )}
            % OFF
          </span>
        </div>
      </div>

      {/* BODY */}
      <div className="p-5">
        {/* INFO */}
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span className="font-medium">{test.parameters}</span>
          <span>{test.time}</span>
        </div>

        {/* RATING */}
        <div className="flex items-center gap-2 text-sm mb-3">
          <span className="text-yellow-500">⭐</span>
          <span className="font-medium">4.8</span>
          <span className="text-gray-400">(1200 reviews)</span>
        </div>

        {/* DETAILS */}
        <details className="text-sm text-gray-600 mb-4">
          <summary className="cursor-pointer font-medium text-green-600">
            View Included Tests
          </summary>

          <ul className="mt-2 list-disc ml-5 space-y-1 text-gray-500">
            <li>Hemoglobin</li>
            <li>RBC Count</li>
            <li>WBC Count</li>
          </ul>
        </details>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-4">
          <Link
            href={`/tests/${test.id}`}
            className="flex-1 text-center border border-green-600 text-green-600 py-2.5 rounded-xl font-medium hover:bg-green-50 transition"
          >
            View
          </Link>

          <button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-400 text-white py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 shadow hover:shadow-lg transition">
            <ShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}