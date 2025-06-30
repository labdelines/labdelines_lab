// src/app/workspace/[id]/page.jsx OR src/pages/workspace/[id].jsx
"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation"; // For App Router
// import { useRouter } from 'next/router'; // For Pages Router
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  Wifi,
  Coffee,
  Monitor,
  ChevronLeft,
  ChevronRight,
  Phone,
  MapPin,
} from "lucide-react";
import {
  fetchBookingData,
  generateCalendarDays,
  getMonthName,
  getNextMonth,
  getPrevMonth,
  getRoomConfig,
  formatDisplayDate,
  openBookingUrl,
  getDaysOfWeek,
} from "@/src/lib/calendar.js";
import { CONFIG } from "@/src/lib/config.js";

const WorkspacePage = () => {
  const router = useRouter();
  const params = useParams(); // For App Router
  // const { query } = useRouter(); // For Pages Router - use query.id instead of params.id

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  // Map URL ID to workspace key
  const workspaceMap = {
    share_hives: "share hives",
    focus_capsule: "focus capsule",
    think_tank: "think tank",
    underlines: "underlines",
    event_space: "event space",
  };

  // Get workspace key from URL
  const workspaceKey = workspaceMap[params?.id] || "think tank"; // Use query.id for Pages Router
  const roomConfig = getRoomConfig(workspaceKey);
  const daysOfWeek = getDaysOfWeek();

  // Workspace-specific data
  const workspaceData = {
    "share hives": {
      image: "/images/share-hives.jpg",
      capacity: "Open Space",
      features: [
        "House dance in the air and collaborative happiness effortlessly. That's Share Hive the heart of Lab de Lines.",
        "Hot desks. Perfect for freelancers, digital nomads, and creatives who thrive in a dynamic environment.",
        "Share Hive is ideal for those who want to be part of a community, network with like-minded people, and experience the contagious energy of Lab de Lines.",
      ],
      amenities: [
        {
          icon: <Users className="w-5 h-5" />,
          title: "Comfortable Seating",
          desc: "Common space areas and centers team atmosphere bringing encouraging sessions.",
        },
        {
          icon: <Coffee className="w-5 h-5" />,
          title: "Drinks",
          desc: "Fuel your productivity with high-quality beverages.",
        },
        {
          icon: <Wifi className="w-5 h-5" />,
          title: "Stable Wi-Fi",
          desc: "Stay connected and get things done seamlessly.",
        },
      ],
    },
    "think tank": {
      image: "/images/think-tank.jpg",
      capacity: "12-25",
      features: [
        "Fuel your next brainstorm in our dedicated Think Tank meeting room.",
        "This adaptable space transforms to suit your needs. Whether you're brainstorming, strategic planning, and productive meetings for groups of 12 up to 25 people.",
        "Comfortable seating for 12-25 people, with flexible arrangements including theater-style seating for up to 70 people.",
        "Large windows and bright windows create a stimulating and inspiring atmosphere.",
      ],
      amenities: [
        {
          icon: <Users className="w-5 h-5" />,
          title: "Flexible seating arrangements",
          desc: "U-shaped, classroom action pods, conference table, Theater-style seating (70 people max), Classroom-style seating",
        },
        {
          icon: <Monitor className="w-5 h-5" />,
          title: "Equipment",
          desc: "Speaker set, Projector, Whiteboard, Drinking water",
        },
        {
          icon: <Wifi className="w-5 h-5" />,
          title: "Stable Wi-Fi",
          desc: "Stay connected and get things done seamlessly.",
        },
      ],
    },
    "focus capsule": {
      image: "/images/focus-capsule.jpg",
      capacity: "2-5",
      features: [
        "Dedicated room designed for group work of 2-5 people",
        "Private workspace for individual focus and concentration",
        "Quiet environment perfect for deep work sessions",
        "Modern amenities for productive meetings",
      ],
      amenities: [
        {
          icon: <Users className="w-5 h-5" />,
          title: "Small Group Focus",
          desc: "Perfect for 2-5 people collaborative work",
        },
        {
          icon: <Wifi className="w-5 h-5" />,
          title: "High-Speed Internet",
          desc: "Reliable connection for all your needs",
        },
        {
          icon: <Coffee className="w-5 h-5" />,
          title: "Refreshments",
          desc: "Coffee and tea available",
        },
      ],
    },
    underlines: {
      image: "/images/underlines.jpg",
      capacity: "8-12",
      features: [
        "Premium meeting space for executive sessions",
        "Professional environment for important meetings",
        "High-end furnishing and equipment",
        "Perfect for client presentations and board meetings",
      ],
      amenities: [
        {
          icon: <Users className="w-5 h-5" />,
          title: "Executive Setting",
          desc: "Premium environment for 8-12 people",
        },
        {
          icon: <Monitor className="w-5 h-5" />,
          title: "AV Equipment",
          desc: "Professional presentation setup",
        },
        {
          icon: <Coffee className="w-5 h-5" />,
          title: "Catering Service",
          desc: "Professional refreshment service",
        },
      ],
    },
    "event space": {
      image: "/images/event-space.jpg",
      capacity: "50+",
      features: [
        "Large outdoor area for events and gatherings",
        "Perfect for team building and corporate events",
        "Flexible space that can accommodate various setups",
        "Natural outdoor environment",
      ],
      amenities: [
        {
          icon: <Users className="w-5 h-5" />,
          title: "Large Capacity",
          desc: "Accommodate 50+ people for events",
        },
        {
          icon: <Calendar className="w-5 h-5" />,
          title: "Event Setup",
          desc: "Flexible arrangements for any occasion",
        },
        {
          icon: <Coffee className="w-5 h-5" />,
          title: "Catering Available",
          desc: "Full event catering services",
        },
      ],
    },
  };

  const currentWorkspace =
    workspaceData[workspaceKey] || workspaceData["think tank"];

  // Load booking data
  useEffect(() => {
    const loadBookings = async () => {
      try {
        setIsLoading(true);
        const data = await fetchBookingData();
        setBookings(data);
      } catch (error) {
        console.error("Error loading bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBookings();
  }, []);

  // Navigation functions
  const handlePrevMonth = () => {
    const { year, month } = getPrevMonth(currentYear, currentMonth);
    setCurrentYear(year);
    setCurrentMonth(month);
  };

  const handleNextMonth = () => {
    const { year, month } = getNextMonth(currentYear, currentMonth);
    setCurrentYear(year);
    setCurrentMonth(month);
  };

  // Generate calendar
  const calendarDays = generateCalendarDays(
    currentYear,
    currentMonth,
    bookings,
    workspaceKey
  );

  // Group calendar days into weeks
  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  // Get booking count for current month
  const currentMonthBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.date);
    return (
      bookingDate.getFullYear() === currentYear &&
      bookingDate.getMonth() === currentMonth &&
      booking.room.toLowerCase() === workspaceKey.toLowerCase()
    );
  });

  const handleDateClick = (day) => {
    if (day.type === "day") {
      setSelectedDate(day);
      if (day.showAvailable) {
        openBookingUrl(workspaceKey);
      }
    }
  };

  const handleBookNow = () => {
    openBookingUrl(workspaceKey);
  };

  const handleBack = () => {
    router.push("/"); // Go back to home page
  };

  // Show loading or error if workspace not found
  if (!workspaceKey || !roomConfig) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Workspace Not Found
          </h1>
          <button
            onClick={handleBack}
            className="bg-red-900 text-white px-4 py-2 rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-white bg-red-900 hover:bg-red-800 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Home</span>
            </button>

            <h1 className="text-xl font-semibold text-gray-900">
              {CONFIG.COMPANY.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Workspace Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Workspace Image and Title */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-amber-100 to-orange-200 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900 via-amber-700 to-amber-500 opacity-80">
                  <div className="absolute inset-4 bg-gradient-to-br from-amber-800 to-orange-900 rounded-lg opacity-60"></div>
                  <div className="absolute bottom-8 left-8 right-8 h-16 bg-gradient-to-r from-amber-600 to-orange-700 rounded opacity-40"></div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 uppercase">
                    {roomConfig.displayName}
                  </h2>
                  <div className="flex items-center space-x-2 text-sm font-medium text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{currentWorkspace.capacity}</span>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {roomConfig.description}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Features
              </h3>
              <div className="space-y-3">
                {currentWorkspace.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-900 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-4">
              {currentWorkspace.amenities.map((amenity, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: roomConfig.color }}
                    >
                      {amenity.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {amenity.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {amenity.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Calendar and Booking */}
          <div className="space-y-6">
            {/* Booking Calendar */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Booking Calendar 2025
                </h3>
                <div
                  className="inline-block px-4 py-2 rounded-lg text-white font-medium"
                  style={{ backgroundColor: roomConfig.color }}
                >
                  {roomConfig.displayName.toUpperCase()}
                </div>
              </div>

              {/* Calendar Stats */}
              <div className="flex items-center justify-center space-x-8 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {currentMonthBookings.length}
                  </div>
                  <div className="text-xs text-gray-500">Bookings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">
                    {
                      calendarDays.filter(
                        (day) => day.type === "day" && day.showAvailable
                      ).length
                    }
                  </div>
                  <div className="text-xs text-gray-500">Available</div>
                </div>
              </div>

              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handlePrevMonth}
                  className="flex items-center space-x-1 px-3 py-2 text-white bg-red-900 hover:bg-red-800 rounded-lg transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">Back</span>
                </button>

                <h4 className="font-semibold text-gray-900">
                  {getMonthName(currentMonth)} {currentYear}
                </h4>

                <button
                  onClick={handleNextMonth}
                  className="flex items-center space-x-1 px-3 py-2 text-white bg-red-900 hover:bg-red-800 rounded-lg transition-colors duration-200"
                >
                  <span className="text-sm font-medium">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="border rounded-lg overflow-hidden">
                {/* Days of week header */}
                <div className="grid grid-cols-7 bg-gray-50">
                  {daysOfWeek.map((day) => (
                    <div
                      key={day}
                      className="p-2 text-center text-xs font-medium text-gray-700 border-r border-gray-200 last:border-r-0"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar weeks */}
                {weeks.map((week, weekIndex) => (
                  <div
                    key={weekIndex}
                    className="grid grid-cols-7 border-t border-gray-200"
                  >
                    {week.map((day) => {
                      if (day.type === "empty") {
                        return (
                          <div
                            key={day.key}
                            className="h-12 border-r border-gray-200 last:border-r-0"
                          ></div>
                        );
                      }

                      const hasBooking = day.hasBookings;
                      const isAvailable = day.showAvailable;

                      return (
                        <div
                          key={day.key}
                          className={`h-12 border-r border-gray-200 last:border-r-0 relative cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                            hasBooking
                              ? "bg-red-50"
                              : isAvailable
                              ? "bg-green-50"
                              : ""
                          }`}
                          onClick={() => handleDateClick(day)}
                        >
                          <div className="p-1">
                            <div
                              className={`text-xs font-medium ${
                                hasBooking
                                  ? "text-red-700"
                                  : isAvailable
                                  ? "text-green-700"
                                  : "text-gray-900"
                              }`}
                            >
                              {day.date}
                            </div>

                            {hasBooking && (
                              <div
                                className="absolute bottom-1 left-1 right-1 h-1 rounded"
                                style={{ backgroundColor: roomConfig.color }}
                              ></div>
                            )}

                            {isAvailable && (
                              <div className="absolute bottom-1 left-1 right-1 h-1 bg-green-500 rounded"></div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex justify-center space-x-4 mt-4 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-gray-600">Booking</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span className="text-gray-600">Warning</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-gray-400 rounded"></div>
                  <span className="text-gray-600">Available</span>
                </div>
              </div>

              {/* Book Now Button */}
              <button
                onClick={handleBookNow}
                className="w-full mt-6 bg-red-900 hover:bg-red-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Book Now
              </button>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">Phone</div>
                    <div className="text-sm text-gray-600">
                      +856 20 52 242 244
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">Location</div>
                    <div className="text-sm text-gray-600">
                      Don Nokkhoum Village
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

export default WorkspacePage;
