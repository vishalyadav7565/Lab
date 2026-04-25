"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "👋 Hi! Need help choosing a test?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;

    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Something went wrong" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="relative">

      {/* CHAT BOX */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40 }}
            className="w-80 md:w-96 bg-white rounded-2xl shadow-2xl border flex flex-col overflow-hidden"
          >

            {/* HEADER */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 flex justify-between items-center">
              <span className="font-semibold">🤖 Health Assistant</span>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            {/* CHAT */}
            <div className="h-72 overflow-y-auto p-3 space-y-3 bg-gray-50">

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-xl text-sm max-w-[75%] ${
                      m.role === "user"
                        ? "bg-green-600 text-white"
                        : "bg-white border shadow text-gray-700"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="text-xs text-gray-400 animate-pulse">
                  Typing...
                </div>
              )}

              <div ref={endRef} />
            </div>

            {/* QUICK SUGGESTIONS */}
<div className="px-4 py-3 bg-white border-t sticky bottom-0 z-10">

  <div className="flex gap-2 overflow-x-auto scrollbar-hide">

    {[
      "Best test?",
      "Price?",
      "Report time?",
      "Any discount?",
    ].map((q) => (

      <button
        key={q}
        onClick={() => setInput(q)}
        className="whitespace-nowrap text-xs font-medium 
        bg-gradient-to-r from-green-50 to-emerald-50 
        text-green-700 border border-green-200 
        px-4 py-2 rounded-full 
        hover:scale-105 hover:shadow-md 
        transition-all duration-200"
      >
        {q}
      </button>

    ))}

  </div>

</div>
            {/* INPUT */}
        <div className="px-4 py-3 bg-white border-t flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your health question..."
            className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={handleSend}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium shadow-md transition"
          >
            Send
          </button>
        </div>


          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOAT BUTTON */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="relative bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-full shadow-xl"
      >
        🤖

        {/* pulse */}
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-30 animate-ping"></span>
      </motion.button>

    </div>
  );
}