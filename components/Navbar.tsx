"use client";
import Logo from "../public/logo/CBC blood tests.png";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
        <span>+91 9876543210</span>
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
       <nav className="bg-white sticky top-0 z-50 h-16 px-6 flex items-center shadow-sm border-b border-blue-100">
        
        <div className="flex items-center justify-between w-full">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={Logo}
              alt="Logo"
              className="h-20 w-auto object-contain"
              priority
            />
          </Link>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-blue-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8 text-blue-900 font-semibold">
            
            <Link href="/about" className="hover:text-teal-600 transition">
              About
            </Link>

            <Link href="/blood-tests" className="hover:text-teal-600 transition">
              Blood Tests
            </Link>

            <Link href="/packages" className="hover:text-teal-600 transition">
              Packages
            </Link>

            <Link href="/home-collection" className="hover:text-teal-600 transition">
              Home Collection
            </Link>

            <Link href="/contact" className="hover:text-teal-600 transition">
              Contact
            </Link>

            <Link href="/login">
              <User className="w-6 h-6 hover:text-teal-600 cursor-pointer transition" />
            </Link>

          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md border-t border-blue-100 md:hidden flex flex-col gap-4 px-6 py-4 text-blue-900 font-medium">
            
            <Link href="/about" onClick={() => setMobileOpen(false)}>
              About
            </Link>

            <Link href="/blood-tests" onClick={() => setMobileOpen(false)}>
              Blood Tests
            </Link>

            <Link href="/packages" onClick={() => setMobileOpen(false)}>
              Packages
            </Link>

            <Link href="/home-collection" onClick={() => setMobileOpen(false)}>
              Home Collection
            </Link>

            <Link href="/contact" onClick={() => setMobileOpen(false)}>
              Contact
            </Link>

            <Link href="/login" onClick={() => setMobileOpen(false)}>
              Login
            </Link>

          </div>
        )}
      </nav>
    </>
  );
}