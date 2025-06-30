// Calendar utility functions and components
import { CONFIG } from "./config.js";

// Calendar utilities
export class CalendarUtils {
  // Month names array
  static getMonthName(monthIndex) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthIndex];
  }

  // Days of week
  static getDaysOfWeek() {
    return ["S", "M", "T", "W", "T", "F", "S"];
  }

  // Format date for display
  static formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Generate calendar days for a specific month/year
  static generateCalendarDays(year, month, bookings, roomType) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;

      // Find bookings for this date and room type
      const dayBookings = bookings.filter(
        (booking) =>
          booking.date === dateString &&
          booking.room &&
          booking.room.toLowerCase() === roomType.toLowerCase() &&
          BookingUtils.shouldDisplayBooking(booking.status)
      );

      let status = "available";
      if (dayBookings.length > 0) {
        // Check if any booking is in progress
        const hasInProgress = dayBookings.some(
          (booking) =>
            booking.status && booking.status.toLowerCase().includes("progress")
        );

        status = hasInProgress ? "warning" : "booked";
      }

      days.push({
        date: day,
        status: status,
        bookings: dayBookings,
        dateString: dateString,
      });
    }
    // Fill remaining slots to complete the last week (7-day row)
    const totalCells = days.length;
    const remainder = totalCells % 7;
    if (remainder !== 0) {
      const slotsToAdd = 7 - remainder;
      for (let i = 0; i < slotsToAdd; i++) {
        days.push(null);
      }
    }

    return days;
  }

  // Group calendar days into weeks
  static groupIntoWeeks(calendarDays) {
    const weeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }
    return weeks;
  }

  // Calculate calendar statistics
  static calculateStats(calendarDays, bookings, year, month) {
    const currentMonthBookings = bookings.filter((booking) => {
      const bookingDate = new Date(booking.date);
      return (
        bookingDate.getFullYear() === year &&
        bookingDate.getMonth() === month &&
        BookingUtils.shouldDisplayBooking(booking.status)
      );
    });

    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    const bookedDays = calendarDays.filter(
      (day) => day && day.status !== "available"
    ).length;
    const availableDays = totalDaysInMonth - bookedDays;

    return {
      totalBookings: currentMonthBookings.length,
      bookedDays,
      availableDays,
      totalDaysInMonth,
    };
  }
}

// Booking-related utilities
export class BookingUtils {
  // Check if booking should be displayed based on status
  static shouldDisplayBooking(status) {
    if (!status || status.trim() === "") return true;

    const lowerStatus = status.toLowerCase();

    // Hide completed and cancelled bookings
    if (
      CONFIG.STATUS_RULES?.hidden?.some((hidden) =>
        lowerStatus.includes(hidden)
      )
    ) {
      return false;
    }

    return true;
  }

  // Load booking data from Google Script or fallback to sample data
  static async loadBookingData() {
    try {
      console.log("Loading booking data...");

      const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Clean and validate the data
      const cleanedBookings = data
        .filter((booking) => {
          // Filter out invalid dates
          return (
            booking.date &&
            booking.date !== "undefined-undefined-Due Date" &&
            booking.date.match(/^\d{4}-\d{2}-\d{2}$/)
          );
        })
        .map((booking) => ({
          room: booking.room ? booking.room.toLowerCase() : "",
          date: booking.date,
          time: booking.time || "",
          status: booking.status || "",
          duration: booking.duration || "",
        }));

      console.log("Bookings loaded successfully:", cleanedBookings.length);
      return cleanedBookings;
    } catch (error) {
      console.error("Error loading booking data:", error);
      console.log("Using sample data as fallback...");
      return CONFIG.SAMPLE_DATA || [];
    }
  }

  // Filter bookings for a specific room
  static filterBookingsForRoom(bookings, roomType) {
    return bookings.filter((booking) => {
      const roomName = booking.room ? booking.room.toLowerCase() : "";
      return (
        roomName.includes(roomType.toLowerCase()) ||
        roomName === roomType.toLowerCase()
      );
    });
  }

  // Get room configuration
  static getRoomConfig(roomType) {
    const roomKey = roomType.toLowerCase();
    return CONFIG.ROOMS?.[roomKey] || CONFIG.ROOMS?.default || {};
  }

