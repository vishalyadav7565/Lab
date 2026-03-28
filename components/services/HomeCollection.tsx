"use client";

import { useState } from "react";
import { Home, CalendarCheck, ShieldCheck, X } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HomeCollection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
              Home Sample Collection <br />
              <span className="text-teal-600">At Your Convenience</span>
            </h2>

            <p className="text-gray-600 mt-4 max-w-lg">
              Book your blood test online and our certified technician will
              visit your home safely and conveniently.
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
              <button
                onClick={() => setOpen(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700"
              >
                Book Home Collection
              </button>

              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50">
                Visit Our Lab
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative grid grid-cols-2 gap-6">

            {/* FLOATING CARDS */}
            {[ 
              { icon: Home, text: "Doorstep Collection" },
              { icon: CalendarCheck, text: "Easy Booking" },
              { icon: ShieldCheck, text: "Safe & Hygienic" }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  className={`bg-white/80 backdrop-blur-md border border-blue-100 p-5 rounded-2xl shadow-md text-center ${
                    i === 2 ? "col-span-2" : ""
                  }`}
                >
                  <Icon size={40} className="text-blue-600 mx-auto" />
                  <p className="mt-3 font-medium text-blue-900">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}

            {/* DOCTOR SVG IMAGE */}
            <div className="absolute -bottom-10 right-0 w-40 opacity-90 hidden md:block">
              <Image
                src="/doctor.svg" // 👈 put SVG in public folder
                alt="Doctor"
                width={160}
                height={160}
              />
            </div>

          </div>

        </div>

      </div>

      {/* 🧾 BOOKING MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative"
          >
            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X />
            </button>

            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Book Home Collection
            </h3>

            {/* FORM */}
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border p-3 rounded-lg outline-none"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border p-3 rounded-lg outline-none"
              />

              <input
                type="text"
                placeholder="Address"
                className="w-full border p-3 rounded-lg outline-none"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Confirm Booking
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
}