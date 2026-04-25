"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useRouter } from "next/navigation";
import emailjs from "emailjs-com";
import { useMemo } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  FaFlask,
  FaClock,
  FaStar,
  FaUsers,
  FaRupeeSign,
} from "react-icons/fa";




import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TestClient({ test, content }: any) {
  const router = useRouter();

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [openChat, setOpenChat] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const [timeLeft, setTimeLeft] = useState(600);
  const [city, setCity] = useState("");
  const weeklyData = [
  { name: "Week 1", bookings: 40, reports: 30, users: 20 },
  { name: "Week 2", bookings: 65, reports: 50, users: 35 },
  { name: "Week 3", bookings: 55, reports: 45, users: 30 },
  { name: "Week 4", bookings: 80, reports: 70, users: 50 },
];

const monthlyData = [
  { name: "Jan", bookings: 120, reports: 90, users: 70 },
  { name: "Feb", bookings: 160, reports: 130, users: 100 },
  { name: "Mar", bookings: 200, reports: 170, users: 140 },
  { name: "Apr", bookings: 240, reports: 210, users: 180 },
];
const yearlyData = [
  { name: "2022", bookings: 1200, reports: 900, users: 700 },
  { name: "2023", bookings: 1800, reports: 1500, users: 1200 },
  { name: "2024", bookings: 2400, reports: 2000, users: 1700 },
];

 const [range, setRange] = useState("week");

  const data = useMemo(() => {
    if (range === "month") return monthlyData;
    if (range === "year") return yearlyData;
    return weeklyData;
  }, [range]);

  // 📈 Growth Calculation
  const growth = useMemo(() => {
    if (data.length < 2) return 0;
    const last = data[data.length - 1].bookings;
    const prev = data[data.length - 2].bookings;
    return (((last - prev) / prev) * 100).toFixed(1);
  }, [data]);


  // TIMER
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // LOCATION
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          setCity(data.address.city || data.address.state || "");
        } catch {}
      },
      () => {}
    );
  }, []);

  // EMAILJS
  const handleSubmit = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        e.target,
        "YOUR_PUBLIC_KEY"
      )
      .then(() => alert("✅ Booking Request Sent"))
      .catch(() => alert("❌ Failed"));

    e.target.reset();
  };

  // CHAT
  

  const scrollToForm = () => {
    document.getElementById("booking-form")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const chartData = [
    { name: "Jan", value: 40 },
    { name: "Feb", value: 60 },
    { name: "Mar", value: 55 },
    { name: "Apr", value: 70 },
  ];
  const handlebook = () => {
    setLoading(true);
    router.push(`/book/${test.id}`);
  };


  return (
    
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">

      <Navbar />
          {/* BADGES */}
     <div className="bg-white border-b border-gray-100 py-3 shadow-sm">
  <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-3 text-sm font-medium">

    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
      🔥 5000+ Bookings
    </span>

    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
      ⚡ Fast Reports
    </span>

    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
      🏥 Trusted Labs
    </span>

  </div>
</div>

      {/* HERO */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8 items-center">

        {/* LEFT */}
       <motion.div
  initial={{ opacity: 0, x: -40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5 }}
  className="space-y-6"
>

  {/* 🔥 BADGES */}
  <div className="flex flex-wrap gap-2 text-xs font-medium">
    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
      ⭐ {test.rating} Rating
    </span>
    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
      👥 {test.reviews}+ Users
    </span>
    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
      ✔ Safe & Accurate
    </span>
  </div>

  {/* 🧪 TITLE */}
  <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
    {test.name}
  </h1>

  {/* 📊 SUB INFO */}
  <p className="text-gray-600 text-base md:text-lg">
    🧪 <span className="font-medium">{test.parameters}</span> • ⚡{" "}
    <span className="font-medium">{test.reportTime}</span>
  </p>

  {/* ⏳ TIMER */}
  <div className="flex items-center gap-3">
    <div className="bg-black text-white px-4 py-2 rounded-xl shadow-md">
      ⏳ {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>

    <span className="text-sm text-gray-500">
      Limited time offer
    </span>
  </div>

  {/* 💰 PRICE */}
  <div className="flex items-center gap-4">
    <p className="text-4xl md:text-5xl font-extrabold text-green-600">
      ₹{test.price}
    </p>

    {test.original && (
      <>
        <span className="text-gray-400 line-through text-lg">
          ₹{test.original}
        </span>

        <span className="bg-green-600 text-white px-2 py-1 text-xs rounded-md">
          {Math.round(
            ((test.original - test.price) / test.original) * 100
          )}% OFF
        </span>
      </>
    )}
  </div>

  {/* 🚀 CTA */}
  <div className="flex flex-col sm:flex-row gap-3">

    <button
      onClick={handlebook}
      className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition rounded-xl"></span>

      <span className="relative z-10">
        🚀 Book Test Now
      </span>

      <span className="relative z-10 group-hover:translate-x-1 transition">
        →
      </span>
    </button>

    <a
      href={`https://wa.me/91XXXXXXXXXX?text=Hi I want to book ${test.name}`}
      target="_blank"
      className="inline-flex items-center justify-center gap-2 border border-green-600 text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition"
    >
      📲 WhatsApp
    </a>

  </div>

  {/* 🔒 TRUST LINE */}
  <p className="text-xs text-gray-400">
    🔒 100% Safe • No Hidden Charges • Instant Booking
  </p>

</motion.div>
        {/* CENTER IMAGE */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-6 bg-green-100 blur-3xl opacity-40 rounded-full"></div>

            <Image
              src={test.image || "/images/lab.jpg"}
              alt={test.name}
              width={300}
              height={300}
              className="relative z-10 drop-shadow-2xl"
            />
          </div>
        </div>

        {/* RIGHT FORM */}
        <motion.div
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5 }}
  className="lg:sticky lg:top-24"
>
  <div
    id="booking-form"
    className="bg-white border border-gray-100 shadow-2xl rounded-3xl p-6 md:p-7 space-y-5"
  >

    {/* HEADER */}
    <div>
      <h3 className="text-xl font-bold text-gray-900">
        Book Your Test
      </h3>
      <p className="text-sm text-gray-500 mt-1">
        Get reports quickly & securely
      </p>
    </div>

    {/* TRUST BADGES */}
    <div className="flex flex-wrap gap-2 text-xs font-medium">
      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
        ✔ Safe
      </span>
      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
        ⚡ Fast Reports
      </span>
      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
        🏥 Certified Labs
      </span>
    </div>

    {/* FORM */}
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* NAME */}
      <div>
        <input
          name="user_name"
          placeholder="Full Name"
          required
          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      {/* PHONE */}
      <div>
        <input
          name="user_phone"
          placeholder="Phone Number"
          required
          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      {/* CITY */}
      <div>
        <input
          name="user_city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      {/* CTA BUTTON */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition"
      >
        🚀 Book Now
      </button>

    </form>

    {/* EXTRA CTA (REPLACED WHATSAPP) */}
    <button
      onClick={scrollToForm}
      className="w-full border border-green-600 text-green-600 py-3 rounded-xl font-semibold hover:bg-green-50 transition"
    >
      📞 Request Callback
    </button>

    {/* TRUST FOOTER */}
    <p className="text-xs text-gray-400 text-center">
      🔒 No spam • 100% secure • We respect your privacy
    </p>

  </div>
</motion.div>
      </div>

      {/* CARDS */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 py-10">

  {[
    {
      title: "Parameters",
      value: test.parameters,
      icon: "🧪",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Report Time",
      value: test.reportTime,
      icon: "⚡",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Rating",
      value: test.rating,
      icon: "⭐",
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "Reviews",
      value: test.reviews,
      icon: "👥",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Price",
      value: `₹${test.price}`,
      icon: "💰",
      color: "from-rose-500 to-red-500",
    },
  ].map((item, i) => (

    <motion.div
      key={i}
      whileHover={{ scale: 1.08, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={scrollToForm}
      className={`cursor-pointer relative p-5 rounded-2xl text-white bg-gradient-to-br ${item.color} shadow-lg hover:shadow-2xl transition-all duration-300`}
    >

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 rounded-2xl transition"></div>

      {/* Content */}
      <div className="relative z-10">

        <div className="text-2xl mb-2">{item.icon}</div>

        <p className="text-sm opacity-90">{item.title}</p>

        <p className="text-xl font-bold">
          {item.value}
        </p>

      </div>

    </motion.div>

  ))}

</div>

      {/* GRAPH */}
    < div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-xl">

      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <h3 className="text-lg font-bold text-gray-900">
          📊 Booking Insights
        </h3>

        {/* DATE FILTER */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
          {["week", "month", "year"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                range === r
                  ? "bg-green-600 text-white"
                  : "text-gray-600 hover:bg-white"
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* 📈 GROWTH */}
      <div className="mb-4 text-sm font-medium">
        <span className="text-green-600">
          ↑ {growth}% growth
        </span>{" "}
        compared to last {range}
      </div>

      {/* GRAPH */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          {/* BOOKINGS */}
          <Line
            type="monotone"
            dataKey="bookings"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 4 }}
            isAnimationActive
          />

          {/* REPORTS */}
          <Line
            type="monotone"
            dataKey="reports"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4 }}
            isAnimationActive
          />

          {/* USERS */}
          <Line
            type="monotone"
            dataKey="users"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={{ r: 4 }}
            isAnimationActive
          />
        </LineChart>
      </ResponsiveContainer>

      {/* 🧠 INSIGHT */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 p-4 bg-green-50 border border-green-100 rounded-xl text-sm text-green-800"
      >
        🧠 Insight: Your bookings increased by{" "}
        <strong>{growth}%</strong> this {range}. Keep running promotions 🚀
      </motion.div>

    </div>

      {/* DYNAMIC CONTENT */}
<div className="max-w-6xl mx-auto px-4 mt-16">

  <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-6 md:p-10">

    {/* HEADER */}
    <div className="mb-6">

      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
        About {test.name}
      </h2>

      <p className="text-sm text-gray-500 mt-2">
        Detailed insights, benefits & complete information
      </p>

      {/* underline accent */}
      <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mt-3 rounded-full"></div>

    </div>

    {/* CONTENT */}
    <div
      className="prose prose-lg max-w-none
                 prose-headings:text-gray-900
                 prose-p:text-gray-700
                 prose-li:text-gray-700
                 prose-strong:text-gray-900
                 prose-h2:mt-6 prose-h2:mb-2
                 prose-h3:mt-4
                 prose-a:text-green-600
                 prose-a:no-underline hover:prose-a:underline"
      dangerouslySetInnerHTML={{ __html: content }}
    />

  </div>

</div>

     {/* ⭐ TESTIMONIALS */}
<div className="max-w-6xl mx-auto px-4 mt-20">

  {/* HEADER */}
  <div className="text-center mb-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
      ⭐ What Our Users Say
    </h2>
    <p className="text-gray-500 mt-2">
      Trusted by thousands of happy customers
    </p>

    <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mt-3 rounded-full"></div>
  </div>
     {/* TESTIMONIAL CARDS */ }
  {/* CARDS */}
  <div className="grid md:grid-cols-3 gap-6">

    {[
      {
        name: "Rahul Sharma",
        text: "Very fast service, got reports in just few hours!",
      },
      {
        name: "Priya Verma",
        text: "Smooth booking experience and trusted labs.",
      },
      {
        name: "Amit Kumar",
        text: "Best platform for health tests. Highly recommended!",
      },
    ].map((r, i) => (

      <motion.div
        key={i}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.2 }}
        whileHover={{ scale: 1.05 }}
        className="relative bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300"
      >

        {/* QUOTE ICON */}
        <div className="text-4xl text-green-100 absolute top-4 right-5">
          ❝
        </div>

        {/* STARS */}
        <div className="text-yellow-500 text-sm mb-2">
          ⭐⭐⭐⭐⭐
        </div>

        {/* TEXT */}
        <p className="text-gray-700 leading-relaxed">
          {r.text}
        </p>

        {/* USER */}
        <div className="flex items-center gap-3 mt-4">

          {/* AVATAR */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold">
            {r.name.charAt(0)}
          </div>

          <div>
            <p className="font-semibold text-gray-900">
              {r.name}
            </p>
            <p className="text-xs text-gray-400">
              Verified User
            </p>
          </div>

        </div>

      </motion.div>

    ))}

  </div>

</div>

{/* FAQ */ }
{/* ❓ FAQ SECTION */}
<div className="max-w-6xl mx-auto px-4 mt-20">

  {/* HEADER */}
  <div className="text-center mb-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
      ❓ Frequently Asked Questions
    </h2>
    <p className="text-gray-500 mt-2">
      Everything you need to know before booking
    </p>

    <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mt-3 rounded-full"></div>
  </div>

  {/* FAQ LIST */}
  <div className="space-y-4">

    {[
      {
        q: "How long does the report take?",
        a: "Reports are delivered within 6–12 hours depending on the test.",
      },
      {
        q: "Is home sample collection available?",
        a: "Yes, we provide free home sample collection in your city.",
      },
      {
        q: "Are labs certified?",
        a: "All partner labs are NABL certified and highly trusted.",
      },
    ].map((f, i) => {

      const [open, setOpen] = useState(false);

      return (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
        >

          {/* QUESTION */}
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex justify-between items-center px-5 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition"
          >
            {f.q}

            <span className={`transition ${open ? "rotate-180" : ""}`}>
              ⌄
            </span>
          </button>

          {/* ANSWER */}
          <motion.div
            initial={false}
            animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
            className="px-5 overflow-hidden"
          >
            <p className="text-gray-600 pb-4">
              {f.a}
            </p>
          </motion.div>

        </motion.div>
      );
    })}

  </div>

</div>
  {/* BOOKING CTA */ }
   <div className="max-w-6xl mx-auto px-4 mt-20 mb-24">

  <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-3xl p-8 text-center shadow-xl">

    <h2 className="text-2xl md:text-3xl font-bold">
      Ready to Book Your Test?
    </h2>

    <p className="mt-2 text-white/90">
      Fast reports • Trusted labs • Best price guaranteed
    </p>

    <button
      onClick={handlebook}
      className="mt-6 bg-white text-green-600 px-6 py-3 rounded-xl font-semibold shadow hover:scale-105 transition"
    >
      🚀 Book Now
    </button>

  </div>

</div>

      <Footer />
    </div>
    
  
  
  );
}