// src/hooks/useCalendar.js
import { useState, useEffect } from "react";
import {
  fetchBookingData,
  generateCalendarDays,
  getNextMonth,
  getPrevMonth,
  filterBookingsByRoom,
  getBookingStats,
} from "@/lib/calendar.js";

export const useCalendar = (workspaceKey = "all") => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load booking data
  useEffect(() => {
    const loadBookings = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchBookingData();
        setBookings(data);
      } catch (err) {
        setError(err.message);
        console.error("Error loading bookings:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadBookings();
  }, []);

  // Navigation functions
  const goToPrevMonth = () => {
    const { year, month } = getPrevMonth(currentYear, currentMonth);
    setCurrentYear(year);
    setCurrentMonth(month);
  };

  const goToNextMonth = () => {
    const { year, month } = getNextMonth(currentYear, currentMonth);
    setCurrentYear(year);
    setCurrentMonth(month);
  };

  const goToMonth = (year, month) => {
    setCurrentYear(year);
    setCurrentMonth(month);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
  };

  // Generate calendar data
  const calendarDays = generateCalendarDays(
    currentYear,
    currentMonth,
    bookings,
    workspaceKey
  );

  // Filter bookings for current workspace
  const filteredBookings =
    workspaceKey === "all"
      ? bookings
      : filterBookingsByRoom(bookings, workspaceKey);

  // Get bookings for current month
  const currentMonthBookings = filteredBookings.filter((booking) => {
    const bookingDate = new Date(booking.date);
    return (
      bookingDate.getFullYear() === currentYear &&
      bookingDate.getMonth() === currentMonth
    );
  });

  // Get booking statistics
  const stats = getBookingStats(bookings, workspaceKey);

  // Group calendar days into weeks
  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  // Get available dates count for current month
  const availableDatesCount = calendarDays.filter(
    (day) => day.type === "day" && day.showAvailable
  ).length;

  return {
    // State
    currentYear,
    currentMonth,
    bookings: filteredBookings,
    currentMonthBookings,
    isLoading,
    error,

    // Calendar data
    calendarDays,
    weeks,
    availableDatesCount,
    stats,

    // Navigation functions
    goToPrevMonth,
    goToNextMonth,
    goToMonth,
    goToToday,

    // Utilities
    refreshData: () => {
      const loadBookings = async () => {
        try {
          setIsLoading(true);
          const data = await fetchBookingData();
          setBookings(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      loadBookings();
    },
  };
};

export default useCalendar;
