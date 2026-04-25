"use client";

import { motion } from "framer-motion";
import { FaFacebook } from "react-icons/fa";

type Props = {
  pageUrl?: string;
};

export default function FacebookButton({
  pageUrl = "https://www.facebook.com/cbcbloodtest", // 🔥 replace
}: Props) {
  return (
    <div >

      <motion.a
        href={pageUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex items-center gap-2 
        bg-gradient-to-r from-blue-600 to-blue-500 
        text-white px-4 py-3 rounded-full shadow-2xl overflow-hidden"
      >

        {/* 🔥 FACEBOOK ICON */}
        <motion.span
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="text-xl"
        >
          <FaFacebook />
        </motion.span>

        {/* TEXT */}
        <span className="text-sm font-semibold hidden md:block">
          Follow Us
        </span>

        {/* GLOW */}
        <span className="absolute inset-0 rounded-full bg-blue-400 opacity-20 blur-xl"></span>

        {/* PULSE */}
        <span className="absolute inset-0 rounded-full border-2 border-blue-300 animate-ping"></span>

      </motion.a>

    </div>
  );
}