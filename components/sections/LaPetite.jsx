import Image from "next/image";

import logo from "@/public/assets/la_petite.png";
import coffee1 from "@/public/assets/coffee_1.png";

const LaPetite = () => {
  const handleBookNow = () => {
    window.open("https://wa.me/85602052242244", "_blank");
  };

  const menuItems = [
    {
      id: 1,
      name: "Matcha Latte",
      price: "40.000 kip",
      image: coffee1,
      bgColor: "bg-green-100",
    },
    {
      id: 2,
      name: "Caramel Macchiato",
      price: "40.000 kip",
      image: coffee1,
      bgColor: "bg-orange-100",
    },
    {
      id: 3,
      name: "Chocolate",
      price: "40.000 kip",
      image: coffee1,
      bgColor: "bg-brown-100",
    },
    {
      id: 4,
      name: "Cappuccino",
      price: "40.000 kip",
      image: coffee1,
      bgColor: "bg-amber-100",
    },
    {
      id: 5,
      name: "Matcha Honey",
      price: "40.000 kip",
      image: coffee1,
      bgColor: "bg-green-100",
    },
    {
      id: 6,
      name: "Mocha",
      price: "40.000 kip",
      image: coffee1,
      bgColor: "bg-amber-100",
    },
    {
      id: 7,
      name: "Matcha Lattea",
      price: "40.000 kip",
      image: coffee1,
      bgColor: "bg-green-100",
    },
    {
      id: 8,
      name: "Strawberry Milk",
      price: "40.000 kip",
      image: coffee1,
      bgColor: "bg-pink-100",
    },
    {
      id: 9,
      name: "Orange Americano",
      price: "40.000 kip",
      image: coffee1,
      bgColor: "bg-orange-100",
    },
    {
      id: 10,
      name: "Pure Matcha",
      price: "40.000 kip",
      image: coffee1,
      bgColor: "bg-green-200",
    },
    {
      id: 11,
      name: "Strawberry Matcha",
      price: "40.000 kip",
      image: coffee1,
      bgColor: "bg-pink-100",
    },
    {
      id: 12,
      name: "Americano",
      price: "40.000 kip",
      image: coffee1,
      bgColor: "bg-amber-100",
    },
    {
      id: 13,
      name: "Coconut Matcha",
      price: "40.000 kip",
      image: coffee1,
      bgColor: "bg-green-100",
    },
    {
      id: 14,
      name: "Coconut Matcha",
      price: "40.000 kip",
      image: coffee1,
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
      <div className="max-w-2xl mx-auto px-4 py-4 pt-0  bg-white">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden transition-shadow duration-300"
            >
              {/* Drink Image */}
              <div className=" flex justify-center items-center h-auto">
                <div className="w-24 h-32 rounded-lg flex items-center justify-center">
                  <div className=" w-full h-[130px]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="w-full h-[130px] object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Drink Info */}
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.name}
                </h3>
                <p className="text-red-600 font-bold text-lg">{item.price}</p>
              </div>
            </div>
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

        {/* Operating Hours */}
        {/* <div className="bg-white rounded-lg p-6 mt-6 shadow-sm">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Operating Hours
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p className="font-medium">Monday - Friday</p>
                <p>7:00 AM - 7:00 PM</p>
              </div>
              <div>
                <p className="font-medium">Saturday - Sunday</p>
                <p>8:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LaPetite;
