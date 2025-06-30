import {
  ArrowLeft,
  Wifi,
  Coffee,
  Armchair,
  Users,
  MapPin,
  Phone,
  Check,
  CheckCircle,
} from "lucide-react";

import {
  CalendarUtils,
  BookingUtils,
  NavigationUtils,
  RoomFeatures,
  RoomAmenities,
} from "@/src/lib/calendar.js";

import Image from "next/image";

import sharedhivesImg from "@/public/assets/sharedhives.png";
import sharedhivesPrice from "@/public/assets/shared_hives_price.webp";

const SharedHives = () => {
  const handleBookNow = () => {
    BookingUtils.openBookingUrl();
  };

  return (
    <div className="min-h-screen pt-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 animate-fade-in-point">
          {/* Left Column - Workspace Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Workspace Image and Title */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:scale-[1.02] lg:hover:scale-[1.01]">
              <div className="h-[350px]  lg:h-[500px] bg-gradient-to-br from-amber-100 to-orange-200 relative overflow-hidden">
                <Image
                  src={sharedhivesImg}
                  alt="share-hives"
                  className="w-full h-[350px] lg:h-[500px] object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 uppercase transition-colors duration-300 hover:text-red-900">
                    Shared Hive
                  </h2>
                  <div className="flex items-center space-x-2 text-sm font-medium text-gray-600 transition-all duration-300 hover:text-amber-600">
                    <Users className="w-4 h-4 transition-transform duration-300 hover:scale-110" />
                    <span>Open Space</span>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed transition-colors duration-300 hover:text-gray-700">
                  A space buzzing with creative energy, where ideas dance in the
                  air and collaboration happens effortlessly. That's Share Hive,
                  the heart of Lab de Lines.
                </p>

                <div className="bg-white rounded-lg shadow-sm p-4 mt-4 transition-all duration-300 hover:shadow-md">
                  <div className="flex flex-row sm:flex-row gap-2">
                    {/* Half Day Package */}
                    <div className="flex items-center space-x-4 flex-1 group">
                      <div className="w-14 h-14 lg:w-16 lg:h-16 bg-red-900 rounded-full flex flex-col items-center justify-center text-white flex-shrink-0 transition-all duration-300 group-hover:bg-red-800 group-hover:scale-110 lg:group-hover:scale-105">
                        <h3 className="font-bold text-sm lg:text-lg leading-none transition-transform duration-300 group-hover:scale-110">
                          4
                        </h3>
                        <p className="text-xs lg:text-sm font-medium">hours</p>
                      </div>

                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1 text-[11px] lg:text-base transition-colors duration-300 group-hover:text-red-900">
                          HALF DAY
                        </h4>
                        <p className="text-red-600 font-bold text-sm lg:text-xl transition-all duration-300 group-hover:text-red-700 group-hover:scale-105">
                          42.000 LAK
                        </p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden sm:block w-px bg-gray-200 transition-colors duration-300 hover:bg-gray-300"></div>
                    <div className="sm:hidden h-px bg-gray-200 transition-colors duration-300 hover:bg-gray-300"></div>

                    {/* Full Day Package */}
                    <div className="flex items-center space-x-4 flex-1 group">
                      <div className="w-14 h-14 lg:w-16 lg:h-16 bg-red-900 rounded-full flex flex-col items-center justify-center text-white flex-shrink-0 transition-all duration-300 group-hover:bg-red-800 group-hover:scale-110 lg:group-hover:scale-105">
                        <h3 className="font-bold text-sm lg:text-lg leading-none transition-transform duration-300 group-hover:scale-110">
                          8
                        </h3>
                        <p className="text-xs lg:text-sm font-medium">hours</p>
                      </div>

                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1 text-[11px] lg:text-base transition-colors duration-300 group-hover:text-red-900">
                          FULL DAY
                        </h4>
                        <p className="text-red-600 font-bold text-sm lg:text-xl transition-all duration-300 group-hover:text-red-700 group-hover:scale-105">
                          75.000 LAK
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBookNow}
                className="w-full bg-red-800 hover:bg-red-900 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
              >
                Contact Us
              </button>
            </div>

            {/* Features Section */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:scale-[1.01] lg:hover:scale-[1.005]">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 transition-colors duration-300 hover:text-red-900">
                  Features
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 group transition-all duration-300 hover:bg-gray-50 p-2 rounded-lg">
                    <div className="w-2 h-2 bg-red-900 rounded-full mt-2 flex-shrink-0 transition-all duration-300 group-hover:scale-125 group-hover:bg-amber-500"></div>
                    <p className="text-gray-700 text-sm leading-relaxed transition-colors duration-300 group-hover:text-gray-900">
                      Hot desks: Perfect for freelancers, digital nomads,
                      students, and anyone who thrives in a dynamic peaceful
                      environment.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3 group transition-all duration-300 hover:bg-gray-50 p-2 rounded-lg">
                    <div className="w-2 h-2 bg-red-900 rounded-full mt-2 flex-shrink-0 transition-all duration-300 group-hover:scale-125 group-hover:bg-amber-500"></div>
                    <p className="text-gray-700 text-sm leading-relaxed transition-colors duration-300 group-hover:text-gray-900">
                      Share Hive is ideal for those who want to be part of a
                      buzzing community, network with like-minded individuals,
                      and experience the contagious energy of Lab de Lines.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3 group transition-all duration-300 hover:bg-gray-50 p-2 rounded-lg">
                    <div className="w-2 h-2 bg-red-900 rounded-full mt-2 flex-shrink-0 transition-all duration-300 group-hover:scale-125 group-hover:bg-amber-500"></div>
                    <p className="text-gray-700 text-sm leading-relaxed transition-colors duration-300 group-hover:text-gray-900">
                      Common space areas and cozy corners invite impromptu
                      conversations and brainstorming sessions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing Card */}
              <div className="h-auto lg:h-[800px] bg-gradient-to-br from-amber-100 to-orange-200 relative rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.01] lg:hover:scale-[1.005]">
                <Image
                  src={sharedhivesPrice}
                  alt="share-hives"
                  className="w-full h-auto lg:h-[800px] object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>

              {/* Amenities */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:scale-[1.02] lg:hover:scale-[1.01] group">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0 bg-amber-500 transition-all duration-300 group-hover:bg-amber-600 group-hover:scale-110">
                      <Armchair className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-amber-700">
                        Comfortable Seating
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
                        Common space areas and cozy corners invite impromptu
                        conversations and brainstorming sessions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:scale-[1.02] lg:hover:scale-[1.01] group">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0 bg-amber-500 transition-all duration-300 group-hover:bg-amber-600 group-hover:scale-110">
                      <Coffee className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-amber-700">
                        Drinks and cafe services
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
                        Fuel your productivity with endless access to a
                        delicious caffeine fix.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:scale-[1.02] lg:hover:scale-[1.01] group">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0 bg-amber-500 transition-all duration-300 group-hover:bg-amber-600 group-hover:scale-110">
                      <Wifi className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-amber-700">
                        Stable Wi-Fi
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
                        Stay connected and get things done seamlessly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedHives;