  // Open booking URL
  static openBookingUrl() {
    if (typeof window !== "undefined") {
      window.open(CONFIG.COMPANY?.bookingUrl, "_blank");
    }
  }

  // Classify booking time
  static classifyBookingTime(booking) {
    if (!booking.time) return "full-day";

    const timeStr = booking.time.toLowerCase();

    const match = timeStr.match(/(\d{1,2}):?(\d{0,2})\s*(am|pm)?/);
    if (!match) return "full-day";

    let hour = parseInt(match[1]);
    const period = match[3];

    if (period === "pm" && hour !== 12) hour += 12;
    if (period === "am" && hour === 12) hour = 0;

    if (hour < 12) return "morning";
    else return "afternoon";
  }
}

// Navigation utilities
export class NavigationUtils {
  // Handle previous month navigation
  static handlePrevMonth(currentMonth, currentYear) {
    if (currentMonth === 0) {
      return { month: 11, year: currentYear - 1 };
    } else {
      return { month: currentMonth - 1, year: currentYear };
    }
  }

  // Handle next month navigation
  static handleNextMonth(currentMonth, currentYear) {
    if (currentMonth === 11) {
      return { month: 0, year: currentYear + 1 };
    } else {
      return { month: currentMonth + 1, year: currentYear };
    }
  }

  // Analyze booking periods
  static analyzeBookingPeriods(bookings) {
    let hasMorning = false;
    let hasAfternoon = false;
    let hasWarningMorning = false;
    let hasWarningAfternoon = false;

    bookings.forEach((booking) => {
      if (!booking.time) return;

      const timeStr = booking.time.toLowerCase();
      const isWarning =
        booking.status && booking.status.toLowerCase().includes("progress");

      // Extract start time from various formats
      let startHour = null;

      // Handle formats like "09:00-17:00", "9:00 AM - 5:00 PM", etc.
      const timeMatch = timeStr.match(/(\d{1,2}):?(\d{0,2})\s*(am|pm)?/);
      if (timeMatch) {
        let hour = parseInt(timeMatch[1]);
        const minute = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
        const period = timeMatch[3];

        // Convert to 24-hour format
        if (period === "pm" && hour !== 12) {
          hour += 12;
        } else if (period === "am" && hour === 12) {
          hour = 0;
        }

        startHour = hour;
      }

      // Determine if it's morning or afternoon based on start time
      if (startHour !== null) {
        if (startHour < 12) {
          // Morning booking (before 12:00)
          if (isWarning) {
            hasWarningMorning = true;
          } else {
            hasMorning = true;
          }
        } else {
          // Afternoon booking (12:00 and after)
          if (isWarning) {
            hasWarningAfternoon = true;
          } else {
            hasAfternoon = true;
          }
        }
      } else {
        // If we can't parse the time, assume full day
        if (isWarning) {
          hasWarningMorning = true;
          hasWarningAfternoon = true;
        } else {
          hasMorning = true;
          hasAfternoon = true;
        }
      }
    });

    return {
      hasMorning,
      hasAfternoon,
      hasWarningMorning,
      hasWarningAfternoon,
      isFullDay:
        (hasMorning && hasAfternoon) ||
        (hasWarningMorning && hasWarningAfternoon),
      hasAnyWarning: hasWarningMorning || hasWarningAfternoon,
    };
  }
}

