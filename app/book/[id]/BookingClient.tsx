"use client";

import { useState } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { Calendar, Clock, MapPin } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "300px",
};

export default function BookingClient({ testId }: any) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
  });

  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: today,
    time: "",
    address: "",
  });

  const [position, setPosition] = useState({
    lat: 28.6139,
    lng: 77.209,
  });

  const [loading, setLoading] = useState(false);

  /* 📍 MAP */
  const handleDragEnd = async (e: any) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setPosition({ lat, lng });

    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`
      );
      const data = await res.json();
      const address = data.results?.[0]?.formatted_address;

      setForm((prev) => ({ ...prev, address }));
    } catch (err) {
      console.log(err);
    }
  };

  /* SLOT */
  const slotAvailability: any = {
    [today]: [
      "6:00 AM - 8:00 AM",
      "8:00 AM - 10:00 AM",
      "10:00 AM - 12:00 PM",
      "12:00 PM - 2:00 PM",
    ],
  };

  const availableSlots = slotAvailability[form.date] || [];

  /* PAYMENT */
  const handlePayment = async () => {
    if (!form.name || !form.phone || !form.time) {
      alert("Please fill required fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/payment", { method: "POST" });
      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "Lab Test Booking",
        description: testId,
        order_id: order.id,
        handler: function () {
          alert("✅ Booking Confirmed!");
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#4f46e5" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Payment failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-200 py-12 px-4">

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="md:col-span-2 bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40">

          <h1 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
            Book Your Test
          </h1>

          {/* FORM */}
          <div className="grid md:grid-cols-2 gap-4">

            <input
              placeholder="Full Name *"
              className="input"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="Phone Number *"
              className="input"
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <input
              placeholder="Email"
              className="input"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            {/* DATE */}
            <div className="relative">
              <Calendar className="icon" />
              <input
                type="date"
                value={form.date}
                min={today}
                className="input pl-10"
                onChange={(e) =>
                  setForm({
                    ...form,
                    date: e.target.value,
                    time: "",
                  })
                }
              />
            </div>

          </div>

          {/* SLOT */}
          <div className="mt-6">
            <h2 className="font-semibold mb-3 flex items-center gap-2 text-gray-800">
              <Clock size={18} /> Select Time Slot *
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableSlots.map((slot: string) => (
                <button
                  key={slot}
                  onClick={() =>
                    setForm({ ...form, time: slot })
                  }
                  className={`p-3 rounded-xl border font-medium transition-all duration-200 ${
                    form.time === slot
                      ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg scale-105"
                      : "bg-white text-gray-800 hover:bg-indigo-50 hover:border-indigo-400"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* ADDRESS */}
          <div className="mt-6">
            <h2 className="font-semibold mb-3 flex items-center gap-2 text-gray-800">
              <MapPin size={18} /> Address
            </h2>

            <textarea
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
              className="input h-24 resize-none"
              placeholder="📍 Drag map pin or type your address"
            />
          </div>

          {/* MAP */}
          <div className="mt-6 rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
            {!isLoaded ? (
              <p className="p-4 text-gray-500">Loading map...</p>
            ) : (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={position}
                zoom={14}
              >
                <Marker
                  position={position}
                  draggable
                  onDragEnd={handleDragEnd}
                />
              </GoogleMap>
            )}
          </div>

        </div>

        {/* RIGHT */}
        <div className="sticky top-10 h-fit">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6">

            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Booking Summary
            </h2>

            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Test</span>
                <span>{testId}</span>
              </div>

              <div className="flex justify-between">
                <span>Date</span>
                <span>{form.date}</span>
              </div>

              <div className="flex justify-between">
                <span>Slot</span>
                <span>{form.time || "-"}</span>
              </div>
            </div>

            <div className="border-t my-4"></div>

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-indigo-600">₹1599</span>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className={`mt-5 w-full py-3 rounded-xl text-white font-semibold text-lg transition ${
                loading
                  ? "bg-gray-400"
                  : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:shadow-2xl hover:scale-[1.03]"
              }`}
            >
              {loading ? "Processing..." : "Pay & Book"}
            </button>

          </div>
        </div>

      </div>

      {/* STYLE */}
      <style jsx>{`
        .input {
          @apply border border-gray-300 bg-white text-gray-900 
          p-3 rounded-xl w-full outline-none 
          focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          transition shadow-sm;
        }

        .icon {
          position: absolute;
          top: 50%;
          left: 10px;
          transform: translateY(-50%);
          color: #6b7280;
        }
      `}</style>
    </div>
  );
}