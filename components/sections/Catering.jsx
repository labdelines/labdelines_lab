"use client";

import Image from "next/image";

import catteringImg from "@/public/assets/catering.png";

import React from "react";
import { Coffee, Cookie, Sandwich, Cake, Phone } from "lucide-react";

const Catering = () => {
  const handleBookNow = () => {
    window.open("https://wa.me/85602052242244", "_blank");
  };

  const packages = {
    small: [
      {
        type: "Normal",
        drinks: "1 Drink + 1 Dessert",
        description:
          "Coffee Break 1 ຄັ້ງ / ສຳລັບຫ້ອງປະຊຸມເຄິ່ງມື້ (4ຊົ່ວໂມງ) ເລືອກເມນູ ຂອງວ່າງໄດ້ 1 ຢ່າງ",
        price: "60.000",
        bgColor: "bg-rose-50",
        borderColor: "border-rose-200",
        textColor: "text-rose-800",
      },
      {
        type: "Plus +",
        drinks: "1 Drink + 2 Desserts",
        description:
          "Coffee Break 1 ຄັ້ງ / ສຳລັບຫ້ອງປະຊຸມເຄິ່ງມື້ (4ຊົ່ວໂມງ) ເລືອກ ເຄື່ອງດື່ມໄດ້ 1 ເມນູ ແລະ  ຂອງວ່າງໄດ້ 2 ຢ່າງ",
        price: "95.000",
        bgColor: "bg-rose-50",
        borderColor: "border-rose-200",
        textColor: "text-rose-800",
      },
    ],
    medium: [
      {
        type: "Normal",
        drinks: "2 Drinks + 2 Desserts",
        description:
          "Coffee Break 2 ຄັ້ງ / ສຳລັບຫ້ອງປະຊຸມຫມົດມື້ (8ຊົ່ວໂມງ) ເລືອກ ເຄື່ອງດື່ມໄດ້ 2 ເມນູ ແລະ ຂອງວ່າງ 2 ຢ່າງ",
        price: "120.000",
        bgColor: "bg-red-800",
        borderColor: "border-red-800",
        textColor: "text-white",
      },
      {
        type: "Plus +",
        drinks: "2 Drinks + 3 Desserts",
        description:
          "Coffee Break 2 ຄັ້ງ / ສຳລັບຫ້ອງປະຊຸມຫມົດມື້ (8ຊົ່ວໂມງ) ເລືອກ ເຄື່ອງດື່ມໄດ້ 2 ເມນູ  ແລະ ຂອງວ່າງ 3 ຢ່າງ",
        price: "180.000",
        bgColor: "bg-red-800",
        borderColor: "border-red-800",
        textColor: "text-white",
      },
    ],
    large: [
      {
        type: "Normal",
        drinks: "1 Drink + 1 Dessert + 1 Lunch",
        description:
          "Coffee Break 1 ຄັ້ງ / ສຳລັບຫ້ອງປະຊຸມເຄິ່ງມື້ (4ຊົ່ວໂມງ) ເລືອກເມນູ  ຂອງວ່າງ 1 ຢ່າງ ແລະ 1 ອາຫານສວາຍ",

        price: "160.000",
        bgColor: "bg-rose-50",
        borderColor: "border-rose-200",
        textColor: "text-rose-800",
      },
      {
        type: "Plus +",
        drinks: "1 Drink + 2 Desserts + 1 Lunch",
        description:
          "Coffee Break 1 ຄັ້ງ / ສຳລັບຫ້ອງປະຊຸມເຄິ່ງມື້ (4ຊົ່ວໂມງ) ເລືອກ ເຄື່ອງດື່ມໄດ້ 1 ເມນູ , 2 ອາຫານວ່າງ ແລະ 1 ອາຫານສວາຍ",

        price: "190.000",
        bgColor: "bg-rose-50",
        borderColor: "border-rose-200",
        textColor: "text-rose-800",
      },
    ],
    xlarge: [
      {
        type: "Normal",
        drinks: "2 Drinks + 2 Desserts + 1 Lunch",
        description:
          "Coffee Break 2 ຄັ້ງ / ສຳລັບຫ້ອງປະຊຸມຫມົດມື້ (8ຊົ່ວໂມງ) ເລືອກເມນູ  ຂອງວ່າງ 2 ຢ່າງ",
        price: "220.000",
        bgColor: "bg-red-800",
        borderColor: "border-red-800",
        textColor: "text-white",
      },
      {
        type: "Plus +",
        drinks: "2 Drinks + 3 Desserts + 1 Lunch",
        description:
          "Coffee Break 2 ຄັ້ງ / ສຳລັບຫ້ອງປະຊຸມຫມົດມື້ (8ຊົ່ວໂມງ) ເລືອກເມນູ  ຂອງວ່າງ 2 ຢ່າງ",

        price: "280.000",
        bgColor: "bg-red-800",
        borderColor: "border-red-800",
        textColor: "text-white",
      },
    ],
  };

  return (
    <div id="details" className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-rose-50 rounded-2xl p-8 mb-8">
            <h1 className="text-4xl font-bold text-red-900 mb-2">
              COFFEE BREAK
            </h1>
            <p className="text-red-700 text-lg mb-6">for meeting</p>
          </div>
          <div className="text-center mb-12">
            <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Enhance your meetings, workshops, and events with our thoughtfully
              curated coffee break packages. From energizing beverages to
              delightful sweet treats, we provide quality refreshments that keep
              your participants engaged and productive.
            </p>
          </div>
        </div>
        {/* Food Gallery */}
        <div className="gap-2 mb-2">
          <div className="w-full h-[120px]">
            <Image
              src={catteringImg}
              alt="cattering image"
              className="w-full h-[120px] object-contain"
            />
          </div>
        </div>

        {/* Menu Items */}
        <div className="grid-cols-2 md:grid-cols-2 gap-8 mb-12">
          {/* Drink Menu */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <Coffee className="w-6 h-6 text-red-900 mr-3" />
              <h2 className="text-xl font-bold text-red-900">DRINK MENU</h2>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-red-900 rounded-full mr-3"></div>
                Coffee drinks
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-red-900 rounded-full mr-3"></div>
                Non-Coffee drinks
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-red-900 rounded-full mr-3"></div>
                Tea
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-red-900 rounded-full mr-3"></div>
                Juice
              </li>
            </ul>
            <div className="flex items-center mb-4 mt-8">
              <Cake className="w-6 h-6 text-red-900 mr-3" />
              <h2 className="text-xl font-bold text-red-900">DESSERTS</h2>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-red-900 rounded-full mr-3"></div>
                Sandwich
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-red-900 rounded-full mr-3"></div>
                Lao dessert
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-red-900 rounded-full mr-3"></div>
                Croissant
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-red-900 rounded-full mr-3"></div>
                Fresh fruit
              </li>
            </ul>
          </div>
        </div>

        {/* Package (S) */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">PACKAGE (S)</h2>
          <div className="space-y-4">
            {packages.small.map((pkg, index) => (
              <div
                key={index}
                className={`${pkg.bgColor} ${pkg.borderColor} border-2 rounded-lg p-6`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`text-lg font-bold ${pkg.textColor}`}>
                    {pkg.type}
                  </h3>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${pkg.textColor}`}>
                      {pkg.price}kip/Pax
                    </div>
                  </div>
                </div>
                <p className={`font-medium ${pkg.textColor} mb-1`}>
                  {pkg.drinks}
                </p>
                <p className={`text-sm ${pkg.textColor}`}>{pkg.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Package (M) */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">PACKAGE (M)</h2>
          <div className="space-y-4 ">
            {packages.medium.map((pkg, index) => (
              <div
                key={index}
                className={`${pkg.bgColor} ${pkg.borderColor} border-2 rounded-lg p-6`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`text-lg font-bold ${pkg.textColor}`}>
                    {pkg.type}
                  </h3>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${pkg.textColor}`}>
                      {pkg.price}kip/Pax
                    </div>
                  </div>
                </div>
                <p className={`font-medium ${pkg.textColor} mb-1`}>
                  {pkg.drinks}
                </p>
                <p className={`text-sm ${pkg.textColor}`}>{pkg.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Package (L) */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">PACKAGE (L)</h2>
          <div className="space-y-4">
            {packages.large.map((pkg, index) => (
              <div
                key={index}
                className={`${pkg.bgColor} ${pkg.borderColor} border-2 rounded-lg p-6`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`text-lg font-bold ${pkg.textColor}`}>
                    {pkg.type}
                  </h3>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${pkg.textColor}`}>
                      {pkg.price}kip/Pax
                    </div>
                  </div>
                </div>
                <p className={`font-medium ${pkg.textColor} mb-1`}>
                  {pkg.drinks}
                </p>
                <p className={`text-sm ${pkg.textColor} mb-1`}>
                  {pkg.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Package (XL) */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            PACKAGE (XL)
          </h2>
          <div className="space-y-4">
            {packages.xlarge.map((pkg, index) => (
              <div
                key={index}
                className={`${pkg.bgColor} ${pkg.borderColor} border-2 rounded-lg p-6`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`text-lg font-bold ${pkg.textColor}`}>
                    {pkg.type}
                  </h3>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${pkg.textColor}`}>
                      {pkg.price}kip/Pax
                    </div>
                  </div>
                </div>
                <p className={`font-medium ${pkg.textColor} mb-1`}>
                  {pkg.drinks}
                </p>
                <p className={`text-sm ${pkg.textColor} mb-1`}>
                  {pkg.description}
                </p>
                {pkg.subDescription && (
                  <p className={`text-sm ${pkg.textColor}`}>
                    {pkg.subDescription}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Book Now Button */}
        <div className="text-center ">
          <button
            onClick={handleBookNow}
            className="bg-red-900 hover:bg-red-800 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Catering;
