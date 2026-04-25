"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ClipboardList, UserCheck, FileText } from "lucide-react";

export default function HomeCollectionPage() {
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: today,
    time: "",
    address: "",
  });

  const slots = [
    "6 AM - 8 AM",
    "8 AM - 10 AM",
    "10 AM - 12 PM",
    "12 PM - 2 PM",
  ];

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.time) {
      alert("Please fill all required fields");
      return;
    }
    alert("✅ Booking Confirmed");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-200">

      <Navbar />

      {/* HERO */}
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold text-gray-900">
          Home Sample Collection
        </h1>
        <p className="text-gray-600 mt-2">
          Book your lab test from home in seconds
        </p>
      </section>

      {/* 🔥 TIMELINE SECTION */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-100">

        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              How Home Collection Works
            </h2>
            <p className="text-gray-600 mt-3">
              Simple, fast and hassle-free process
            </p>
          </div>

          <div className="relative">

            {/* LINE */}
            <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-blue-400 to-indigo-500 transform -translate-x-1/2"></div>

            {[
              {
                icon: <ClipboardList />,
                title: "Book Your Test",
                desc: "Select your test and choose a convenient time slot.",
              },
              {
                icon: <UserCheck />,
                title: "Sample Collection",
                desc: "Certified professional visits your home safely.",
              },
              {
                icon: <FileText />,
                title: "Get Reports",
                desc: "Receive accurate digital reports quickly.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className={`mb-16 flex flex-col md:flex-row items-center ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >

                {/* CARD */}
                <div className="md:w-1/2 p-4">
                  <div className="glass-card p-6 rounded-2xl">

                    <div className="flex items-center gap-3 text-blue-600 mb-3">
                      {step.icon}
                      <h3 className="text-lg font-semibold text-gray-900">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 text-sm">
                      {step.desc}
                    </p>

                  </div>
                </div>

                {/* DOT */}
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg z-10">
                  {i + 1}
                </div>

                <div className="md:w-1/2"></div>

              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* 🔥 GLASS FORM */}
      <section className="max-w-4xl mx-auto p-6">
        <div className="glass-card p-8 rounded-3xl">

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Book Home Collection
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="floating-group">
              <input
                required
                placeholder=" "
                className="floating-input"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
              <label>Full Name</label>
            </div>

            <div className="floating-group">
              <input
                required
                placeholder=" "
                className="floating-input"
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />
              <label>Phone Number</label>
            </div>

            <div className="floating-group">
              <input
                type="date"
                value={form.date}
                min={today}
                placeholder=" "
                className="floating-input"
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
              />
              <label>Date</label>
            </div>

          </div>

          {/* SLOT */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">
              Select Time Slot
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setForm({ ...form, time: slot })}
                  className={`slot ${
                    form.time === slot ? "active" : ""
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* ADDRESS */}
          <div className="floating-group mt-6">
            <textarea
              placeholder=" "
              className="floating-input h-24"
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />
            <label>Address</label>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            className="mt-6 w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition shadow-xl"
          >
            Confirm Booking
          </button>

        </div>
      </section>

      <Footer />

      {/* 🎨 STYLES */}
      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
          transition: 0.3s;
        }

        .glass-card:hover {
          transform: translateY(-6px);
        }

        .floating-group {
          position: relative;
        }

        .floating-input {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: 1px solid #ccc;
          background: rgba(255,255,255,0.8);
          color: #111;
          outline: none;
        }

        .floating-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 10px rgba(37, 99, 235, 0.4);
        }

        .floating-group label {
          position: absolute;
          left: 12px;
          top: 14px;
          font-size: 14px;
          color: #666;
          transition: 0.3s;
        }

        .floating-input:focus + label,
        .floating-input:not(:placeholder-shown) + label {
          top: -8px;
          font-size: 12px;
          background: white;
          padding: 0 5px;
        }

        .slot {
          padding: 10px;
          border-radius: 10px;
          border: 1px solid #ccc;
          background: white;
          transition: 0.3s;
        }

        .slot:hover {
          border-color: #2563eb;
        }

        .active {
          background: linear-gradient(to right, #2563eb, #4f46e5);
          color: white;
        }
      `}</style>

    </div>
  );
}