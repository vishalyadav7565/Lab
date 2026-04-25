"use client";

import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

type Props = {
  email?: string;
  test?: any;
};

export default function MailButton({
  email = "yourmail@gmail.com", // 🔥 replace
  test,
}: Props) {

  // 🧠 DYNAMIC SUBJECT + BODY
  const subject = encodeURIComponent(
    test ? `Booking Request - ${test.name}` : "Health Test Booking"
  );

  const body = encodeURIComponent(`
Hi,

I want to book a health test.

${test ? `Test: ${test.name}` : ""}
${test ? `Price: ₹${test.price}` : ""}
${test ? `Report Time: ${test.reportTime}` : ""}

Please assist me.

Thanks
  `);

  const mailUrl = `mailto:${email}?subject=${subject}&body=${body}`;

  return (
    <motion.a
      href={mailUrl}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="flex items-center gap-2 
      bg-gradient-to-r from-gray-800 to-gray-700 
      text-white px-4 py-3 rounded-full shadow-xl relative overflow-hidden"
    >

      {/* ✉️ ICON */}
      <motion.span
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-lg"
      >
        <FaEnvelope />
      </motion.span>

      {/* TEXT */}
      <span className="text-sm font-semibold hidden md:block">
        Email Us
      </span>

      {/* GLOW */}
      <span className="absolute inset-0 rounded-full bg-gray-400 opacity-20 blur-xl"></span>

    </motion.a>
  );
}