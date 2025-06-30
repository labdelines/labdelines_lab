"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import ThinkTank from "@/components/sections/ThinkTank";

export default function ThinkTankPage() {
  return (
    <>
      <Navbar />
      <main>
        <ThinkTank roomType="think tank" />
      </main>
      <Footer />
    </>
  );
}
