// HeroSection.jsx - Simplified with natural scroll transition
"use client";
import React from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

// Images
import LAB_building from "@/public/assets/LAB_building.png";

const HeroSection = () => {
  return (
    <div className="h-screen relative">
      {/* Hero Background - Fixed positioning for smooth transition */}
      <div className="fixed inset-0 bg-gradient-to-b from-red-900 to-red-800 text-white">
        {/* Hero Content */}
        <div className="px-4 pb-8 relative z-10 h-full flex flex-col justify-center pt-20">
          <div className="max-w-sm mx-auto text-center">
            <h1 className="text-4xl font-bold mb-2 tracking-wide">
              LAB DE LINES
            </h1>
            <p className="text-lg mb-8 opacity-90">Co-working Space and Cafe</p>

            {/* Top decorative text */}
            <div className="relative mb-6">
              <div className="absolute top-0 right-0 w-8 h-px bg-white/40"></div>
              <div className="absolute top-0 right-0 w-px h-8 bg-white/40"></div>
              <p className="text-sm opacity-75 mb-1">Community-driven,</p>
              <p className="text-sm opacity-75">success-focused</p>
            </div>

            {/* Building Image Container */}
            <div className="relative mb-6">
              <Image
                src={LAB_building}
                width={1000}
                height={1000}
                alt="LABDELINES Building"
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            {/* Bottom decorative text */}
            <div className="relative mb-8">
              <h2 className="text-xl font-bold mb-1">Inspiring workspace</h2>
              <p className="text-sm opacity-75">for your business venture</p>
              <div className="absolute bottom-0 left-0 w-8 h-px bg-white/40"></div>
              <div className="absolute bottom-0 left-0 w-px h-8 bg-white/40"></div>
            </div>

            {/* Scroll indicator */}
            <div className="flex flex-col items-center space-y-2">
              <span className="text-sm opacity-75">Scroll Down</span>
              <ChevronDown className="w-4 h-4 opacity-75 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