// Room-specific features and configurations
export const RoomFeatures = {
  "focus capsule": [
    "Start-up companies needing dedicated office space",
    "Small teams requiring private meeting areas",
    "Freelancers seeking professional work environment",
    "Project-based work requiring focused collaboration",
    "Client meetings in a professional setting",
  ],
  "share hives": [
    "Collaborative team projects",
    "Cross-functional team meetings",
    "Brainstorming sessions",
    "Team building activities",
    "Open workspace collaboration",
  ],
  "think tank": [
    "Strategic planning sessions for teams with flexible arrangements",
    "Theatre-style, U-shape, and classroom configurations available",
    "Innovation workshops and brainstorming sessions",
    "Leadership meetings and decision-making discussions",
    "Presentations with audio-visual equipment support",
  ],
  underlines: [
    "Large-scale corporate events and conferences",
    "Comprehensive training programs and workshops",
    "Executive presentations and board meetings",
    "Multi-day business retreats and seminars",
    "Professional development sessions",
    "Team building events for large groups",
    "Product launches and company announcements",
    "Industry conferences and networking events",
  ],
  "event space": [
    "Corporate team building and outdoor activities",
    "Company picnics and social gatherings",
    "Product launches and outdoor exhibitions",
    "Training workshops and seminars",
    "Cultural events and celebrations",
    "Large-scale conferences and outdoor meetings",
    "Networking events and business mixers",
    "Wedding receptions and private celebrations",
  ],
  "event space indoor": [
    "Corporate events and conferences",
    "Training programs and workshops",
    "Product launches and presentations",
    "Private dining and celebrations",
    "Executive meetings and retreats",
  ],
  "event space outdoor": [
    "Corporate team building activities",
    "Wedding receptions and celebrations",
    "Outdoor exhibitions and fairs",
    "Cultural events and festivals",
    "Large-scale networking events",
  ],
};

// Room amenities configuration
export const RoomAmenities = {
  "focus capsule": [
    {
      icon: "Users",
      title: "Small Team Capacity",
      description:
        "Perfect for 2-5 people teams requiring private workspace for focused collaboration and productivity.",
    },
    {
      icon: "Monitor",
      title: "Equipment",
      description:
        "Whiteboards for brainstorming and planning, ensuring productive meetings and creative sessions.",
    },
    {
      icon: "Wifi",
      title: "Stable Wi-Fi",
      description:
        "Stay connected and get things done seamlessly with reliable high-speed internet connection.",
    },
  ],
  "share hives": [
    {
      icon: "Users",
      title: "Team Collaboration",
      description:
        "Open workspace designed for teams of 6-12 people working on collaborative projects.",
    },
    {
      icon: "Monitor",
      title: "Shared Resources",
      description:
        "Multiple workstations, shared whiteboards, and presentation equipment for team productivity.",
    },
    {
      icon: "Wifi",
      title: "High-Speed Internet",
      description:
        "Reliable connectivity to support multiple users and collaborative online work.",
    },
  ],
  "think tank": [
    {
      icon: "Users",
      title: "Flexible Seating Arrangements",
      description:
        "U-shaped configuration, Horseback style seating (70 people max), Theater-style seating, Classroom-style seating for groups of 12-25 people.",
    },
    {
      icon: "Monitor",
      title: "Presentation Equipment",
      description:
        "Speaker set, Projector, Whiteboard for capturing ideas and strategies, plus drinking water for extended sessions.",
    },
    {
      icon: "Wifi",
      title: "Inspiring Environment",
      description:
        "Modern furniture and bright windows create a stimulating atmosphere with stable Wi-Fi to stay connected throughout your sessions.",
    },
  ],
  underlines: [
    {
      icon: "Users",
      title: "Large-Scale Capacity",
      description:
        "Accommodates 30-70 people with multiple seating configurations: U-Shape (30-40), Long Table Conference (25-35), Boardroom Style (20-30), Hollow Square (35-45), Classroom Style (50-70), Theater Style (60-70).",
    },
    {
      icon: "Monitor",
      title: "Professional AV Equipment",
      description:
        "Large projection screen with 4K projector for professional presentations, visual content, and multimedia displays suitable for large audiences.",
    },
    {
      icon: "Volume2", // Changed to Volume2 for sound system
      title: "Sound System & Microphones",
      description:
        "Professional sound system with wireless microphones ensuring clear audio throughout the facility for presentations, training sessions, and conferences.",
    },
    {
      icon: "Wifi",
      title: "Enterprise-Grade Connectivity",
      description:
        "High-speed, reliable internet connection capable of supporting large groups, streaming requirements, and simultaneous device connections for corporate events.",
    },
  ],
  "event space": [
    {
      icon: "Users",
      title: "Large-Scale Outdoor Capacity",
      description:
        "Accommodates 50+ people with flexible setup options: Open lawn setup for large gatherings (100+ people), tent and canopy arrangements, stage setups, banquet configurations, and activity zones.",
    },
    {
      icon: "Calendar",
      title: "Event Setup Services",
      description:
        "Professional event planning, table and chair arrangements, stage setup, decorations, and complete event coordination for all types of outdoor events.",
    },
    {
      icon: "Coffee",
      title: "Catering Services",
      description:
        "Full catering options, beverage stations, outdoor kitchen facilities, and dining setups for events of all sizes with professional service staff.",
    },
    {
      icon: "Monitor",
      title: "Audio-Visual Equipment",
      description:
        "Portable sound systems, wireless microphones, outdoor screens, professional lighting, and multimedia equipment for presentations and entertainment.",
    },
    {
      icon: "Users",
      title: "Weather Protection",
      description:
        "Tent rentals, canopies, covered seating areas, backup indoor options, and weather contingency planning for year-round event hosting.",
    },
    {
      icon: "Wifi",
      title: "Outdoor Wi-Fi Coverage",
      description:
        "Extended wireless network coverage throughout the event space ensuring reliable connectivity for all attendees and event requirements.",
    },
  ],
  "event space indoor": [
    {
      icon: "Users",
      title: "Large Indoor Capacity",
      description:
        "Climate-controlled indoor space accommodating 50-200 people with flexible seating arrangements and multiple layout options.",
    },
    {
      icon: "Monitor",
      title: "Professional AV Equipment",
      description:
        "State-of-the-art sound system, 4K projection, professional lighting, and multimedia equipment for presentations and entertainment.",
    },
    {
      icon: "Wifi",
      title: "Enterprise Connectivity",
      description:
        "High-speed internet, robust Wi-Fi coverage, and technical support throughout your indoor event.",
    },
  ],
  "event space outdoor": [
    {
      icon: "Users",
      title: "Outdoor Event Capacity",
      description:
        "Beautiful outdoor setting for 50-300 guests with garden views, flexible setup options, and weather contingency planning.",
    },
    {
      icon: "Calendar",
      title: "Complete Event Services",
      description:
        "Full event planning, catering coordination, tent rentals, decorations, and professional event management staff.",
    },
    {
      icon: "Wifi",
      title: "Extended Wi-Fi Coverage",
      description:
        "Reliable wireless network coverage throughout outdoor areas with backup connectivity solutions.",
    },
  ],
};

