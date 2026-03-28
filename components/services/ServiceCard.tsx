"use client";

import { useState } from "react";
import { Droplet, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

export default function BloodTests() {
  const [cart, setCart] = useState<typeof tests>([]);

  const tests = [
    {
      name: "CBC Test",
      desc: "Complete Blood Count to check overall health.",
      price: 399,
      original: 699,
    },
    {
      name: "LFT Test",
      desc: "Liver Function Test to check liver health.",
      price: 499,
      original: 899,
    },
    {
      name: "KFT Test",
      desc: "Kidney Function Test to monitor kidney health.",
      price: 499,
      original: 799,
    },
    {
      name: "Blood Sugar",
      desc: "Check glucose levels in your blood.",
      price: 199,
      original: 299,
    },
    {
      name: "Thyroid Test",
      desc: "Detect thyroid hormone imbalance.",
      price: 349,
      original: 599,
    },
    {
      name: "Lipid Profile",
      desc: "Check cholesterol and heart health.",
      price: 599,
      original: 999,
    },
  ];

  const addToCart = (test: typeof tests[0]) => {
    setCart([...cart, test]);
  };

  return (
    <section className="py-16 bg-linear-to-br from-blue-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
            Popular Blood Tests
          </h2>

          {/* CART */}
          <div className="flex items-center gap-2 text-blue-600">
            <ShoppingCart />
            <span className="font-semibold">{cart.length}</span>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8">

          {tests.map((test, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition"
            >

              {/* ICON + TITLE */}
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Droplet className="text-blue-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-blue-900">
                  {test.name}
                </h3>
              </div>

              {/* DESC */}
              <p className="text-gray-600 text-sm mb-4">
                {test.desc}
              </p>

              {/* PRICE */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-blue-900">
                  ₹{test.price}
                </span>
                <span className="line-through text-gray-400 text-sm">
                  ₹{test.original}
                </span>
                <span className="text-green-600 text-sm font-medium">
                  {Math.round(
                    ((test.original - test.price) / test.original) * 100
                  )}
                  % OFF
                </span>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3">
                <button
                  onClick={() => addToCart(test)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Add to Cart
                </button>

                <button className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition">
                  Details
                </button>
              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}