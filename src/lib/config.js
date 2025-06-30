// Configuration file for the booking calendar

// Import room images
import SharedHives from "@/public/assets/sharedhives.png";
import FocusCapsule from "@/public/assets/focus_capsule.jpg";
import ThinkTank from "@/public/assets/think_tank.jpg";
import Underlines from "@/public/assets/underlines.png";
import Indoor from "@/public/assets/PastExp/wall_street.jpg";
import Outdoor from "@/public/assets/PastExp/wedding_img.jpg";

const CONFIG = {
  // Google Apps Script URL - Update this with your actual script URL
  GOOGLE_SCRIPT_URL:
    "https://script.google.com/macros/s/AKfycby0uT3V2Exr8UlxiqKUv9LDPdWUlJN-KLJ-7Flu8HL7KETjVrKTdA8nM5DiBN8TimgUYA/exec",

  // Company information
  COMPANY: {
    name: "LABDELINES",
    logo: "https://lh3.googleusercontent.com/d/1SiF1vhsULNLQLoS-TT1OoQ2cOXVJRWHm",
    bookingUrl: "https://wa.me/85602052242244",

    // Contact information
    contact: {
      phone: "+856 20 52 242 244",
      phoneDisplay: "+856 20 52 242 244",
      email: "info@labdelines.com", // Add if needed
    },

    // Location information
    location: {
      address: "Don Nokkhoum Village",
      city: "Vientiane",
      country: "Laos",
      fullAddress: "Don Nokkhoum Village, Vientiane, Laos",
      // Add coordinates if needed for maps
      coordinates: {
        lat: null,
        lng: null,
      },
    },
  },

  // Room configuration
  ROOMS: {
    sharedhives: {
      key: "share hives",
      displayName: "SHARED HIVE",
      description: "Co-working Space and Cafe",
      image: SharedHives,
      capacity: "6-12",
      color: "#6b7280", // gray-500

      pricing: {
        halfDay: { hours: 4, price: "800,000 LAK" },
        fullDay: { hours: 8, price: "1,500,000 LAK" },
      },
    },
    focus_capsule: {
      key: "focus capsule",
      displayName: "FOCUS CAPSULE",
      description:
        "Small dedicated room designed for focused work sessions and small team collaboration. Perfect for groups of 2-5 people seeking privacy and productivity.",
      image: FocusCapsule,
      capacity: "2-5",
      color: "#6b7280", // gray-500

      pricing: {
        halfDay: { hours: 4, price: "600,000 LAK" },
        fullDay: { hours: 8, price: "1,100,000 LAK" },
      },
    },
    think_tank: {
      key: "think tank",
      displayName: "THINK TANK",
      description:
        "Fuel your next brainstorm in our dedicated Think Tank meeting room. This adaptable space transforms to suit your needs, fostering focused brainstorming, strategic planning, and productive meetings for groups of 12 up to 25 people.",
      image: ThinkTank,
      capacity: "12-25",
      color: "#6b7280", // gray-500

      pricing: {
        halfDay: { hours: 4, price: "1,150,000 LAK" },
        fullDay: { hours: 8, price: "2,300,000 LAK" },
      },
    },
    underlines: {
      key: "underlines",
      displayName: "UNDERLINES",
      description:
        "A large-scale conference and workshop facility designed for comprehensive corporate events, training sessions, and collaborative gatherings.",
      image: Underlines,
      capacity: "30-70",
      color: "#6b7280", // gray-500

      pricing: {
        halfDay: { hours: 4, price: "2,500,000 LAK" },
        fullDay: { hours: 8, price: "3,300,000 LAK" },
      },
    },
    event_space_indoor: {
      key: "event space indoor",
      displayName: "INDOOR SPACE",
      description:
        "A dynamic indoor venue that seamlessly blends the creative energy of our co-working environment with professional event capabilities. This space transforms from a bustling workspace into an intimate event venue, perfect for launches, networking events, and cultural gatherings.",
      image: Indoor,
      capacity: "30-50",
      color: "#6b7280", // gray-500

      pricing: {
        halfDay: { hours: 4, price: "550 USD" },
        fullDay: { hours: 8, price: "1,100 USD" },
      },
    },
    event_space_outdoor: {
      key: "event space outdoor",
      displayName: "OUTDOOR SPACE",
      description:
        "An expansive outdoor venue featuring beautifully landscaped grounds, mature trees, and flexible open areas. This space offers a unique blend of natural beauty and urban sophistication, perfect for large-scale events that require both indoor and outdoor elements.",
      image: Outdoor, // You might want to use a different outdoor image
      capacity: "100+",
      color: "#6b7280", // gray-500

      pricing: {
        halfDay: { hours: 4, price: "875 USD" },
        fullDay: { hours: 8, price: "1,750 USD" },
      },
    },
    default: {
      displayName: "WORKSPACE",
      color: "#6b7280", // gray-500
      description: "Professional workspace for your needs",
    },
  },

  // Status configuration
  STATUS_RULES: {
    // Statuses that should NOT be displayed on calendar
    hidden: ["done", "cancel", "invoice", "process of invoice"],

    // Statuses that should be displayed
    visible: ["booking confirm", "deposit", "progress"],

    // Status display mapping
    displayText: {
      deposit: "Booking confirmed",
      "booking confirm": "Booking confirmed",
    },
  },

  // Calendar settings
  CALENDAR: {
    // Default view
    defaultView: "month",

    // Date format for display
    dateFormat: "DD/MM/YYYY",

    // Available booking button text
    availableButtonText: "Book now",
  },

  // Debug mode - set to false in production
  DEBUG: true,

  // Sample data for testing (used when Google Script fails)
  SAMPLE_DATA: [
    // Share Hives
    {
      date: "2025-06-20",
      room: "share hives",
      duration: "2 hours",
      time: "10:00 AM - 12:00 PM",
      status: "booking confirm",
    },
    {
      date: "2025-06-23",
      room: "share hives",
      duration: "2 hours",
      time: "3:00 PM - 5:00 PM",
      status: "booking confirm",
    },
    {
      date: "2025-06-24",
      room: "share hives",
      duration: "8 hours",
      time: "9:00 AM - 5:00 PM",
      status: "in progress",
    },

    // Focus Capsule
    {
      date: "2025-06-20",
      room: "focus capsule",
      duration: "4 hours",
      time: "9:00 AM - 1:00 PM",
      status: "deposit",
    },
    {
      date: "2025-06-21",
      room: "focus capsule",
      duration: "3 hours",
      time: "11:00 AM - 2:00 PM",
      status: "deposit",
    },
    {
      room: "focus capsule",
      date: "2025-03-06",
      time: "10:00-17:00",
      status: "Done",
    },
    {
      room: "focus capsule",
      date: "2025-03-29",
      time: "14:00-17:30",
      status: "Done",
    },
    {
      room: "focus capsule",
      date: "2025-03-31",
      time: "13:00-17:30",
      status: "Done",
    },
    {
      room: "focus capsule",
      date: "2025-04-08",
      time: "14:30-17:30",
      status: "Done",
    },
    {
      room: "focus capsule",
      date: "2025-05-01",
      time: "13:00-16:30",
      status: "Done",
    },
    {
      room: "focus capsule",
      date: "2025-05-02",
      time: "13:00-16:30",
      status: "Done",
    },
    {
      room: "focus capsule",
      date: "2025-05-03",
      time: "13:00-16:30",
      status: "Done",
    },
    {
      room: "focus capsule",
      date: "2025-05-06",
      time: "9:30-17:30",
      status: "Done",
    },
    {
      room: "focus capsule",
      date: "2025-06-02",
      time: "09:00-18:00",
      status: "Done",
    },
    {
      room: "focus capsule",
      date: "2025-06-03",
      time: "09:00-18:00",
      status: "Done",
    },
    {
      room: "focus capsule",
      date: "2025-06-04",
      time: "09:00-18:00",
      status: "Done",
    },
    {
      room: "focus capsule",
      date: "2025-06-05",
      time: "15:00-18:00",
      status: "Done",
    },
    {
      room: "focus capsule",
      date: "2025-06-06",
      time: "15:00-18:00",
      status: "Done",
    },

    // Think Tank
    {
      date: "2025-06-22",
      room: "think tank",
      duration: "3 hours",
      time: "2:00 PM - 5:00 PM",
      status: "in progress",
    },
    {
      date: "2025-06-18",
      room: "think tank",
      duration: "4 hours",
      time: "1:00 PM - 5:00 PM",
      status: "done", // This should not appear on calendar
    },

    // Underlines
    {
      room: "underlines",
      date: "2025-06-28",
      time: "09:00-12:00",
      status: "deposit",
    },
    {
      room: "underlines",
      date: "2025-06-30",
      time: "09:00-12:00",
      status: "deposit",
    },
    {
      room: "underlines",
      date: "2025-07-05",
      time: "",
      status: "Booking confirm",
    },
    {
      room: "underlines",
      date: "2025-07-06",
      time: "",
      status: "Booking confirm",
    },
    {
      room: "underlines",
      date: "2025-07-16",
      time: "09:00-17:30",
      status: "deposit",
    },
    {
      room: "underlines",
      date: "2025-08-09",
      time: "09:00-17:00",
      status: "Booking confirm",
    },
    {
      room: "underlines",
      date: "2025-08-10",
      time: "09:00-17:00",
      status: "Booking confirm",
    },

    // Event Space Indoor
    {
      date: "2025-06-25",
      room: "event space indoor",
      duration: "4 hours",
      time: "9:00 AM - 1:00 PM",
      status: "deposit",
    },
    {
      date: "2025-06-26",
      room: "event space indoor",
      duration: "6 hours",
      time: "10:00 AM - 4:00 PM",
      status: "booking confirm",
    },
    {
      date: "2025-07-10",
      room: "event space indoor",
      duration: "8 hours",
      time: "9:00 AM - 5:00 PM",
      status: "deposit",
    },
    {
      date: "2025-07-15",
      room: "event space indoor",
      duration: "3 hours",
      time: "2:00 PM - 5:00 PM",
      status: "booking confirm",
    },

    // Event Space Outdoor
    {
      date: "2025-06-28",
      room: "event space outdoor",
      duration: "6 hours",
      time: "10:00 AM - 4:00 PM",
      status: "deposit",
    },
    {
      date: "2025-06-29",
      room: "event space outdoor",
      duration: "8 hours",
      time: "9:00 AM - 5:00 PM",
      status: "booking confirm",
    },
    {
      date: "2025-07-12",
      room: "event space outdoor",
      duration: "5 hours",
      time: "11:00 AM - 4:00 PM",
      status: "deposit",
    },
    {
      date: "2025-07-20",
      room: "event space outdoor",
      duration: "2 hours",
      time: "3:00 PM - 5:00 PM",
      status: "booking confirm",
    },

    // Legacy Event Space (for backward compatibility)
    {
      date: "2025-06-19",
      room: "event space",
      duration: "2 hours",
      time: "3:00 PM - 5:00 PM",
      status: "cancel", // This should not appear on calendar
    },
  ],
};

// Export the CONFIG object so it can be imported in other files
export { CONFIG };
