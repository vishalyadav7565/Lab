"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { tests } from "@/app/data/tests";

type Message = {
  role: "user" | "bot";
  text: string;
};

export default function AssistantClient() {
  const searchParams = useSearchParams();
  const testId = searchParams.get("testId");

  const selectedTest = tests?.find((t) => t.id === testId) || null;

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: selectedTest
        ? `👋 Ask me anything about ${selectedTest.name}`
        : "👋 Hi! I can help you choose the best test.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
        body: JSON.stringify({
          message: userMsg,
          test: selectedTest,
        }),
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
    <div className="min-h-screen bg-white flex flex-col">

      {/* HEADER */}
      <div className="bg-white border-b px-6 py-4 shadow-sm">
        <h1 className="text-lg font-semibold">🤖 Health Assistant</h1>
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full flex flex-col">

        {/* TEST */}
        {selectedTest && (
          <div className="mx-4 mt-4 bg-green-50 border rounded-xl p-4">
            <p className="font-semibold">{selectedTest.name}</p>
            <p className="text-sm text-gray-600">
              ₹{selectedTest.price} • {selectedTest.reportTime}
            </p>
          </div>
        )}

        {/* CHAT */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gray-50">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-xl max-w-[75%] ${
                  m.role === "user"
                    ? "bg-green-600 text-white"
                    : "bg-white border"
                }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}

          {loading && <div className="text-gray-400">Typing...</div>}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="p-4 flex gap-2 border-t">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded-xl px-4 py-2"
          />
          <button
            onClick={handleSend}
            className="bg-green-600 text-white px-6 rounded-xl"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}