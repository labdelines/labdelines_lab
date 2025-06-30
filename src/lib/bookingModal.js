import React from "react";
import { Calendar, Clock, X, Sun } from "lucide-react";

// Import configuration and utilities
import { CONFIG } from "./config.js";
import { CalendarUtils } from "./calendar.js";

/**
 * BookingCard Component - Helper component for displaying booking details
 */
const BookingCard = ({ booking, isWarning }) => (
  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
    {booking.time && (
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="font-medium text-gray-900 text-sm">Time</span>
        </div>
        <p className="text-gray-700 ml-6 text-sm">{booking.time}</p>
      </div>
    )}

    {booking.duration && (
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="font-medium text-gray-900 text-sm">Duration</span>
        </div>
        <p className="text-gray-700 ml-6 text-sm">{booking.duration}</p>
      </div>
    )}

    <div>
      <div className="flex items-center space-x-2 mb-2">
        <div
          className={`w-3 h-3 rounded-full ${
            isWarning ? "bg-yellow-500" : "bg-red-500"
          }`}
        ></div>
        <span className="font-medium text-gray-900 text-sm">Status</span>
      </div>
      <p className="text-gray-700 ml-5 text-sm">
        {CONFIG.STATUS_RULES.displayText[booking.status] ||
          booking.status ||
          "Confirmed"}
      </p>
    </div>
  </div>
);

/**
 * BookingModal Component
 * Displays booking details and allows users to book available dates
 *
 * @param {boolean} isOpen - Whether the modal is open
 * @param {function} onClose - Function to close the modal
 * @param {object} day - Day object containing booking information
 * @param {function} onBookNow - Function to handle booking action
 * @param {object} roomConfig - Room configuration object
 */
