"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import SharedHives from "@/components/sections/SharedHives";

export default function SharedHivesPage() {
  return (
    <>
      <Navbar />
      <main>
        <SharedHives roomType="shared hives" />
      </main>
      <Footer />
    </>
  );
}
