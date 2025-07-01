// PastExp.jsx - With Swiper instead of scroll-x
"use client";

import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import Event1 from "@/public/assets/PastExp/well_lao.jpg";
import Event2 from "@/public/assets/PastExp/wall_street.jpg";
import Event3 from "@/public/assets/PastExp/tostem_img.jpg";
import Event4 from "@/public/assets/PastExp/wedding_img.jpg";
import Event5 from "@/public/assets/PastExp/econox_img.jpg";
import Event6 from "@/public/assets/PastExp/econox2_img.jpg";
import Event7 from "@/public/assets/PastExp/xmas_market.jpg";
import Event8 from "@/public/assets/PastExp/board_game_img.jpg";
import Event9 from "@/public/assets/PastExp/organization_meeting.jpg";
import Event10 from "@/public/assets/PastExp/hope_img.jpg";

// Mock data for the spaces
const spaces = [
  {
    id: 1,
    name: "WELL Laos",
    description: "Mental Health 101 Workshop",
    place: "At Underlines",
    image: Event1,
  },
  {
    id: 2,
    name: "SHARED SPACE",
    description: "Educational workshop",
    place: "At Indoor Event Space",
    image: Event2,
  },
  {
    id: 3,
    name: "Tostem",
    description: "Aluminium  workshop",
    place: "At Underlines",
    image: Event3,
  },
  {
    id: 4,
    name: "Wedding party",
    description: "",
    place: "At Outdoor Event Space",
    image: Event4,
  },
  {
    id: 5,
    name: "Econoxlaos",
    description: "Environmental workshop",
    place: "At Indoor Event Space",
    image: Event5,
  },
  {
    id: 6,
    name: "Econoxlaos",
    description: "Environmental workshop",
    place: "At Indoor Event Space",
    image: Event6,
  },
  {
    id: 7,
    name: "X-mas Market",
    description: "",
    place: "At Outdoor Event Space",
    image: Event7,
  },
  {
    id: 8,
    name: "Boardgame competition",
    description: "",
    place: "At sharehive",
    image: Event8,
  },
  {
    id: 9,
    name: "Organization meeting",
    description: "",
    place: "At Underlines",
    image: Event9,
  },
  {
    id: 10,
    name: "HOPE",
    description: "Judge Conference ",
    place: "At ThinkTank",
    image: Event10,
  },
];

const PastExp = () => {
  return (
    <div className="bg-white px-4 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16 pb-0">
      <div className="max-w-sm mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        {/* Header Section */}
        <div className="mb-8 lg:mb-12">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 text-left md:text-left">
            Loved by professional like You
          </h3>
          <div className="flex items-center justify-start md:justify-start space-x-2">
            <p className="text-gray-600 md:text-lg">Popular</p>
          </div>
        </div>

        {/* Swiper Container */}
        <div className="pb-4">
          <Swiper
            spaceBetween={16}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper !pb-12"
          >
            {spaces.map((space) => (
              <SwiperSlide key={space.id}>
                <div className="bg-gray-50 rounded-lg overflow-hidden w-full hover:shadow-lg transition-shadow duration-300">
                  {/* Image */}
                  <div className="relative h-68 lg:h-98 w-full">
                    <Image
                      src={space.image}
                      alt={space.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-6">
                    <h3 className="text-xl md:text-xl font-bold text-red-800 mb-1">
                      {space.name}
                    </h3>{" "}
                    <p className="text-gray-600 text-sm md:text-base  ">
                      {space.description}
                    </p>
                    <p className="text-[12px] text-gray-700">({space.place})</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default PastExp;
