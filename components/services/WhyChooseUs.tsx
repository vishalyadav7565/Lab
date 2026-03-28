"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Home, Clock, FileText, Star } from "lucide-react";
import { motion } from "framer-motion";

/* 🔢 COUNTER COMPONENT */
function Counter({ target }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    const duration = 1500;
    const increment = end / (duration / 20);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}+</span>;
}

export default function WhyChooseUs() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Accurate Results",
      desc: "Modern lab tech ensures precise diagnostics.",
    },
    {
      icon: Home,
      title: "Home Collection",
      desc: "Sample collection at your doorstep.",
    },
    {
      icon: Clock,
      title: "Fast Reports",
      desc: "Quick & secure digital reports.",
    },
    {
      icon: FileText,
      title: "Certified Experts",
      desc: "Handled by trained professionals.",
    },
  ];

  const testimonials = [
    {
      name: "Dr. Sharma",
      text: "Highly reliable lab with quick reports. My patients trust them.",
    },
    {
      name: "Priya Verma",
      text: "Home collection was super easy and safe. Highly recommend!",
    },
    {
      name: "Rahul Singh",
      text: "Accurate reports and great service. Very professional.",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(slider);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
            Why Choose Our Lab
          </h2>
          <p className="text-gray-600 mt-3">
            Trusted diagnostics with accurate results and expert care.
          </p>
        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-4 gap-6 mt-12">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-md text-center"
              >
                <Icon className="mx-auto text-blue-600" size={32} />
                <h3 className="mt-3 font-semibold text-blue-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* 📊 STATS */}
        <div className="grid grid-cols-3 text-center mt-12 gap-6">
          <div>
            <h3 className="text-2xl font-bold text-blue-900">
              <Counter target="10000" />
            </h3>
            <p className="text-gray-600 text-sm">Happy Patients</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-blue-900">
              <Counter target="50000" />
            </h3>
            <p className="text-gray-600 text-sm">Reports Delivered</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-blue-900">
              <Counter target="100" />
            </h3>
            <p className="text-gray-600 text-sm">Tests Available</p>
          </div>
        </div>

        {/* 🏅 CERTIFICATIONS */}
        <div className="flex justify-center gap-6 mt-12 flex-wrap">
          <div className="bg-white px-6 py-3 rounded-xl shadow text-sm font-semibold text-blue-900">
            NABL Certified
          </div>
          <div className="bg-white px-6 py-3 rounded-xl shadow text-sm font-semibold text-blue-900">
            ISO Approved
          </div>
        </div>

        {/* ⭐ REVIEWS */}
        <div className="flex justify-center mt-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <p className="text-center text-gray-600 text-sm mt-2">
          Rated 4.9/5 by thousands of users
        </p>

        {/* 💬 TESTIMONIAL SLIDER */}
        <div className="mt-12 max-w-xl mx-auto text-center bg-white p-6 rounded-2xl shadow-md">
          <p className="text-gray-700 italic">
            "{testimonials[index].text}"
          </p>
          <h4 className="mt-4 font-semibold text-blue-900">
            {testimonials[index].name}
          </h4>
        </div>

      </div>
    </section>
  );
}