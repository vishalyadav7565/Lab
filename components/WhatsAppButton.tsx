"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

type Props = {
  test?: any;
  autoOpen?: boolean;
};

export default function WhatsAppButton({ test, autoOpen }: Props) {
  const phone = "917572055787"; // 🔥 your number

  // 🧠 DYNAMIC MESSAGE (FULL FUNNEL)
  const message = encodeURIComponent(`
Hi, I want to book a test.

${test ? `🧪 Test: ${test.name}` : ""}
${test ? `💰 Price: ₹${test.price}` : ""}
${test ? `⏱ Report: ${test.reportTime}` : ""}

Please assist me.
  `);

  const url = `https://wa.me/${phone}?text=${message}`;

  // 🚀 AUTO REDIRECT (if enabled)
  if (autoOpen) {
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  }

  return (
    <div>

      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-2xl overflow-hidden"
      >

        {/* 🔥 REAL ICON */}
        <motion.span
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="text-xl"
        >
          <FaWhatsapp />
        </motion.span>

        {/* TEXT */}
        <span className="text-sm font-semibold hidden md:block">
          Chat on Us
        </span>

        {/* GLOW */}
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-20 blur-xl"></span>

        {/* PULSE RING */}
        <span className="absolute inset-0 rounded-full border-2 border-green-300 animate-ping"></span>

      </motion.a>

    </div>
  );
}