const BookingModal = ({ isOpen, onClose, day, onBookNow, roomConfig }) => {
  // Don't render if modal is closed or no day selected
  if (!isOpen || !day) return null;

  const categorizeBookings = (bookings) => {
    const morning = [];
    const afternoon = [];
    const fullDay = [];

    bookings.forEach((booking) => {
      const [startHour] = booking.time
        ? booking.time.split("-")[0].trim().split(":").map(Number)
        : [null];

      const [endHour] = booking.time
        ? booking.time.split("-")[1].trim().split(":").map(Number)
        : [null];

      if (startHour !== null && endHour !== null) {
        if (startHour < 12 && endHour > 12) {
          fullDay.push(booking);
        } else if (startHour < 12) {
          morning.push(booking);
        } else {
          afternoon.push(booking);
        }
      } else {
        fullDay.push(booking); // fallback
      }
    });

    return { morning, afternoon, fullDay };
  };

  // Determine day status
  const isAvailable = day.status === "available";
  const isWarning = day.status === "warning";
  const isBooked = day.status === "booked";

  // Get theme colors based on status and room type
  const getStatusTheme = () => {
    if (isAvailable) {
      // Use room-specific colors for available dates
      if (roomConfig.displayName.toLowerCase().includes("event space")) {
        return {
          bgColor: "bg-green-50",
          textColor: "text-green-900",
          badgeColor: "bg-yellow-100",
          badgeTextColor: "text-green-800",
        };
      } else {
        return {
          bgColor: "bg-red-50",
          textColor: "text-green-900",
          badgeColor: "bg-yellow-100",
          badgeTextColor: "text-green-800",
        };
      }
    } else if (isWarning) {
      return {
        bgColor: "bg-yellow-400",
        textColor: "text-gray-800",
        badgeColor: "bg-yellow-100",
        badgeTextColor: "text-yellow-800",
      };
    } else {
      return {
        bgColor: "bg-red-700",
        textColor: "text-white",
        badgeColor: "bg-red-100",
        badgeTextColor: "text-red-800",
      };
    }
  };

  const theme = getStatusTheme();

  // Get status title based on room type
  const getStatusTitle = () => {
    if (isAvailable) {
      return roomConfig.displayName.toLowerCase().includes("event space")
        ? "Available Date"
        : "Available Date";
    }
    if (isWarning) {
      return roomConfig.displayName.toLowerCase().includes("event space")
        ? "Warning - Event In Progress"
        : "Warning - In Progress";
    }
    return "Already Booked";
  };

  // Get room capacity info based on room type
  const getRoomCapacity = () => {
    switch (roomConfig.displayName.toLowerCase()) {
      case "focus capsule":
        return "2-5 people";
      case "share hives":
        return "6-12 people";
      case "think tank":
        return "12-25 people";
      case "underlines":
        return "30-70 people";
      case "event space (outdoor)":
        return "50+ people";
      default:
        return "Professional capacity";
    }
  };

  // Get room details based on room type
  const getRoomDetails = () => {
    const capacity = getRoomCapacity();
    const roomType = roomConfig.displayName.toLowerCase();

    if (roomType.includes("event space")) {
      return [
        `Capacity: ${capacity}`,
        "Outdoor venue perfect for large events",
        "Flexible setup options available",
        "Catering and AV services included",
        "Weather protection options available",
      ];
    } else if (roomType.includes("underlines")) {
      return [
        `Capacity: ${capacity}`,
        "Multiple conference setups available",
        "Professional AV equipment",
        "Sound system with microphones",
        "Enterprise-grade connectivity",
      ];
    } else {
      return [
        `Capacity: ${capacity}`,
        roomConfig.description,
        "High-speed Wi-Fi included",
        "Professional workspace environment",
      ];
    }
  };

  // Get button text based on room type
  const getButtonText = () => {
    return roomConfig.displayName.toLowerCase().includes("event space")
      ? "Book Event"
      : CONFIG.CALENDAR.availableButtonText;
  };

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`p-6 rounded-t-lg ${theme.bgColor}`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-semibold ${theme.textColor}`}>
              {getStatusTitle()}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-white hover:bg-opacity-50"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 " />
            </button>
          </div>

          {/* Room name badge */}
          <div className="mt-3">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${theme.badgeColor} ${theme.badgeTextColor}`}
            >
              {roomConfig.displayName}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Date Information */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-900">Date</span>
            </div>
            <p className="text-gray-700 ml-7 font-medium">
              {CalendarUtils.formatDate(day.dateString)}
            </p>
          </div>

          {/* Available Date Content */}
          {isAvailable && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${theme.badgeColor}`}>
                <p className={`text-sm ${theme.badgeTextColor}`}>
                  This date is available for booking.
                </p>
              </div>

              {/* Special notice for Event Space */}
              {roomConfig.displayName.toLowerCase().includes("event space") && (
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <div className="flex items-center text-yellow-800">
                    <Sun className="w-4 h-4 mr-2" />
                    <span className="text-xs font-medium">
                      Available daily: 8:00 AM - 8:00 PM
                    </span>
                  </div>
                  <p className="text-xs text-yellow-700 mt-1">
                    Extended hours available upon request for special events
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Booked/Warning Date Content */}
          {!isAvailable && (
            <div className="space-y-4">
              {(() => {
                const { morning, afternoon, fullDay } = categorizeBookings(
                  day.bookings
                );

                return (
                  <>
                    {morning.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          🌅 Morning Bookings
                        </h4>
                        {morning.map((booking, index) => (
                          <BookingCard
                            key={`morning-${index}`}
                            booking={booking}
                            isWarning={isWarning}
                          />
                        ))}
                      </div>
                    )}

                    {afternoon.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          🌇 Afternoon Bookings
                        </h4>
                        {afternoon.map((booking, index) => (
                          <BookingCard
                            key={`afternoon-${index}`}
                            booking={booking}
                            isWarning={isWarning}
                          />
                        ))}
                      </div>
                    )}

                    {fullDay.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          🕛 Full Day Bookings
                        </h4>
                        {fullDay.map((booking, index) => (
                          <BookingCard
                            key={`fullday-${index}`}
                            booking={booking}
                            isWarning={isWarning}
                          />
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <div className="flex space-x-3">
            {isAvailable && (
              <button
                onClick={() => {
                  onBookNow();
                  onClose();
                }}
                className="flex-1 bg-red-900 hover:bg-red-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>{getButtonText()}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
