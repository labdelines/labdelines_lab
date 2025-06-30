// BookingSection.jsx - Positioned to slide up naturally
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Images for workspaces
import SharedHives from "@/public/assets/sharedhives.png";
import FocusCapsule from "@/public/assets/focus_capsule.jpg";
import ThinkTank from "@/public/assets/think_tank.jpg";
import Underlines from "@/public/assets/underlines.png";
import EventSpace from "@/public/assets/LAB_building.png";
import Event4 from "@/public/assets/PastExp/wedding_img.jpg";

const BookingSection = () => {
  const [selectedId, setSelectedId] = useState("sharedhives");
  const router = useRouter();

  const workspaces = [
    {
      id: "sharedhives",
      key: "share hives",
      name: "SHARED HIVE",
      description: "Co-working Space and Cafe",
      img: SharedHives,
      number: "01",
    },
    {
      id: "focus_capsule",
      key: "focus capsule",
      name: "FOCUS CAPSULE",
      description: "Dedicated room designed for group work of 2-5 people",
      img: FocusCapsule,
      number: "02",
    },
    {
      id: "think_tank",
      key: "think tank",
      name: "THINK TANK",
      description: "Meeting Room",
      img: ThinkTank,
      number: "03",
    },
    {
      id: "underlines",
      key: "underlines",
      name: "UNDERLINES",
      description: "Conference Room",
      img: Underlines,
      number: "04",
    },
    {
      id: "event_space",
      key: "event space",
      name: "EVENT SPACE",
      description: "Indoor and Outdoor",
      img: Event4,
      number: "05",
      hasMultipleOptions: true, // Flag to indicate this workspace has multiple options
    },
  ];

  const handleViewSpace = (workspace, option = null) => {
    if (option) {
      // Navigate to specific event space option (indoor/outdoor) with anchor
      router.push(`/rooms/${workspace.id}_${option}#details`);
    } else {
      // Navigate to specific room pages with anchor
      if (workspace.id === "sharedhives") {
        router.push(`/sharedhives#details`);
      } else {
        router.push(`/rooms/${workspace.id}#details`);
      }
    }
  };

  return (
    <>
      <div className="rounded-t-3xl shadow-lg bg-white h-5 w-full"></div>
      <div className="relative bg-white ">
        {/* This creates the sliding effect - positioned relative to slide over hero */}
        <div className="relative ">
          <div
            id="workspaces"
            className="px-4 md:px-8 lg:px-12 py-4 md:py-12 lg:py-16 bg-white"
          >
            <div className="max-w-sm mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
              {/* Booking Section */}
              <div className="text-start pt-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold  mb-2 text-gray-900">
                  Book a workspace
                </h2>
                <p className="text-lg md:text-xl  mb-8 lg:mb-12 text-gray-700">
                  designed for how you work best
                </p>

                {/* Workspace Options */}
                <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-3 xl:grid-cols-5">
                  {workspaces.map((workspace, index) => (
                    <div
                      key={workspace.id}
                      onClick={() => setSelectedId(workspace.id)}
                      className={`flex md:flex-col items-center space-x-4 md:space-x-0 md:space-y-4 p-4 md:p-6 rounded-xl cursor-pointer transform hover:scale-102 transition-all duration-300 ease-out ${
                        selectedId === workspace.id
                          ? "bg-red-50 border-2 border-red-200 shadow-md"
                          : "bg-gray-50 border-2 border-transparent hover:border-gray-200 hover:shadow-sm"
                      }`}
                    >
                      {/* Circle with Image */}
                      <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-red-800 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center shadow-lg">
                        {workspace.img ? (
                          <Image
                            src={workspace.img}
                            width={96}
                            height={96}
                            alt={workspace.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <span className="text-white text-sm md:text-base font-bold">
                            {workspace.number}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 md:text-center">
                        <h3 className="font-bold text-gray-900 mb-1 text-lg md:text-xl">
                          {workspace.name}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 line-clamp-2 md:line-clamp-3">
                          {workspace.description}
                        </p>

                        {/* Buttons — only if selected */}
                        {selectedId === workspace.id && (
                          <div className="mt-3">
                            {workspace.hasMultipleOptions ? (
                              // Event Space - Show Indoor/Outdoor buttons
                              <div className="flex flex-row md:flex-row gap-2 md:gap-3">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewSpace(workspace, "indoor");
                                  }}
                                  className="bg-red-800 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg text-sm md:text-base font-medium hover:bg-red-900 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex-1"
                                >
                                  Indoor
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewSpace(workspace, "outdoor");
                                  }}
                                  className="bg-green-700 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg text-sm md:text-base font-medium hover:bg-green-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex-1"
                                >
                                  Outdoor
                                </button>
                              </div>
                            ) : (
                              // Regular workspaces - Show single View Space button
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewSpace(workspace);
                                }}
                                className="bg-red-800 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg text-sm md:text-base font-medium hover:bg-red-900 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 w-full md:w-auto"
                              >
                                View Space
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Number - hidden on larger screens in grid layout */}
                      <div className="text-3xl font-bold text-red-800 opacity-30 md:hidden">
                        {workspace.number}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingSection;
