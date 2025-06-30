"use client";
import { Phone, MapPin } from "lucide-react";

const ContactUs = () => {
  const OpenMap = () => {
    window.open("https://maps.app.goo.gl/9bM8a8M9AHMCiysH9", "_blank");
  };

  return (
    <div
      id="contact"
      className="bg-white px-4 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16"
    >
      <div className="max-w-sm mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        {/* Section Header */}
        <div className="mb-8 lg:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-2 text-left md:text-left">
            Contact Us
          </h2>
          <p className="text-gray-500 text-lg md:text-xl lg:text-xl">
            Lab de LINES - Where Passion Exists
          </p>
        </div>

        {/* Content Container - responsive layout */}
        <div className="lg:grid lg:grid-cols-1 lg:gap-8 xl:gap-12">
          {/* Left Column - Map and Button */}
          <div className="lg:order-1">
            {/* Google Maps Embed */}
            <div className="mb-6 md:mb-8">
              <div className="w-full h-48 md:h-64 lg:h-64 xl:h-72 bg-gray-100 rounded-lg md:rounded-xl lg:rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3795.879136617814!2d102.62960674721194!3d17.937790343154486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x312467b4f5436957%3A0x9f40a8f3f6b35fd0!2sLAB%20DE%20LINES!5e0!3m2!1sen!2sla!4v1750648625774!5m2!1sen!2sla"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lab de Lines Location - Don Nokkhoum Village"
                  className="rounded-lg md:rounded-xl lg:rounded-xl"
                />
              </div>
            </div>

            {/* Location Button */}
            <div className="mb-8 lg:mb-0">
              <button
                onClick={OpenMap}
                className="w-full bg-red-800 hover:bg-red-900 text-white py-4 md:py-5 lg:py-4 px-6 md:px-8 lg:px-6 rounded-lg md:rounded-xl lg:rounded-lg  text-lg md:text-xl lg:text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform"
              >
                Location LAB DE LINES
              </button>
            </div>
          </div>

          {/* Right Column - Contact Information */}
          <div className="lg:order-2">
            <div className="space-y-6 md:space-y-8 lg:space-y-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
