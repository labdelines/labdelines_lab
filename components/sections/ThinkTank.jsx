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
} from "lucide-react";

// Import configuration and utilities
import { CONFIG } from "@/src/lib/config.js";
import {
  CalendarUtils,
  BookingUtils,
  NavigationUtils,
  RoomFeatures,
  RoomAmenities,
} from "@/src/lib/calendar.js";

import Image from "next/image";
import think_tank from "@/public/assets/think_tank.jpg";

// Import the separated modal component
import BookingModal from "@/src/lib/bookingModal.js";

const ThinkTank = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  // Get room configuration
  const roomConfig = BookingUtils.getRoomConfig("think tank");
  const roomFeatures = RoomFeatures["think tank"] || [];
  const roomAmenities = RoomAmenities["think tank"] || [];

  // Load booking data
  const loadBookingData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log("Loading Think Tank booking data...");
      const allBookings = await BookingUtils.loadBookingData();

      // Filter for Think Tank bookings only (excluding 4th floor)
      const thinkTankBookings = allBookings
        .filter((booking) => {
          const roomName = booking.room ? booking.room.toLowerCase() : "";
          return (
            roomName.includes("think tank") && !roomName.includes("4th floor")
          );
        })
        .map((booking) => ({
          room: booking.room,
          date: booking.date,
          time: booking.time || "",
          status: booking.status || "",
        }));

      setBookings(thinkTankBookings);
      console.log("Think Tank bookings loaded:", thinkTankBookings.length);
    } catch (error) {
      console.error("Error loading booking data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadBookingData();
  }, []);

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

  // Generate calendar data
  const calendarDays = CalendarUtils.generateCalendarDays(
    currentYear,
    currentMonth,
    bookings,
    "think tank"
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
          <div
            className="inline-block px-4 py-2 rounded-lg text-white font-bold text-lg mb-2"
            style={{ backgroundColor: roomConfig.color }}
          >
            {roomConfig.displayName.toUpperCase()} - Calendar {currentYear}
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
            {roomConfig.displayName.toUpperCase()}
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
              <div className="text-xs text-gray-500">Bookings</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-8 bg-gray-300 rounded animate-pulse mb-1"></div>
              <div className="text-xs text-gray-500">Available</div>
            </div>
          </>
        ) : (
          // Actual stats
          <>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {stats.totalBookings}
              </div>
              <div className="text-xs text-gray-500">Bookings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">
                {stats.availableDays}
              </div>
              <div className="text-xs text-gray-500">Available</div>
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
          <ArrowLeft className="w-4 h-4" />
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
                    {/* Booking Time Visual Indicators */}
                    {day.bookings.length > 0 &&
                      (() => {
                        const times = day.bookings.map((b) => {
                          if (!b.time || b.time.trim() === "") return "full";

                          try {
                            // Handle time ranges like "09:00-16:00"
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

                            // Check if it's a full day booking (spans across noon)
                            if (startHour < 12 && endHour > 12) return "full";

                            // Check if it's morning or afternoon
                            if (startHour < 12) return "morning";
                            if (startHour >= 12) return "afternoon";

                            return "full";
                          } catch (error) {
                            console.log("Error parsing time:", b.time, error);
                            return "full";
                          }
                        });

                        const unique = [...new Set(times)];
                        const hasMorning = unique.includes("morning");
                        const hasAfternoon = unique.includes("afternoon");
                        const hasFull = unique.includes("full");

                        console.log(
                          "Day",
                          day.date,
                          "- Times:",
                          times,
                          "- Unique:",
                          unique,
                          "- Has full:",
                          hasFull
                        );

                        if (hasFull) {
                          // Full day booking - entire cell
                          return (
                            <div
                              className={`absolute inset-0 ${
                                isWarning
                                  ? "bg-yellow-500 hover:bg-yellow-600"
                                  : "bg-red-500 hover:bg-red-600"
                              } transition-colors duration-200`}
                            />
                          );
                        } else if (hasMorning && hasAfternoon) {
                          // Both morning and afternoon - split cell
                          return (
                            <>
                              <div
                                className={`absolute top-0 left-0 right-0 h-1/2 ${
                                  isWarning ? "bg-yellow-500" : "bg-red-500"
                                } transition-colors duration-200`}
                              />
                              <div
                                className={`absolute bottom-0 left-0 right-0 h-1/2 ${
                                  isWarning ? "bg-yellow-500" : "bg-red-500"
                                } transition-colors duration-200`}
                              />
                            </>
                          );
                        } else if (hasMorning) {
                          // Morning only - top half
                          return (
                            <div
                              className={`absolute top-0 left-0 right-0 h-1/2 ${
                                isWarning ? "bg-yellow-500" : "bg-red-500"
                              } transition-colors duration-200`}
                            />
                          );
                        } else if (hasAfternoon) {
                          // Afternoon only - bottom half
                          return (
                            <div
                              className={`absolute bottom-0 left-0 right-0 h-1/2 ${
                                isWarning ? "bg-yellow-500 " : "bg-red-500"
                              } transition-colors duration-200`}
                            />
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
      <div className="flex justify-center space-x-3 mt-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gray-100 rounded"></div>
          <span className="text-gray-600">Available</span>
        </div>
        {/* divider */}
        <div className="w-px h-4 bg-gray-300"></div>

        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span className="text-gray-600">Warning</span>
        </div>

        {/* divider */}
        <div className="w-px h-4 bg-gray-300"></div>

        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-gray-600">Booked</span>
        </div>
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
    <div className="min-h-screen pt-10 bg-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Workspace Details */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in-point">
            {/* Workspace Image and Title */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-[310px] lg:h-[500px] bg-gradient-to-br from-amber-100 to-orange-200 relative ">
                <Image
                  src={think_tank}
                  alt="share-hives"
                  className="w-full h-[310px] lg:h-[500px] object-cover"
                  priority
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 uppercase">
                    {roomConfig.displayName}
                  </h2>
                  <div className="flex items-center space-x-2 text-sm font-medium text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>12-25</span>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {roomConfig.description}. A space for turning ideas into
                  action through brainstorming, planning, and meetings for 12 to
                  25 people.
                </p>
                <div className="bg-white rounded-lg shadow-sm p-4 mt-4 mb-3 transition-all duration-300 hover:shadow-md">
                  <div className="flex flex-col sm:flex-row gap-2">
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
                          1,150,000 LAK
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
                          2,300,000 LAK
                        </p>
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
            <div className="space-y-4">
              {roomAmenities.map((amenity, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: roomConfig.color }}
                    >
                      {amenity.icon === "Users" && (
                        <Users className="w-5 h-5" />
                      )}
                      {amenity.icon === "Monitor" && (
                        <Monitor className="w-5 h-5" />
                      )}
                      {amenity.icon === "Wifi" && <Wifi className="w-5 h-5" />}
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
                </div>
              ))}
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
  );
};

export default ThinkTank;
