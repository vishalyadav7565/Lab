import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* About Lab */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">
            About Our Lab
          </h3>

          <p className="text-sm">
            We provide reliable blood testing services with accurate reports.
            Visit our lab or book convenient home sample collection.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Blood Tests</li>
            <li className="hover:text-white cursor-pointer">Health Packages</li>
            <li className="hover:text-white cursor-pointer">Home Collection</li>
          </ul>
        </div>

        {/* Blood Tests */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">
            Popular Tests
          </h3>

          <ul className="space-y-2 text-sm">
            <li>CBC Blood Test</li>
            <li>LFT Test</li>
            <li>KFT Test</li>
            <li>Thyroid Test</li>
            <li>Blood Sugar Test</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">
            Contact Us
          </h3>

          <div className="space-y-3 text-sm">

            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>+91 7572055787</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>info@cbcbloodtest.in</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Your City, India</span>
            </div>

          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <Facebook className="cursor-pointer hover:text-white" />
            <Instagram className="cursor-pointer hover:text-white" />
            <Twitter className="cursor-pointer hover:text-white" />
          </div>

        </div>

      </div>

      {/* Bottom Footer */}
      <div className="text-center text-sm text-gray-400 mt-10 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} Diagnostic Lab. All Rights Reserved.
      </div>
    </footer>
  );
}