// ===============================
// LEGACY EXPORTS FOR COMPATIBILITY
// ===============================

// Export individual functions that might be imported directly
export const getDaysOfWeek = CalendarUtils.getDaysOfWeek;
export const getMonthName = CalendarUtils.getMonthName;
export const formatDate = CalendarUtils.formatDate;
export const generateCalendarDays = CalendarUtils.generateCalendarDays;
export const groupIntoWeeks = CalendarUtils.groupIntoWeeks;
export const calculateStats = CalendarUtils.calculateStats;

// Booking utilities exports
export const shouldDisplayBooking = BookingUtils.shouldDisplayBooking;
export const loadBookingData = BookingUtils.loadBookingData;
export const fetchBookingData = BookingUtils.loadBookingData; // Alias
export const filterBookingsForRoom = BookingUtils.filterBookingsForRoom;
export const getRoomConfig = BookingUtils.getRoomConfig;
export const openBookingUrl = BookingUtils.openBookingUrl;
export const classifyBookingTime = BookingUtils.classifyBookingTime;

// Navigation utilities exports
export const handlePrevMonth = NavigationUtils.handlePrevMonth;
export const handleNextMonth = NavigationUtils.handleNextMonth;
export const getPrevMonth = NavigationUtils.handlePrevMonth; // Alias
export const getNextMonth = NavigationUtils.handleNextMonth; // Alias
export const analyzeBookingPeriods = NavigationUtils.analyzeBookingPeriods;

// Default export for convenience
export default {
  CalendarUtils,
  BookingUtils,
  NavigationUtils,
  RoomFeatures,
  RoomAmenities,
  // Legacy function exports
  getDaysOfWeek,
  getMonthName,
  formatDate,
  generateCalendarDays,
  groupIntoWeeks,
  calculateStats,
  shouldDisplayBooking,
  loadBookingData,
  fetchBookingData,
  filterBookingsForRoom,
  getRoomConfig,
  openBookingUrl,
  classifyBookingTime,
  handlePrevMonth,
  handleNextMonth,
  getPrevMonth,
  getNextMonth,
  analyzeBookingPeriods,
};
