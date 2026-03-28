import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Users, Activity } from "lucide-react";

export default function About() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900">
            About Our Diagnostic Lab
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We provide accurate, reliable, and fast diagnostic services
            to help you take control of your health.
          </p>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT */}
        <div>
          <h2 className="text-2xl font-semibold text-blue-900">
            Who We Are
          </h2>
          <p className="mt-4 text-gray-600">
            Our lab is equipped with modern diagnostic technology and
            certified professionals to deliver accurate test results.
            We focus on convenience, reliability, and patient care.
          </p>

          <h2 className="text-2xl font-semibold text-blue-900 mt-8">
            Our Mission
          </h2>
          <p className="mt-3 text-gray-600">
            To make healthcare accessible and affordable with high-quality
            diagnostic services and fast report delivery.
          </p>
        </div>

        {/* RIGHT (IMAGE PLACEHOLDER) */}
        <div className="bg-blue-100 rounded-xl h-72 flex items-center justify-center">
          <span className="text-blue-600 font-semibold">
            Lab Image / Doctor Illustration
          </span>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white py-12 border-t">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 text-center gap-6">
          
          <div>
            <h3 className="text-2xl font-bold text-blue-900">10K+</h3>
            <p className="text-gray-600 text-sm">Happy Patients</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-blue-900">50K+</h3>
            <p className="text-gray-600 text-sm">Reports Delivered</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-blue-900">100+</h3>
            <p className="text-gray-600 text-sm">Tests Available</p>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold text-blue-900">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-10">

            <div className="bg-white p-6 rounded-xl shadow">
              <ShieldCheck className="text-blue-600 mx-auto" size={32} />
              <h3 className="mt-3 font-semibold">Certified Lab</h3>
              <p className="text-gray-600 text-sm mt-2">
                NABL & ISO certified lab for trusted results.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <Users className="text-blue-600 mx-auto" size={32} />
              <h3 className="mt-3 font-semibold">Expert Team</h3>
              <p className="text-gray-600 text-sm mt-2">
                Experienced doctors and technicians.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <Activity className="text-blue-600 mx-auto" size={32} />
              <h3 className="mt-3 font-semibold">Fast Reports</h3>
              <p className="text-gray-600 text-sm mt-2">
                Quick and accurate digital reports.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-center text-white">
        <h2 className="text-3xl font-bold">
          Book Your Test Today
        </h2>
        <p className="mt-3">
          Get accurate reports from the comfort of your home.
        </p>

        <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-medium">
          Book Now
        </button>
      </section>

      <Footer />
    </>
  );
}