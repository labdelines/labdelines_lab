import Image from "next/image";

import logo from "@/public/assets/la_petite.png";

// Import individual drink images
import matchaLatte from "@/public/assets/Coffee/01_matcha_latte.png";
import caramelMacchiato from "@/public/assets/Coffee/02_caramel_macchiato.png";
import chocolate from "@/public/assets/Coffee/03_chocolate.png";
import cappuccino from "@/public/assets/Coffee/04_cappuccino.png";
import matchaHoney from "@/public/assets/Coffee/05_matcha_honey.png";
import mocha from "@/public/assets/Coffee/06_mocha.png";
import espresso from "@/public/assets/Coffee/07_espresso.png";
import strawberryMilk from "@/public/assets/Coffee/08_strawberry_milk.png";
import orangeAmericano from "@/public/assets/Coffee/09_orange_americano.png";
import pureMatcha from "@/public/assets/Coffee/010_pure_matcha.png";
import strawberry_Matcha from "@/public/assets/Coffee/011_strawberry_matcha.png";
import americano from "@/public/assets/Coffee/012_americano.png";
import coconutMatcha from "@/public/assets/Coffee/013_coconut_matcha.png";

const LaPetite = () => {
  const handleBookNow = () => {
    window.open("https://wa.me/85602052242244", "_blank");
  };

  const menuItems = [
    {
      id: 1,
      name: "Matcha Latte",
      price: "38.000 kip",
      image: matchaLatte,
      bgColor: "bg-green-100",
    },
    {
      id: 2,
      name: "Caramel Macchiato",
      price: "38.000 kip",
      image: caramelMacchiato,
      bgColor: "bg-orange-100",
    },
    {
      id: 3,
      name: "Chocolate",
      price: "35.000 kip",
      image: chocolate,
      bgColor: "bg-brown-100",
    },
    {
      id: 4,
      name: "Cappuccino",
      price: "38.000 kip",
      image: cappuccino,
      bgColor: "bg-amber-100",
    },
    {
      id: 5,
      name: "Matcha Honey",
      price: "40.000 kip",
      image: matchaHoney,
      bgColor: "bg-green-100",
    },
    {
      id: 6,
      name: "Mocha",
      price: "38.000 kip",
      image: mocha,
      bgColor: "bg-amber-100",
    },
    {
      id: 7,
      name: "Matcha Lattea",
      price: "38.000 kip",
      image: espresso,
      bgColor: "bg-green-100",
    },
    {
      id: 8,
      name: "Strawberry Milk",
      price: "40.000 kip",
      image: strawberryMilk,
      bgColor: "bg-pink-100",
    },
    {
      id: 9,
      name: "Orange Americano",
      price: "35.000 kip",
      image: orangeAmericano,
      bgColor: "bg-orange-100",
    },
    {
      id: 10,
      name: "Pure Matcha",
      price: "35.000 kip",
      image: pureMatcha,
      bgColor: "bg-green-200",
    },
    {
      id: 11,
      name: "Strawberry Matcha",
      price: "50.000 kip",
      image: strawberry_Matcha,
      bgColor: "bg-pink-100",
    },
    {
      id: 12,
      name: "Americano",
      price: "30.000 kip",
      image: americano,
      bgColor: "bg-amber-100",
    },
    {
      id: 13,
      name: "Coconut Matcha",
      price: "50.000 kip",
      image: coconutMatcha,
      bgColor: "bg-green-100",
    },
  ];

  return (
    <div id="details" className="min-h-screen bg-gray-50 pt-10">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 pt-8 pb-2">
          <div className="text-center mb-8">
            {/* Logo/Title */}
            <div className="mb-6 w-full h-[120px]">
              <Image
                src={logo}
                alt="La Petite logo"
                className="w-full h-[120px] object-contain"
                priority // Load immediately (above the fold)
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>

            {/* Menu Header */}
            <div className="bg-rose-50 rounded-2xl p-6 mb-2">
              <h2 className="text-2xl md:text-3xl font-bold text-red-900 mb-2">
                MENU DRINKS
              </h2>
              <p className="text-red-700 text-lg">for meeting</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-2xl mx-auto px-4 py-4 pt-0 bg-white">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Suspense key={item.id} fallback={<MenuItemSkeleton />}>
              <MenuItem item={item} />
            </Suspense>
          ))}
        </div>

        {/* Book Now Button */}
        <div className="text-center mt-12 mb-8">
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

export default LaPetite;
