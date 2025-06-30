"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import LaPetite from "@/components/sections/LaPetite";

export default function LaPetitePage() {
  return (
    <>
      <Navbar />
      <main>
        <LaPetite />
      </main>
      <Footer />
    </>
  );
}
