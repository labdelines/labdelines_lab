"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Wifi,
  Users,
  MapPin,
  Phone,
  Monitor,
  ChevronRight,
  ChevronLeft,
  Volume2,
  Star,
  Coffee,
  Edit, // For whiteboards
  Presentation, // For presentation equipment
  Sun, // For lighting
  Tent, // For tents/weather protection
  Snowflake, // For climate control
  Trees, // For garden views
} from "lucide-react";

// Import configuration and utilities
import { CONFIG } from "@/src/lib/config.js";
import {
  CalendarUtils,
  BookingUtils,
  NavigationUtils,
  RoomFeatures,
  RoomAmenities,
  PresentationFacilities, // Add this import
} from "@/src/lib/calendar.js";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

// Import the separated modal component
import BookingModal from "@/src/lib/bookingModal.js";

// Import all room images
import Navbar from "./NavBar";
import Footer from "./Footer";

const DynamicRoomBooking = ({ roomId: propRoomId }) => {
  const params = useParams();
  const router = useRouter();

  // Determine room ID from props or URL params
  const roomId = propRoomId || params?.roomId || "think_tank";

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  // Get dynamic room configuration
  const currentRoomConfig = CONFIG.ROOMS[roomId] || CONFIG.ROOMS.think_tank;
  const roomConfig = BookingUtils.getRoomConfig(currentRoomConfig.key);
  const roomFeatures = RoomFeatures[currentRoomConfig.key] || [];
  const roomAmenities = RoomAmenities[currentRoomConfig.key] || [];

  // Load booking data
  const loadBookingData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log(`Loading ${currentRoomConfig.displayName} booking data...`);
      const allBookings = await BookingUtils.loadBookingData();

      // Filter for current room bookings
      const currentRoomBookings = allBookings
        .filter((booking) => {
          const roomName = booking.room ? booking.room.toLowerCase() : "";
          const targetRoomKey = currentRoomConfig.key.toLowerCase();

          // Handle special cases for room filtering
          if (roomId === "think_tank") {
            return (
              roomName.includes("think tank") && !roomName.includes("4th floor")
            );
          }

          return roomName.includes(targetRoomKey) || roomName === targetRoomKey;
        })
        .map((booking) => ({
          room: booking.room,
          date: booking.date,
          time: booking.time || "",
          status: booking.status || "",
        }));

      setBookings(currentRoomBookings);
      console.log(
        `${currentRoomConfig.displayName} bookings loaded:`,
        currentRoomBookings.length
      );
    } catch (error) {
      console.error("Error loading booking data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount or when roomId changes
  useEffect(() => {
    loadBookingData();
  }, [roomId]);

  // Navigation functions
  const handlePrevMonth = () => {
    const { month, year } = NavigationUtils.handlePrevMonth(
      currentMonth,
      currentYear
    );
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  const handleNextMonth = () => {
    const { month, year } = NavigationUtils.handleNextMonth(
      currentMonth,
      currentYear
    );
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  // Handle date click - Open modal
  const handleDateClick = (day) => {
    if (!day) return;
    setSelectedDay(day);
    setModalOpen(true);
  };

  // Handle booking action
  const handleBookNow = () => {
    BookingUtils.openBookingUrl();
  };

  // Handle navigation back to workspace selection
  const handleBackToWorkspaces = () => {
    router.push("/#workspaces");
  };

  // Generate calendar data
  const calendarDays = CalendarUtils.generateCalendarDays(
    currentYear,
    currentMonth,
    bookings,
    currentRoomConfig.key
  );
  const weeks = CalendarUtils.groupIntoWeeks(calendarDays);
  const stats = CalendarUtils.calculateStats(
    calendarDays,
    bookings,
    currentYear,
    currentMonth
  );

  // Consolidated Calendar Component
  const CalendarComponent = ({ className = "" }) => (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      {/* Calendar Header - Responsive styling */}
      <div className="text-center mb-6">
        <div className="lg:hidden">
          <div className="inline-block px-1  rounded-lg text-red-800 font-bold text-xl ">
            {currentRoomConfig.displayName.toUpperCase()} - Calendar{" "}
            {currentYear}
          </div>
          <p className="text-sm text-gray-900">(View available rooms)</p>
        </div>

        <div className="hidden lg:block">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Booking Calendar {currentYear}
          </h3>
          <div
            className="inline-block px-4 py-2 rounded-lg text-white font-medium"
            style={{ backgroundColor: roomConfig.color }}
          >
            {currentRoomConfig.displayName.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Calendar Stats */}
      <div className="flex items-center justify-center space-x-8 mb-6">
        {isLoading ? (
          // Skeleton for stats
          <>
            <div className="text-center">
              <div className="w-12 h-8 bg-gray-300 rounded animate-pulse mb-1"></div>
              <div className="text-xs text-gray-500">Booked</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-8 bg-gray-300 rounded animate-pulse mb-1"></div>
              <div className="text-xs text-gray-500">Availables</div>
            </div>
          </>
        ) : (
          // Actual stats
          <>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-800">
                {stats.totalBookings}
              </div>
              <div className="text-xs text-gray-500">Booked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-400">
                {stats.availableDays}
              </div>
              <div className="text-xs text-gray-500">Availables</div>
            </div>
          </>
        )}
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="flex items-center space-x-1 px-3 py-2 text-white bg-red-900 hover:bg-red-800 rounded-lg transition-colors duration-200"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <h4 className="font-semibold text-gray-900">
          {CalendarUtils.getMonthName(currentMonth)} {currentYear}
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
          {CalendarUtils.getDaysOfWeek().map((day, i) => (
            <div
              key={i}
              className="p-2 text-center text-xs font-medium text-gray-700 border-r border-gray-200 last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar weeks - Show skeleton when loading */}
        {isLoading ? (
          // Skeleton Loading for Calendar
          <>
            {[...Array(6)].map((_, weekIndex) => (
              <div
                key={weekIndex}
                className="grid grid-cols-7 border-t border-gray-200"
              >
                {[...Array(7)].map((_, dayIndex) => (
                  <div
                    key={dayIndex}
                    className="h-12 border-r border-gray-200 last:border-r-0 relative p-1"
                  >
                    <div className="animate-pulse">
                      <div className="h-3 bg-gray-300 rounded mb-1"></div>
                      <div className="absolute bottom-1 left-1 right-1 h-1 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </>
        ) : (
          // Actual Calendar Content
          weeks.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className="grid grid-cols-7 border-t border-gray-200"
            >
              {week.map((day, dayIndex) => {
                if (!day) {
                  return (
                    <div
                      key={dayIndex}
                      className="h-12 border-r border-gray-200 last:border-r-0"
                    ></div>
                  );
                }

                const hasBooking =
                  day.status === "booked" || day.status === "warning";
                const isAvailable = day.status === "available";
                const isWarning = day.status === "warning";

                return (
                  <div
                    key={dayIndex}
                    className={`h-12 border-r border-gray-200 last:border-r-0 relative cursor-pointer transition-colors duration-200 ${
                      !hasBooking
                        ? isAvailable
                          ? "bg-gray-50 hover:bg-green-200"
                          : "hover:bg-gray-50"
                        : ""
                    }`}
                    onClick={() => handleDateClick(day)}
                    title={
                      day.bookings.length > 0
                        ? `${day.bookings.length} booking(s) - Click for details`
                        : "Available - Click to book"
                    }
                  >
                    {/* Booking Time Visual Indicators - SVG Diagonal Split */}
                    {day.bookings.length > 0 &&
                      (() => {
                        const times = day.bookings.map((b) => {
                          if (!b.time || b.time.trim() === "") return "full";

                          try {
                            const timeParts = b.time.split("-");
                            if (timeParts.length !== 2) return "full";

                            const [startTime, endTime] = timeParts;
                            const [startHour] = startTime
                              .trim()
                              .split(":")
                              .map(Number);
                            const [endHour] = endTime
                              .trim()
                              .split(":")
                              .map(Number);

                            if (startHour < 12 && endHour > 12) return "full";
                            if (startHour < 12) return "morning";
                            if (startHour >= 12) return "afternoon";
                            return "full";
                          } catch (error) {
                            return "full";
                          }
                        });

                        const unique = [...new Set(times)];
                        const hasMorning = unique.includes("morning");
                        const hasAfternoon = unique.includes("afternoon");
                        const hasFull = unique.includes("full");

                        if (hasFull) {
                          return (
                            <div
                              className={`absolute inset-0 ${
                                isWarning ? "bg-yellow-500" : "bg-red-500"
                              } transition-colors duration-200`}
                            />
                          );
                        } else if (hasMorning && hasAfternoon) {
                          // Both morning and afternoon - SVG diagonal split
                          return (
                            <div className="absolute inset-0">
                              <svg
                                className="w-full h-full"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                              >
                                {/* Morning triangle (top-left) */}
                                <polygon
                                  points="0,0 100,0 0,100"
                                  className={`${
                                    isWarning
                                      ? "fill-yellow-500"
                                      : "fill-red-500"
                                  } transition-colors duration-200`}
                                />
                                {/* Afternoon triangle (bottom-right) */}
                                <polygon
                                  points="100,0 100,100 0,100"
                                  className={`${
                                    isWarning
                                      ? "fill-yellow-400"
                                      : "fill-red-400"
                                  } transition-colors duration-200`}
                                />
                                {/* Diagonal line */}
                                <line
                                  x1="0"
                                  y1="100"
                                  x2="100"
                                  y2="0"
                                  stroke="#374151"
                                  strokeWidth="2"
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </div>
                          );
                        } else if (hasMorning) {
                          return (
                            <div className="absolute inset-0">
                              <svg
                                className="w-full h-full"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                              >
                                <polygon
                                  points="0,0 100,0 0,100"
                                  className={`${
                                    isWarning
                                      ? "fill-yellow-500"
                                      : "fill-red-500"
                                  } transition-colors duration-200`}
                                />
                              </svg>
                            </div>
                          );
                        } else if (hasAfternoon) {
                          return (
                            <div className="absolute inset-0">
                              <svg
                                className="w-full h-full"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                              >
                                <polygon
                                  points="100,0 100,100 0,100"
                                  className={`${
                                    isWarning
                                      ? "fill-yellow-500"
                                      : "fill-red-500"
                                  } transition-colors duration-200`}
                                />
                              </svg>
                            </div>
                          );
                        }
                        return null;
                      })()}

                    <div className="relative p-1 z-10 h-full flex items-start">
                      <div
                        className={`text-xs font-medium drop-shadow-sm ${
                          hasBooking
                            ? "text-gray-800"
                            : isAvailable
                            ? "text-gray-700"
                            : "text-gray-900"
                        }`}
                        style={hasBooking ? { font: "bold" } : {}}
                      >
                        {day.date}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>

      {/* Legend - Updated with time indicators */}
      <div className="flex justify-center space-x-3 mt-4 text-[10px]">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gray-100 rounded"></div>
          <span className="text-gray-600">Available</span>
        </div>
        {/* divider */}
        <div className="w-px h-4 bg-gray-300"></div>

        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span className="text-gray-600">Pending</span>
        </div>

        {/* divider */}
        <div className="w-px h-4 bg-gray-300"></div>

        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-gray-600">Booked</span>
        </div>

        {/* divider */}
        {/* <div className="w-px h-4 bg-gray-300"></div> */}

        {/* Diagonal split indicator */}
        {/* <div className="flex items-center space-x-1">
          <div className="w-3 h-3 relative border border-gray-300 bg-gray-100">
            <div
              className="absolute inset-0 bg-red-500"
              style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
            />
          </div>
          <span className="text-gray-600">half Day</span>
        </div> */}
      </div>

      {/* Book Now Button */}
      <button
        onClick={handleBookNow}
        className="w-full mt-6 bg-red-900 hover:bg-red-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
      >
        {CONFIG.CALENDAR.availableButtonText} via WhatsApp
      </button>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-10 bg-gray-50">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Workspace Details */}
            <div className="lg:col-span-2 space-y-6 animate-fade-in-point">
              {/* Workspace Image and Title */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-[325px] lg:h-[500px] bg-gradient-to-br from-amber-100 to-orange-200 relative ">
                  <Image
                    src={currentRoomConfig.image}
                    alt={currentRoomConfig.displayName}
                    className="w-full h-[325px] lg:h-[500px] object-cover"
                    priority
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4 pb-2">
                    <h2 className="text-2xl font-bold text-gray-900 uppercase">
                      {currentRoomConfig.displayName}
                    </h2>
                    <div className="flex items-center space-x-2 text-sm font-medium text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{currentRoomConfig.capacity}</span>
                    </div>
                  </div>

                  {/* Equipment & Facilities - Replace room description */}
                  {PresentationFacilities[currentRoomConfig.key] ? (
                    <div className="mb-4">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {PresentationFacilities[currentRoomConfig.key].map(
                          (facility, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                            >
                              <div className="w-6 h-6 flex items-center justify-center">
                                {facility.icon === "Volume2" && (
                                  <Volume2 className="w-4 h-4 text-gray-600" />
                                )}
                                {facility.icon === "Monitor" && (
                                  <Monitor className="w-4 h-4 text-gray-600" />
                                )}
                                {facility.icon === "Edit" && (
                                  <Edit className="w-4 h-4 text-gray-600" />
                                )}
                                {facility.icon === "Coffee" && (
                                  <Coffee className="w-4 h-4 text-gray-600" />
                                )}
                                {facility.icon === "Users" && (
                                  <Users className="w-4 h-4 text-gray-600" />
                                )}

                                {facility.icon === "Wifi" && (
                                  <Wifi className="w-4 h-4 text-gray-600" />
                                )}
                                {facility.icon === "Presentation" && (
                                  <Presentation className="w-4 h-4 text-gray-600" />
                                )}
                                {facility.icon === "Tent" && (
                                  <Tent className="w-4 h-4 text-gray-600" />
                                )}
                                {facility.icon === "Sun" && (
                                  <Sun className="w-4 h-4 text-gray-600" />
                                )}
                                {facility.icon === "Snowflake" && (
                                  <Snowflake className="w-4 h-4 text-gray-600" />
                                )}
                                {facility.icon === "Trees" && (
                                  <Trees className="w-4 h-4 text-gray-600" />
                                )}
                                {facility.icon === "Star" && (
                                  <Star className="w-4 h-4 text-gray-600" />
                                )}
                                {/* Fallback icon */}
                                {![
                                  "Volume2",
                                  "Monitor",
                                  "Edit",
                                  "Coffee",
                                  "Users",
                                  "Wifi",
                                  "Presentation",
                                  "Tent",
                                  "Sun",
                                  "Snowflake",
                                  "Trees",
                                  "Star",
                                ].includes(facility.icon) && (
                                  <Monitor className="w-4 h-4 text-gray-600" />
                                )}
                              </div>
                              <span className="text-xs font-medium text-gray-700 leading-tight">
                                {facility.name}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ) : (
                    // Fallback to room description if no facilities defined
                    <p className="text-gray-600  leading-relaxed mb-4">
                      {currentRoomConfig.description}
                    </p>
                  )}

                  {/* Dynamic Pricing Display - Keep exactly as is */}
                  <div className="bg-white rounded-lg shadow-sm p-4 mt-4 mb-3 transition-all duration-300 hover:shadow-md">
                    {/* Check if room only has full day pricing (like underlines) */}
                    {roomId === "underlines" ? (
                      // Full Day Only - Centered single pricing
                      <div className="flex justify-center">
                        <div className="flex items-center space-x-4 group">
                          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-red-900 rounded-full flex flex-col items-center justify-center text-white flex-shrink-0 transition-all duration-300 group-hover:bg-red-800 group-hover:scale-110">
                            <h3 className="font-bold text-lg lg:text-2xl leading-none transition-transform duration-300 group-hover:scale-110">
                              {currentRoomConfig.pricing.fullDay.hours}
                            </h3>
                            <p className="text-sm lg:text-base font-medium">
                              hours
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1 text-base lg:text-lg transition-colors duration-300 group-hover:text-red-900">
                              FULL DAY ONLY
                            </h4>
                            <p className="text-red-600 font-bold text-xl lg:text-2xl transition-all duration-300 group-hover:text-red-700 group-hover:scale-105">
                              {currentRoomConfig.pricing.fullDay.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Regular Half Day + Full Day Pricing
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Half Day Package */}
                        <div className="flex items-center space-x-4 flex-1 group">
                          <div className="w-14 h-14 lg:w-16 lg:h-16 bg-red-900 rounded-full flex flex-col items-center justify-center text-white flex-shrink-0 transition-all duration-300 group-hover:bg-red-800 group-hover:scale-110 lg:group-hover:scale-105">
                            <h3 className="font-bold text-md lg:text-lg leading-none transition-transform duration-300 group-hover:scale-110">
                              {currentRoomConfig.pricing.halfDay.hours}
                            </h3>
                            <p className="text-sm lg:text-sm font-medium">
                              hours
                            </p>
                          </div>

                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1 text-[11px] lg:text-base transition-colors duration-300 group-hover:text-red-900">
                              HALF DAY
                            </h4>
                            <p className="text-red-600 font-bold text-lg lg:text-xl transition-all duration-300 group-hover:text-red-700 group-hover:scale-105">
                              {currentRoomConfig.pricing.halfDay.price}
                            </p>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block w-px bg-gray-200 transition-colors duration-300 hover:bg-gray-300"></div>
                        <div className="sm:hidden h-px bg-gray-200 transition-colors duration-300 hover:bg-gray-300"></div>

                        {/* Full Day Package */}
                        <div className="flex items-center space-x-4 flex-1 group">
                          <div className="w-14 h-14 lg:w-16 lg:h-16 bg-red-900 rounded-full flex flex-col items-center justify-center text-white flex-shrink-0 transition-all duration-300 group-hover:bg-red-800 group-hover:scale-110 lg:group-hover:scale-105">
                            <h3 className="font-bold text-md lg:text-lg leading-none transition-transform duration-300 group-hover:scale-110">
                              {currentRoomConfig.pricing.fullDay.hours}
                            </h3>
                            <p className="text-sm lg:text-sm font-medium">
                              hours
                            </p>
                          </div>

                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1 text-[11px] lg:text-base transition-colors duration-300 group-hover:text-red-900">
                              FULL DAY
                            </h4>
                            <p className="text-red-600 font-bold text-lg lg:text-xl transition-all duration-300 group-hover:text-red-700 group-hover:scale-105">
                              {currentRoomConfig.pricing.fullDay.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Responsive Calendar - Visible only on mobile/tablet (lg:hidden) */}
              <div className="lg:hidden">
                <CalendarComponent />
              </div>

              {/* Features */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Ideal For
                </h3>
                <div className="space-y-3">
                  {roomFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: roomConfig.color }}
                      ></div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              {/* Updated Amenities Section with Room Description at Top */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Room Description - Above amenities */}
                <div className="mb-6">
                  <p className="text-gray-600 text-xl text-center font-bold pb-6 leading-relaxed">
                    {currentRoomConfig.description}
                  </p>
                </div>

                {/* Combined Amenities */}
                <div className="space-y-4">
                  {roomAmenities.map((amenity, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0"
                        style={{ backgroundColor: roomConfig.color }}
                      >
                        {amenity.icon === "Users" && (
                          <Users className="w-5 h-5" />
                        )}
                        {amenity.icon === "Star" && (
                          <Star className="w-5 h-5" />
                        )}
                        {amenity.icon === "Wifi" && (
                          <Wifi className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {amenity.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {amenity.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Calendar (Desktop only) */}
            <div className="hidden lg:block space-y-6">
              <CalendarComponent />
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        <BookingModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          day={selectedDay}
          onBookNow={handleBookNow}
          roomConfig={roomConfig}
        />
      </div>
      <Footer />
    </>
  );
};

export default DynamicRoomBooking;
