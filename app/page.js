// Main Page Layout - Updated for smooth transitions
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";
import PastExp from "@/components/PastExp";
import Facilities from "@/components/Facilities";
import ContactUs from "@/components/ContactUs";
import BookingSection from "@/components/BookingSection";
import Head from "next/head";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <>
      <NavBar />
      <main className="relative">
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css"
        />

        {/* Hero Section - Fixed background */}
        <HeroSection />

        {/* All other sections stack naturally and slide over hero */}
        <div className="relative z-10">
          <BookingSection />

          {/* Ensure all other sections have proper background */}
          <div className="bg-white">
            <PastExp />
            <Facilities />
            <ContactUs />

            {/* Footer spacer to prevent seeing hero at the end */}
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
