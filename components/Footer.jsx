"use client";
import { Phone, MapPin, Facebook } from "lucide-react";

const Footer = () => {
  const openFacebook = () => {
    window.open("https://facebook.com/labdelines", "_blank");
  };

  const openTikTok = () => {
    window.open("https://tiktok.com/@labdelines", "_blank");
  };

  const openLinkedIn = () => {
    window.open("https://linkedin.com/company/labdelines", "_blank");
  };

  return (
    <footer className="bg-white border-t border-gray-200 py-6 px-4 md:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Contact Information Row - Horizontal Compact Layout */}
        <div className="flex justify-center items-center gap-8 mb-6 text-xs">
          {/* Phone */}
          <div className="text-center">
            <h4 className="font-semibold text-gray-900 mb-1 text-xl">Phone</h4>
            <a
              href="tel:+85620522424244"
              className="text-gray-600 hover:text-red-800 transition-colors"
            >
              +856 20 52 242 244
            </a>
          </div>

          {/* Location */}
          <div className="text-center">
            <h4 className="font-semibold text-gray-900 mb-1 text-xl">
              Location
            </h4>
            <p className="text-gray-600">Don Nokkhoum Village</p>
          </div>
        </div>

        {/* Facebook and Cafe Section - Horizontal with Divider */}
        <div className="flex justify-center items-center gap-4 mb-6">
          {/* Facebook */}
          <div className="text-center text-xs">
            <h4 className="font-medium text-gray-900  mb-1">Facebook</h4>
            <p className="text-gray-600 ">LAB DE LINES</p>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-red-800"></div>

          {/* Cafe */}
          <div className="text-center text-xs">
            <h4 className="font-medium text-gray-900 mb-1">Cafe</h4>
            <p className="text-gray-600 ">La petite Cafe</p>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-3 mb-4">
          <button
            onClick={openFacebook}
            className="w-12 h-12 bg-red-800 hover:bg-red-900 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <Facebook className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={openTikTok}
            className="w-12 h-12 bg-red-800 hover:bg-red-900 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          </button>

          <button
            onClick={openLinkedIn}
            className="w-12 h-12 bg-red-800 hover:bg-red-900 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </button>
        </div>

        {/* Standard Website */}
        <div className="text-center mb-4">
          <p className="text-gray-600 font-medium text-sm">Standard Website</p>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-500 text-xs">
            © 2025 Lab de LINES. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
