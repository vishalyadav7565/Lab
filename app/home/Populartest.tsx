"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categories } from "../data/categories";

/* ================= HELPERS ================= */

const getWhatsAppLink = (test: any) => {
  const phone = "917572055787";
  const msg = `Hi, I want to book ${test.name} (₹${test.price})`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
};

const getRating = () => ({
  rating: (4 + Math.random()).toFixed(1),
  reviews: Math.floor(500 + Math.random() * 2000),
});

/* ================= MAIN ================= */

export default function PopularTests() {
  const [search, setSearch] = useState("");

  const filtered = categories.map((cat) => ({
    ...cat,
    tests: cat.tests.filter((t: any) =>
      t.name.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  return (
    <section className="py-20 bg-gradient-to-b from-[#e0f2fe] via-white to-[#f0f9ff] relative overflow-hidden">
      {/* BG GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.25),transparent_60%)]"></div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
          Popular Health Packages
        </h2>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search tests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 mx-auto block mb-14 px-4 py-3 rounded-xl 
          bg-white border border-gray-200 text-gray-800 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-sm"
        />

        {/* CATEGORY */}
        {filtered.map((cat, i) => (
          <CategorySlider key={i} category={cat} />
        ))}
      </div>
    </section>
  );
}

/* ================= SLIDER ================= */

function CategorySlider({ category }: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const id = setInterval(() => {
      el.scrollBy({ left: 300, behavior: "smooth" });
    }, 4000);

    return () => clearInterval(id);
  }, []);

  if (!category.tests.length) return null;

  return (
    <div className="mb-14">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">
        {category.title}
      </h3>

      <div className="relative">
        {/* LEFT */}
        <button
          onClick={() =>
            ref.current?.scrollBy({ left: -300, behavior: "smooth" })
          }
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
          bg-white shadow p-2 rounded-full"
        >
          <ChevronLeft />
        </button>

        {/* RIGHT */}
        <button
          onClick={() =>
            ref.current?.scrollBy({ left: 300, behavior: "smooth" })
          }
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
          bg-white shadow p-2 rounded-full"
        >
          <ChevronRight />
        </button>

        {/* CARDS */}
        <div
          ref={ref}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
        >
          {category.tests.map((t: any, i: number) => (
            <div key={i} className="snap-start">
              <TestCard test={t} highlight={i === 0} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= CARD ================= */

function TestCard({ test, highlight }: any) {
  const { rating, reviews } = getRating();

  const discount = Math.round(
    ((test.original - test.price) / test.original) * 100
  );

  return (
    <div className="relative min-w-[290px] max-w-[290px] group">
      {/* GLOW */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-sky-300 via-blue-300 to-indigo-300 
      rounded-3xl blur opacity-20 group-hover:opacity-40 transition"></div>

      {/* CARD */}
      <div className="relative bg-white border border-gray-100 rounded-3xl p-5 
      shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]
      transition-all duration-500">

        {/* DEAL BADGE */}
        <div className="absolute top-3 left-3 animate-pulse">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 
          text-white text-[10px] px-3 py-1 rounded-full shadow font-semibold">
            🔥 Deal
          </div>
        </div>

        {/* BEST SELLER */}
        {highlight && (
          <div className="absolute top-3 right-3 bg-blue-600 
          text-white text-xs px-3 py-1 rounded-full shadow">
            ⭐ Best Seller
          </div>
        )}

        {/* TITLE */}
        <h3 className="text-sm font-semibold text-gray-900 mt-6">
          {test.name}
        </h3>

        {/* PRICE UI */}
        <div className="mt-3 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">
              ₹{test.price}
            </span>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400 line-through">
                ₹{test.original}
              </span>

              <span className="text-sm font-semibold text-green-600">
                {discount}% off
              </span>
            </div>
          </div>

          <div className="bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded-lg">
            Save ₹{test.original - test.price}
          </div>
        </div>

        {/* INFO */}
        <div className="flex justify-between text-xs text-gray-600 mt-3">
          <span>{test.parameters}</span>
          <span>{test.time}</span>
        </div>

        {/* RATING */}
        <div className="flex items-center gap-2 text-xs mt-3">
          <span className="text-yellow-500">⭐</span>
          <span className="text-gray-800 font-medium">{rating}</span>
          <span className="text-gray-500">({reviews})</span>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-gray-200 my-3"></div>

        {/* INCLUDED */}
        <div className="space-y-1 text-xs text-gray-600">
          {test.includes?.slice(0, 3).map((item: string, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-sky-500 text-[10px]">●</span>
              {item}
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="mt-4 space-y-2">
          <a
            href={getWhatsAppLink(test)}
            target="_blank"
            className="block text-center bg-gradient-to-r from-sky-500 to-blue-600 
            text-white py-2 rounded-xl text-sm font-medium 
            active:scale-95 hover:scale-[1.03] transition"
          >
            Book Now
          </a>

          <Link
            href={`/tests/${test.id}`}
            className="block text-center border border-gray-300 text-gray-700 
            py-2 rounded-xl text-sm hover:bg-gray-100 transition"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}