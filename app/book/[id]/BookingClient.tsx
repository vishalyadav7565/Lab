"use client";

import { useState, useRef } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";
import { Calendar, Clock, MapPin, Locate } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "320px",
};

export default function BookingClient({ testId }: any) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
    libraries: ["places"],
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
  const autocompleteRef = useRef<any>(null);

  /* 📍 Detect Current Location */
  const detectLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setPosition({ lat, lng });

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (res, status) => {
        if (status === "OK") {
          setForm((prev) => ({
            ...prev,
            address: res[0]?.formatted_address,
          }));
        }
      });
    });
  };

  /* 📍 Autocomplete */
  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (!place.geometry) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    setPosition({ lat, lng });

    setForm((prev) => ({
      ...prev,
      address: place.formatted_address,
    }));
  };

  /* 📍 Drag Marker */
  const handleDragEnd = (e: any) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setPosition({ lat, lng });
  };

  const slotAvailability: any = {
    [today]: [
      "6 AM - 8 AM",
      "8 AM - 10 AM",
      "10 AM - 12 PM",
      "12 PM - 2 PM",
    ],
  };

  const availableSlots = slotAvailability[form.date] || [];

  /* 💳 PAYMENT */
  const handlePayment = async () => {
    if (!form.name || !form.phone || !form.time) {
      alert("Fill required fields");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/payment", { method: "POST" });
    const order = await res.json();

    const rzp = new (window as any).Razorpay({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: order.amount,
      currency: "INR",
      name: "Lab Booking",
      order_id: order.id,
      handler: () => alert("✅ Booking Confirmed"),
    });

    rzp.open();
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-4">

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

        {/* LEFT FORM */}
        <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-xl border">

          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Book Your Test
          </h1>

          {/* INPUTS */}
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
            <h2 className="section-title">
              <Clock size={18} /> Select Time Slot
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableSlots.map((slot: string) => (
                <button
                  key={slot}
                  onClick={() =>
                    setForm({ ...form, time: slot })
                  }
                  className={`slot ${
                    form.time === slot ? "active-slot" : ""
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* ADDRESS */}
          <div className="mt-6">
            <h2 className="section-title">
              <MapPin size={18} /> Address
            </h2>

            {isLoaded && (
              <div className="flex gap-2">
                <Autocomplete
                  onLoad={(ref) =>
                    (autocompleteRef.current = ref)
                  }
                  onPlaceChanged={onPlaceChanged}
                >
                  <input
                    className="input flex-1"
                    placeholder="Search address..."
                    value={form.address}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        address: e.target.value,
                      })
                    }
                  />
                </Autocomplete>

                <button
                  onClick={detectLocation}
                  className="loc-btn"
                >
                  <Locate size={18} />
                </button>
              </div>
            )}
          </div>

          {/* MAP */}
          <div className="mt-6 rounded-2xl overflow-hidden shadow-md border">
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

        {/* RIGHT SUMMARY */}
        <div className="sticky top-10">
          <div className="bg-white rounded-3xl p-6 shadow-xl border">

            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Summary
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
              <span className="text-blue-600">₹1599</span>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="pay-btn mt-5"
            >
              {loading ? "Processing..." : "Pay & Book"}
            </button>

          </div>
        </div>

      </div>

      {/* STYLE */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #d1d5db;
          background: white;
          color: #111827;
          outline: none;
          transition: 0.3s;
        }

        .input::placeholder {
          color: #6b7280;
        }

        .input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
        }

        .icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
        }

        .section-title {
          display: flex;
          gap: 8px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 10px;
        }

        .slot {
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #d1d5db;
          background: white;
          color: #111827;
          transition: 0.3s;
        }

        .slot:hover {
          transform: scale(1.05);
          border-color: #2563eb;
        }

        .active-slot {
          background: linear-gradient(to right, #2563eb, #4f46e5);
          color: white;
          transform: scale(1.05);
        }

        .loc-btn {
          padding: 0 14px;
          border-radius: 12px;
          background: #2563eb;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pay-btn {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          background: linear-gradient(to right, #2563eb, #4f46e5);
          color: white;
          font-weight: 600;
          transition: 0.3s;
        }

        .pay-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
}