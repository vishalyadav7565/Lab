"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* 🎯 REWARDS WITH PROBABILITY */
const rewards = [
  { label: "₹100", weight: 35 },
  { label: "₹200", weight: 25 },
  { label: "₹300", weight: 15 },
  { label: "20% OFF", weight: 15 },
  { label: "Better Luck", weight: 9 },
  { label: "💰 JACKPOT ₹1000", weight: 1 },
];

export default function OfferPopup() {
  const [show, setShow] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);

  // 🎯 GAME STATES
  const [coins, setCoins] = useState(0);
  const [spinsLeft, setSpinsLeft] = useState(1);
  const [canSpin, setCanSpin] = useState(true);

  /* 🎯 WEIGHTED RANDOM */
  const getWeightedReward = () => {
    const total = rewards.reduce((sum, r) => sum + r.weight, 0);
    const rand = Math.random() * total;

    let cumulative = 0;
    for (let i = 0; i < rewards.length; i++) {
      cumulative += rewards[i].weight;
      if (rand <= cumulative) return i;
    }
    return 0;
  };

  /* 🚀 TRIGGER */
  const triggerPopup = useCallback(() => {
    if (localStorage.getItem("offerShown")) return;
    setShow(true);
    localStorage.setItem("offerShown", "true");
  }, []);

  useEffect(() => {
    const t = setTimeout(triggerPopup, 5000);
    return () => clearTimeout(t);
  }, [triggerPopup]);

  /* 🎯 DAILY LIMIT */
  useEffect(() => {
    const today = new Date().toDateString();
    const lastSpin = localStorage.getItem("lastSpinDate");

    if (lastSpin === today) {
      setSpinsLeft(0);
      setCanSpin(false);
    } else {
      setSpinsLeft(1);
      setCanSpin(true);
    }

    const savedCoins = localStorage.getItem("coins");
    if (savedCoins) setCoins(Number(savedCoins));
  }, []);

  /* ⏳ TIMER */
  useEffect(() => {
    if (!show) return;

    const timer = setInterval(() => {
      setTimeLeft((p) => (p > 0 ? p - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [show]);

  /* 🎰 SPIN */
  const spinWheel = () => {
    if (spinning || (!canSpin && coins < 10)) return;

    setSpinning(true);

    // 🎯 consume spin
    if (spinsLeft > 0) {
      const today = new Date().toDateString();
      localStorage.setItem("lastSpinDate", today);
      setSpinsLeft(0);
      setCanSpin(false);
    } else {
      const newCoins = coins - 10;
      setCoins(newCoins);
      localStorage.setItem("coins", newCoins.toString());
    }

    const index = getWeightedReward();
    const segmentAngle = 360 / rewards.length;

    const finalRotation =
      360 * 5 + (360 - index * segmentAngle - segmentAngle / 2);

    setRotation(finalRotation);

    setTimeout(() => {
      const win = rewards[index].label;
      setResult(win);
      setSpinning(false);

      // 🪙 earn coins
      if (!win.includes("Better")) {
        const newCoins = coins + 5;
        setCoins(newCoins);
        localStorage.setItem("coins", newCoins.toString());
      }
    }, 4000);
  };

  /* 🔁 SHARE */
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);

    alert("Link copied! You got +1 spin 🎉");

    setSpinsLeft(1);
    setCanSpin(true);
  };

  /* DEBUG RESET */
  useEffect(() => {
    localStorage.removeItem("offerShown");
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center"
      >

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="bg-[#020617] text-white rounded-3xl p-6 w-full max-w-md shadow-2xl"
        >

          <h2 className="text-xl font-bold text-center mb-2">
            🎰 Spin & Win
          </h2>

          <p className="text-center text-gray-400 text-sm mb-4">
            Try your luck
          </p>

          <p className="text-center text-red-400 text-xs mb-4">
            ⏳ {timeLeft}s left
          </p>

          {/* 🎰 WHEEL */}
          <div className="relative flex justify-center">

            <motion.div
              animate={{ rotate: rotation }}
              transition={{ duration: 4, ease: "easeOut" }}
              className="w-56 h-56"
            >

              <svg viewBox="0 0 200 200">
                {rewards.map((seg, i) => {
                  const angle = (360 / rewards.length) * i;
                  const nextAngle = angle + 360 / rewards.length;

                  const x1 = 100 + 100 * Math.cos((angle * Math.PI) / 180);
                  const y1 = 100 + 100 * Math.sin((angle * Math.PI) / 180);

                  const x2 = 100 + 100 * Math.cos((nextAngle * Math.PI) / 180);
                  const y2 = 100 + 100 * Math.sin((nextAngle * Math.PI) / 180);

                  return (
                    <g key={i}>
                      <path
                        d={`M100,100 L${x1},${y1} A100,100 0 0,1 ${x2},${y2} Z`}
                        fill={i % 2 === 0 ? "#4f46e5" : "#6366f1"}
                      />
                      <text
                        x="100"
                        y="100"
                        fill="white"
                        fontSize="10"
                        textAnchor="middle"
                        transform={`rotate(${angle + 30},100,100) translate(0,-70)`}
                      >
                        {seg.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

            </motion.div>

            <div className="absolute top-0 text-xl">▼</div>
          </div>

          {/* 🎯 BUTTON */}
          <button
            onClick={spinWheel}
            className="w-full mt-6 bg-white text-black py-3 rounded-xl font-semibold"
          >
            {spinning ? "Spinning..." : "Spin Now"}
          </button>

          {/* 🪙 COINS */}
          <div className="text-center text-yellow-400 mt-2 text-sm">
            🪙 Coins: {coins}
          </div>

          {/* INFO */}
          <div className="text-center text-xs text-gray-400 mt-1">
            {spinsLeft > 0
              ? "🎯 1 Free Spin Available"
              : coins >= 10
              ? "🪙 Use 10 coins to spin"
              : "❌ No spins left"}
          </div>

          {/* RESULT */}
          {result && !spinning && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="mt-4 bg-green-500 text-black text-center py-3 rounded-xl font-bold"
            >
              🎉 You Won: {result}
            </motion.div>
          )}

          {/* JACKPOT */}
          {result.includes("JACKPOT") && (
            <div className="text-yellow-400 text-center mt-2 animate-pulse">
              💰 JACKPOT WINNER 💰
            </div>
          )}

          {/* CTA */}
          {result && !result.includes("Better") && (
            <Link
              href="/tests/full-body-essential"
              className="block mt-4 text-center bg-indigo-600 py-3 rounded-xl"
            >
              Claim Reward →
            </Link>
          )}

          {/* 🔁 SHARE */}
          <button
            onClick={handleShare}
            className="w-full mt-3 border border-gray-500 py-2 rounded-xl text-sm"
          >
            🔁 Share & Get Free Spin
          </button>

          {/* CLOSE */}
          <button
            onClick={() => setShow(false)}
            className="mt-3 text-gray-400 text-sm w-full"
          >
            Maybe Later
          </button>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}