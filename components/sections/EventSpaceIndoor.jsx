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
  Calendar,
  Coffee,
  Tent,
  Sun,
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

// Import Next Image
import Image from "next/image";

// Import Image
import Event from "@/public/assets/PastExp/wall_street.jpg";

// Import the separated modal component
import BookingModal from "@/src/lib/bookingModal.js";

const EventSpaceIndoor = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  // Get room configuration
  const roomConfig = BookingUtils.getRoomConfig("event space indoor");
  const roomFeatures = RoomFeatures["event space"] || [];
  const roomAmenities = RoomAmenities["event space"] || [];

  // Load booking data
  const loadBookingData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log("Loading Event Space booking data...");
      const allBookings = await BookingUtils.loadBookingData();

      // Filter for Event Space bookings (including lab de lines for events)
      const eventSpaceBookings = allBookings
        .filter((booking) => {
          const roomName = booking.room ? booking.room.toLowerCase() : "";
          return (
            roomName === "event space indoor" || roomName === "lab de lines"
          );
        })
        .map((booking) => ({
          room: booking.room,
          date: booking.date,
          time: booking.time || "",
          status: booking.status || "",
        }));

      setBookings(eventSpaceBookings);
      console.log("Event Space bookings loaded:", eventSpaceBookings.length);
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
    "event space"
  );
  const weeks = CalendarUtils.groupIntoWeeks(calendarDays);
  const stats = CalendarUtils.calculateStats(
    calendarDays,
    bookings,
    currentYear,
    currentMonth
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Workspace Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Workspace Image and Title */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Image */}
              <div className="h-[310px] lg:h-100 bg-gradient-to-br from-amber-100 to-orange-200 relative ">
                <Image
                  src={Event}
                  alt="share-hives"
                  className="w-full h-[310px] object-cover"
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
                    <span>50+</span>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {roomConfig.description}
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
                          550 USD
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
                          1,100 USD
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

            {/* Event Calendar - Visible only on smaller screens (lg:hidden) */}
            <div className="lg:hidden bg-white rounded-lg shadow-sm p-6">
              <div className="text-center mb-6">
                <div
                  className="inline-block px-4 py-2 rounded-lg text-white font-bold text-xl"
                  style={{ backgroundColor: roomConfig.color }}
                >
                  {roomConfig.displayName.toUpperCase()}
                </div>
                <p className=" text-sm text-gray-900 mt-2">
                  Event Calendar {currentYear}
                </p>
              </div>

              {/* Calendar Stats */}
              <div className="flex items-center justify-center space-x-8 mb-6">
                {isLoading ? (
                  // Skeleton for stats
                  <>
                    <div className="text-center">
                      <div className="w-12 h-8 bg-gray-300 rounded animate-pulse mb-1"></div>
                      <div className="text-xs text-gray-500">Events</div>
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
                      <div className="text-xs text-gray-500">Events</div>
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
                              hasBooking
                                ? isWarning
                                  ? "bg-yellow-500 hover:bg-yellow-600"
                                  : "bg-red-500 hover:bg-red-600"
                                : isAvailable
                                ? "bg-white hover:bg-green-200"
                                : "hover:bg-gray-50"
                            }`}
                            onClick={() => handleDateClick(day)}
                            title={
                              day.bookings.length > 0
                                ? `${day.bookings.length} event(s) - Click for details`
                                : "Available - Click to book"
                            }
                          >
                            <div className="p-1">
                              <div
                                className={`text-xs font-medium ${
                                  hasBooking
                                    ? "text-white"
                                    : isAvailable
                                    ? "text-green-700"
                                    : "text-gray-900"
                                }`}
                              >
                                {day.date}
                              </div>

                              {hasBooking && (
                                <div
                                  className={`absolute bottom-1 left-1 right-1 h-1 rounded ${
                                    isWarning ? "bg-yellow-300" : "bg-red-300"
                                  }`}
                                ></div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Legend */}
              <div className="flex justify-center space-x-4 mt-4 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-gray-600">Booked</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                  <span className="text-gray-600">In Progress</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-gray-100 rounded"></div>
                  <span className="text-gray-600">Available</span>
                </div>
              </div>

              {/* Book Now Button */}
              <button
                onClick={handleBookNow}
                className="w-full mt-6 bg-red-900 hover:bg-red-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                {CONFIG.CALENDAR.availableButtonText} Event Space via WhatsApp
              </button>
            </div>

            {/* Operating Hours */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Operating Hours
              </h3>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center text-yellow-800">
                  <Sun className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">
                    Available daily: 8:00 AM - 8:00 PM
                  </span>
                </div>
                <p className="text-xs text-yellow-700 mt-1">
                  Extended hours available upon request for special events
                </p>
              </div>
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
                      {amenity.icon === "Calendar" && (
                        <Calendar className="w-5 h-5" />
                      )}
                      {amenity.icon === "Coffee" && (
                        <Coffee className="w-5 h-5" />
                      )}
                      {amenity.icon === "Tent" && <Tent className="w-5 h-5" />}
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

          {/* Right Column - Calendar and Contact Information */}
          <div className="space-y-6">
            {/* Event Calendar - Visible only on larger screens (hidden lg:block) */}
            <div className="hidden lg:block bg-white rounded-lg shadow-sm p-6">
              <div className="text-center mb-6">
                <div
                  className="inline-block px-4 py-2 rounded-lg text-white font-bold text-l"
                  style={{ backgroundColor: roomConfig.color }}
                >
                  {roomConfig.displayName.toUpperCase()} - Calendar{" "}
                  {currentYear}
                </div>
                <p className=" text-sm text-gray-900 mt-2">
                  (View available rooms)
                </p>
              </div>

              {/* Calendar Stats */}
              <div className="flex items-center justify-center space-x-8 mb-6">
                {isLoading ? (
                  // Skeleton for stats
                  <>
                    <div className="text-center">
                      <div className="w-12 h-8 bg-gray-300 rounded animate-pulse mb-1"></div>
                      <div className="text-xs text-gray-500">Events</div>
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
                      <div className="text-xs text-gray-500">Events</div>
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
                              hasBooking
                                ? isWarning
                                  ? "bg-yellow-500 hover:bg-yellow-600"
                                  : "bg-red-500 hover:bg-red-600"
                                : isAvailable
                                ? "bg-white hover:bg-green-200"
                                : "hover:bg-gray-50"
                            }`}
                            onClick={() => handleDateClick(day)}
                            title={
                              day.bookings.length > 0
                                ? `${day.bookings.length} event(s) - Click for details`
                                : "Available - Click to book"
                            }
                          >
                            <div className="p-1">
                              <div
                                className={`text-xs font-medium ${
                                  hasBooking
                                    ? "text-white"
                                    : isAvailable
                                    ? "text-green-700"
                                    : "text-gray-900"
                                }`}
                              >
                                {day.date}
                              </div>

                              {hasBooking && (
                                <div
                                  className={`absolute bottom-1 left-1 right-1 h-1 rounded ${
                                    isWarning ? "bg-yellow-300" : "bg-red-300"
                                  }`}
                                ></div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Legend */}
              <div className="flex justify-center space-x-4 mt-4 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-gray-600">Booked</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                  <span className="text-gray-600">In Progress</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-gray-100 rounded"></div>
                  <span className="text-gray-600">Available</span>
                </div>
              </div>

              {/* Book Now Button */}
              <button
                onClick={handleBookNow}
                className="w-full mt-6 bg-red-900 hover:bg-red-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                {CONFIG.CALENDAR.availableButtonText} Event Space via WhatsApp
              </button>
            </div>
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

export default EventSpaceIndoor;
