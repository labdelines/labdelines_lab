"use client";
import React, { useEffect, useState, useRef } from "react";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Lab_logo from "@/public/assets/Lab_logo.png";
import Logo_lab from "@/public/assets/Lab_icon_logo.svg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState("/");
  const [isScrollActive, setIsScrollActive] = useState(false);
  const router = useRouter();
  const navbarRef = useRef(null); // Reference to the navbar container

  const pathname = usePathname();
  const isNotHomePage = pathname !== "/";

  const NavBars = [
    {
      id: "/",
      name: "Home",
      number: "01",
      sectionId: null, // No section for home
    },
    {
      id: "#workspaces",
      name: "Workspaces",
      number: "02",
      sectionId: "workspaces",
    },
    {
      id: "#facilities",
      name: "Facilities",
      number: "03",
      sectionId: "facilities",
    },
    {
      id: "#contact",
      name: "Contact us",
      number: "04",
      sectionId: "contact",
    },
  ];

  // Function to detect which section is currently visible
  const detectActiveSection = () => {
    if (pathname !== "/") return; // Only detect on home page

    const scrollPosition = window.scrollY + 150; // Offset for navbar height

    // Check if we're at the very top (home section)
    if (window.scrollY < 100) {
      setIsMenuActive("/");
      return;
    }

    // Check each section
    for (let i = NavBars.length - 1; i >= 0; i--) {
      const navItem = NavBars[i];
      if (navItem.sectionId) {
        const element = document.getElementById(navItem.sectionId);
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;

          // Check if the scroll position is within this section
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setIsMenuActive(navItem.id);
            return;
          }
        }
      }
    }
  };

  // Close mobile menu when clicking outside (only on non-home pages)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        isNotHomePage && // Only close on click outside when NOT on home page
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    // Add event listener when menu is open and not on home page
    if (isMenuOpen && isNotHomePage) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    // Clean up event listeners
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen, isNotHomePage]);

  // Handle scroll events
  useEffect(() => {
    // console.log("Navbar mounted");

    const handleScroll = () => {
      // console.log("Scroll Y:", window.scrollY);

      // Close mobile menu when scrolling (only on non-home pages)
      if (isMenuOpen && isNotHomePage) {
        setIsMenuOpen(false);
      }

      // Update scroll active state
      if (window.scrollY > 100) {
        // console.log("Setting scroll active TRUE");
        setIsScrollActive(true);
      } else {
        // console.log("Setting scroll active FALSE");
        setIsScrollActive(false);
      }

      // Detect active section
      detectActiveSection();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial detection
    detectActiveSection();

    return () => {
      // console.log("Navbar unmounted, removing scroll listener");
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, isMenuOpen]); // Added isMenuOpen to dependencies

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Handle navigation
  const handleNavigation = (navId) => {
    setIsMenuActive(navId);
    setIsMenuOpen(false); // Always close menu when navigating

    if (navId === "/") {
      // Navigate to home page
      router.push("/");
    } else if (navId.startsWith("#")) {
      // Hash navigation - check if we're on home page
      if (pathname === "/") {
        // We're on home page, just scroll to section
        const sectionId = navId.substring(1); // Remove the #
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // We're on a different page, navigate to home with hash
        router.push(`/${navId}`);
        // Set a timeout to update the active menu after navigation
        setTimeout(() => {
          setIsMenuActive(navId);
        }, 100);
      }
    }
  };

  // Close menu when pressing Escape key (only on non-home pages)
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isMenuOpen && isNotHomePage) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen && isNotHomePage) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isMenuOpen, isNotHomePage]);

  // Update active menu based on current hash (for direct URL access)
  useEffect(() => {
    const updateActiveMenu = () => {
      const hash = window.location.hash;
      if (hash) {
        setIsMenuActive(hash);
      } else if (pathname === "/") {
        setIsMenuActive("/");
      }
    };

    // Update on mount
    updateActiveMenu();

    // Listen for hash changes
    window.addEventListener("hashchange", updateActiveMenu);

    // Listen for popstate (back/forward navigation)
    window.addEventListener("popstate", updateActiveMenu);

    return () => {
      window.removeEventListener("hashchange", updateActiveMenu);
      window.removeEventListener("popstate", updateActiveMenu);
    };
  }, [pathname]);

  // Update active menu when pathname changes
  useEffect(() => {
    if (pathname === "/") {
      const hash = window.location.hash;
      if (hash) {
        setIsMenuActive(hash);
      } else {
        setIsMenuActive("/");
        // Detect active section after navigation
        setTimeout(detectActiveSection, 100);
      }
    }
  }, [pathname]);

  return (
    <div
      ref={navbarRef} // Add ref to the navbar container
      className={`w-full fixed top-0 left-0 z-50  ${
        isMenuOpen || isScrollActive || isNotHomePage
          ? "bg-white"
          : "bg-transparent"
      }`}
    >
      <div
        className={`flex justify-between items-center   ${
          (isMenuOpen ? "border-b-1 border-[#CCCCCC] py-4 mx-4" : "p-4") +
          ((isScrollActive || isNotHomePage) && isMenuActive
            ? "shadow-2xl py-4 mx-4"
            : "")
        }`}
      >
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => handleNavigation("/")}
        >
          {isMenuOpen || isScrollActive || isNotHomePage ? (
            <Image src={Logo_lab} alt="Logo" width={40} height={40} />
          ) : (
            <Image src={Lab_logo} alt="Logo" width={32} height={32} />
          )}

          <span
            className={`font-bold text-lg ml-2.5 text-red-900 ${
              isMenuOpen || isScrollActive || isNotHomePage ? "" : "hidden"
            }`}
          >
            LABDELINES
          </span>
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
          aria-label="Toggle mobile menu"
          aria-expanded={isMenuOpen}
        >
          <Menu
            className={`w-6 h-6 ${
              isMenuOpen || isScrollActive || isNotHomePage
                ? "text-red-800"
                : "text-white"
            }`}
          />
        </button>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md p-6 md:hidden z-40">
            <ul className="space-y-4 text-center">
              {NavBars.map((NavBar) => (
                <li key={NavBar.id} onClick={() => handleNavigation(NavBar.id)}>
                  <div className="flex justify-center">
                    {isMenuActive === NavBar.id ? (
                      <i className="fi fi-rr-arrow-right text-xl mr-3 mt-1 text-red-800"></i>
                    ) : (
                      ""
                    )}
                    <button
                      className={`hover:text-red-800 ${
                        isMenuActive === NavBar.id
                          ? "text-red-800 underline font-semibold text-2xl"
                          : "text-black text-lg"
                      }`}
                    >
                      {NavBar.name}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <nav className="hidden md:flex space-x-6 text-sm">
          {NavBars.map((NavBar) => (
            <button
              key={NavBar.id}
              onClick={() => handleNavigation(NavBar.id)}
              className={`${
                isNotHomePage || isScrollActive
                  ? "text-red-800 hover:text-red-900"
                  : "text-white hover:text-white/80"
              } ${isMenuActive === NavBar.id ? "underline font-bold" : ""}`}
            >
              {NavBar.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
