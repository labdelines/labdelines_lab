"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Coffee, Calendar, Utensils, ArrowRight, Clock, X } from "lucide-react";

// Simple Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-red-700 text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const Facilities = () => {
  const router = useRouter();
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);

  const facilities = [
    {
      id: 1,
      icon: <Coffee className="w-8 h-8 md:w-10 md:h-10 lg:w-8 lg:h-8" />,
      title: "La Petite Cafe",
      description: "Co-working Space",
      href: "/la_petite",
    },
    {
      id: 2,
      icon: <Calendar className="w-8 h-8 md:w-10 md:h-10 lg:w-8 lg:h-8" />,
      title: "Event equipment",
      description: "for rent",
      href: "",
      comingSoon: true,
    },
    {
      id: 3,
      icon: <Utensils className="w-8 h-8 md:w-10 md:h-10 lg:w-8 lg:h-8" />,
      title: "Catering",
      description: "for meeting",
      href: "/catering",
    },
  ];

  const handleFacilityClick = (facility) => {
    if (facility.comingSoon) {
      setShowComingSoonModal(true);
    } else {
      router.push(`${facility.href}#details`);
    }
  };

  const closeModal = () => setShowComingSoonModal(false);

  return (
    <div
      id="facilities"
      className="bg-white px-4 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16"
    >
      <div className="max-w-sm mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        {/* Section Title */}
        <div className="mb-8 lg:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-2 text-left">
            Other facilities
          </h2>
        </div>

        {/* Facilities List */}
        <div className="space-y-4 md:space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0 xl:grid-cols-3">
          {facilities.map((facility) => (
            <div
              key={facility.id}
              onClick={() => handleFacilityClick(facility)}
              className="block bg-red-800 hover:bg-red-900 text-white rounded-lg md:rounded-xl p-6 md:p-8 transition-all duration-300 group hover:shadow-xl hover:scale-105 transform cursor-pointer"
            >
              <div className="flex items-center justify-between">
                {/* Icon and Text */}
                <div className="flex items-center space-x-4 md:space-x-6">
                  {/* Icon */}
                  <div className="flex-shrink-0 p-2 md:p-3 bg-white/10 rounded-lg">
                    {facility.icon}
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-1">
                      {facility.title}
                    </h3>
                    <p className="text-white/80 text-sm md:text-base">
                      {facility.description}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 ml-4 md:ml-6">
                  <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coming Soon Modal */}
      <Modal
        isOpen={showComingSoonModal}
        onClose={closeModal}
        title="Event Equipment"
      >
        <div className="text-center ">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-3">Coming Soon!</h4>
          <p className="text-gray-600 mb-6">
            This service will be available soon. Stay tuned for updates!
          </p>
          <button
            onClick={closeModal}
            className="bg-gray-100 text-black font-medium py-3 px-6 rounded-lg transition-colors duration-200 w-full sm:w-auto"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Facilities;
