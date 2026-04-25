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

      {/* SOFT SKY GLOW */}
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
          onClick={() => ref.current?.scrollBy({ left: -300, behavior: "smooth" })}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
          bg-white shadow p-2 rounded-full"
        >
          <ChevronLeft />
        </button>

        {/* RIGHT */}
        <button
          onClick={() => ref.current?.scrollBy({ left: 300, behavior: "smooth" })}
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

  return (
    <div className="relative min-w-[290px] max-w-[290px] group">

      {/* GLOW */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-sky-300 via-blue-300 to-indigo-300 
      rounded-3xl blur opacity-30 group-hover:opacity-50 transition"></div>

      {/* CARD */}
      <div className="relative bg-gradient-to-br from-blue-500 via-sky-50 to-blue-50 
      border border-sky-100 rounded-3xl overflow-hidden p-5 
      shadow-md hover:shadow-xl hover:-translate-y-2 
      transition-all duration-500">

        {/* BADGE */}
        {highlight && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-sky-500 to-blue-600 
          text-white text-xs px-3 py-1 rounded-full shadow">
            ⭐ Best Seller
          </div>
        )}

        {/* TITLE */}
        <h3 className="text-sm font-semibold text-gray-800">
          {test.name}
        </h3>

        {/* PRICE */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
            ₹{test.price}
          </span>
          <span className="line-through text-xs text-gray-400">
            ₹{test.original}
          </span>
        </div>

        {/* INFO */}
        <div className="flex justify-between text-xs text-gray-600 mt-3">
          <span>{test.parameters}</span>
          <span>{test.time}</span>
        </div>

        {/* RATING */}
        <div className="flex items-center gap-2 text-xs mt-3">
          <span className="text-yellow-500">⭐</span>
          <span className="text-gray-700">{rating}</span>
          <span className="text-gray-400">({reviews})</span>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-gradient-to-r from-sky-200 to-blue-200 my-3"></div>

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
            hover:scale-[1.03] transition shadow-sm"
          >
            Book Now
          </a>

          <Link
            href={`/tests/${test.id}`}
            className="block text-center border border-sky-300 text-sky-600 
            py-2 rounded-xl text-sm hover:bg-sky-100 transition"
          >
            Details
          </Link>

        </div>
      </div>
    </div>
  );
}