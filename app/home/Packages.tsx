"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const packages = [
  {
    id: "full-body-essential",
    name: "Full Body Checkup",
    subtitle: "91 Parameters • Reports in 6 hrs",
    price: "₹1599",
    image:
      "https://images.unsplash.com/photo-1580281657527-47c1d3a0c1f5?q=80&w=1200",
  },
  {
    id: "full-body-advanced",
    name: "Advanced Health Package",
    subtitle: "100 Parameters • Fast Reports",
    price: "₹2799",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1200",
  },
  {
    id: "full-body-ultra",
    name: "Premium Full Body",
    subtitle: "120 Parameters • Complete Care",
    price: "₹3499",
    image:
      "https://images.unsplash.com/photo-1588776814546-ec7e6d6a3c6b?q=80&w=1200",
  },
];

export default function PackagesSection2() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-indigo-50">

      <div className="max-w-7xl mx-auto px-4">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Health Packages
        </h2>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6">

          {packages.map((pkg, i) => (
            <Link key={i} href={`/tests/${pkg.id}`}>

              <motion.div
                whileHover={{ scale: 1.04 }}
                className="relative h-[320px] rounded-3xl overflow-hidden cursor-pointer group shadow-xl"
              >

                {/* IMAGE */}
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* CONTENT */}
                <div className="absolute bottom-5 left-5 right-5 text-white">

                  <h3 className="text-xl font-semibold">
                    {pkg.name}
                  </h3>

                  <p className="text-sm opacity-90">
                    {pkg.subtitle}
                  </p>

                  <div className="mt-3 flex justify-between items-center">

                    <span className="text-lg font-bold">
                      {pkg.price}
                    </span>

                    <span className="bg-white/20 px-3 py-1 text-xs rounded-full">
                      View →
                    </span>

                  </div>

                </div>

              </motion.div>

            </Link>
          ))}

        </div>

      </div>
    </section>
  );
}