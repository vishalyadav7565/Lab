"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Phone,
  MapPin,
  Search,
  Menu,
  X,
  User,
} from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, setLocation] = useState("Detecting...");
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);

  const tests = [
    "CBC Test",
    "Thyroid Profile",
    "Blood Sugar",
    "Liver Function Test",
  ];

  /* ===== LOCATION DETECT ===== */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          setLocation(data.address.city || "Your Area");
        } catch {
          setLocation("Delhi");
        }
      },
      () => setLocation("Delhi")
    );
  }, []);

  /* ===== SEARCH ===== */
  const handleSearch = (value: string) => {
    setQuery(value);

    if (!value) return setFiltered([]);

    const results = tests.filter((t) =>
      t.toLowerCase().includes(value.toLowerCase())
    );

    setFiltered(results);
  };

  return (
    <>
      {/* ================= TOP HEADER ================= */}
      <div className="w-full bg-white border-b border-blue-200">

  <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex flex-col md:flex-row items-center gap-3">

    {/* LEFT: CONTACT + LOCATION */}
    <div className="flex items-center justify-between w-full md:w-auto text-blue-900 text-sm font-semibold">

      <div className="flex items-center gap-3">
        <Phone size={14} className="text-blue-600" />
        <span>+91 7572055787</span>
      </div>

      <div className="flex items-center gap-1 ml-4">
        <MapPin size={14} className="text-teal-600" />
        <span>{location}</span>
      </div>

    </div>

    {/* CENTER: SEARCH */}
    <div className="w-full md:flex-1">

      <div className="flex items-center border-2 border-blue-300 rounded-xl px-4 py-2 focus-within:border-teal-500">

        <Search size={18} className="text-blue-600" />

        <input
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search tests..."
          className="w-full px-3 outline-none text-blue-900 text-sm"
        />
      </div>

      {/* DROPDOWN */}
      {filtered.length > 0 && (
        <div className="absolute bg-white border border-blue-200 rounded-lg mt-1 shadow-md z-50 w-[90%] md:w-full">
          {filtered.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                setQuery(item);
                setFiltered([]);
              }}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>

    {/* RIGHT: CTA */}
    <div className="w-full md:w-auto flex justify-end">
      <button className="w-full md:w-auto bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition">
        Book Test
      </button>
    </div>

  </div>
</div>

      {/* ================= NAVBAR ================= */}
      <nav className="bg-white sticky top-0 z-50 px-6 py-3 shadow-sm border-b border-blue-100">

        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="text-2xl font-bold text-blue-700">
            CBCblood TEST <span className="text-teal-600">Lab</span>
          </Link>

          {/* MOBILE BTN */}
          <button
            className="md:hidden text-blue-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          {/* MENU */}
          <div className="hidden md:flex items-center space-x-8 text-blue-900 font-semibold">

            <Link href="/about" className="hover:text-teal-600">
              About
            </Link>

            <Link href="/blood-tests" className="hover:text-teal-600">
              Blood Tests
            </Link>

            <Link href="/packages" className="hover:text-teal-600">
              Packages
            </Link>

            <Link href="/home-collection" className="hover:text-teal-600">
              Home Collection
            </Link>

            <Link href="/contact" className="hover:text-teal-600">
              Contact
            </Link>

            <Link href="/login">
              <User className="w-6 h-6 hover:text-teal-600 cursor-pointer" />
            </Link>

          </div>

        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="md:hidden flex flex-col gap-4 mt-4 text-blue-900 font-medium">

            <Link href="/about">About</Link>
            <Link href="/blood-tests">Blood Tests</Link>
            <Link href="/packages">Packages</Link>
            <Link href="/home-collection">Home Collection</Link>
            <Link href="/contact">Contact</Link>

            <Link href="/login">Login</Link>

          </div>
        )}
      </nav>
    </>
  );
}
