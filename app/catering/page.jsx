"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import Catering from "@/components/sections/Catering";

export default function CateringPage() {
  return (
    <>
      <Navbar />
      <main>
        <Catering />
      </main>
      <Footer />
    </>
  );
}
