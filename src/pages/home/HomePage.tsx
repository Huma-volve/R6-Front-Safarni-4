import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin } from "lucide-react";

export default function HomePage() {
  const categories = [
    { id: 1, img: "/src/assets/cat1.jpg", name: "Flight" },
    { id: 2, img: "/src/assets/cat2.jpg", name: "Cars" },
    { id: 3, img: "/src/assets/cat3.jpg", name: "Tours" },
    { id: 4, img: "/src/assets/cat4.jpg", name: "Hotel" },
  ];

  const cards2 = [
    {
      id: 1,
      title: "Full Day Tour",
      location: "Luxor",
      rating: 4.3,
      price: "150$",
      image: "../src/assets/luxor.jpg",
    },
    {
      id: 2,
      title: "Full Day Tour",
      location: "Dahab",
      rating: 4.5,
      price: "250$",
      image: "../src/assets/dahab.jpg",
    },
    {
      id: 3,
      title: "Full Day Tour",
      location: "Fayoum",
      rating: 4.2,
      price: "200$",
      image: "../src/assets/fayoum.jpg",
    },
    {
      id: 4,
      title: "Full Day Tour",
      location: "Marsa Alam",
      rating: 4.8,
      price: "220$",
      image: "../src/assets/alam.jpg",
    },
  ];

  const [cards, setCards] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchRecommendedTours = async () => {
      try {
        const res = await fetch(`${baseUrl}recommendedtour`);
        const data = await res.json();

        setCards(data.data || []);
      } catch (err) {
        console.error("Failed to fetch recommended tours:", err);
        setCards([]);
      }
    };
    fetchRecommendedTours();
  }, []);
  const visibleCards = showAll ? cards : cards.slice(0, 4);

  return (
    <div className="px-20 py-12 min-h-screen">
      <div className="flex flex-row justify-between items-start gap-30 mb-20">
        <div className="relative max-w-[400px]">
          <h1 className="text-gray-900 text-4xl font-bold leading-snug mb-4 mt-16 ml-4 ">
            Visit The Most{" "}
            <span className="text-blue-900">Beautiful Places</span> In<br></br>{" "}
            The World
          </h1>
          <img
            src="/src/assets/arrow.svg"
            alt="arrow"
            className="hidden md:absolute ml-4 md:block w-[160px] h-[70px] top-[150px] left-[250px]"
          />

          <p className="text-gray-600 max-w-[360px] mt-6 ml-4">
            Explore stunning destinations around the globe. Find travel
            inspiration, top attractions, and plan your next adventure—all from
            one platform.
          </p>
        </div>

        <div className="">
          <div className="w-full mr-10  ">
            <img
              src="../src/assets/Frame.png"
              className="w-110 h-100 object-cover rounded-3xl"
            />
          </div>
        </div>
      </div>

      <div className="text-xl font-normal mb-20">
        <h1>Categories</h1>
        <div className="flex flex-row justify-start items-center mt-10 gap-20 ">
          {categories.map((cat) => (
            <div key={cat.id} className="text-center">
              <img
                src={cat.img}
                alt={`category ${cat.id}`}
                className="w-54 h-45  object-cover object-left rounded-full mx-auto transform transition duration-300 ease-in-out hover:scale-105 "
              />
              <p className="mt-3 text-blue-800 font-medium">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xl font-normal">
        <div className="flex items-center justify-between mb-6">
          <h1>Recommendation</h1>
          {cards.length > 4 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-blue-800 text-sm font-semibold mr-8 hover:underline cursor-pointer"
            >
              {showAll ? "Show Less" : "View All"}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {visibleCards.map((card) => (
            <Card
              key={card.id}
              className="rounded-xl shadow-lg shadow-gray-300 overflow-hidden hover:shadow-md hover:scale-101 transition duration-300 !p-0"
            >
              <img
                src={card.image}
                alt={card.title}
                className="rounded-3xl w-full h-55 object-cover p-3"
              />

              <CardContent className="px-4 pb-4 my-2">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-normal text-gray-600">
                    {card.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-600">
                      {card.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-gray-400 font-light">
                  <MapPin className="w-4 h-4 text-blue-700" />
                  <span className="text-sm">{card.location}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-xl font-normal mt-15  !w-full !max-w-full mb-9 ">
        <h1 className="mb-6">Available Tours</h1>

        <div className="grid grid-cols-2 gap-6 w-full">
          {cards2.map((card) => (
            <Card
              key={card.id}
              className="
               !w-full !max-w-full
                rounded-xl shadow-lg shadow-gray-300 
                  overflow-hidden 
                  hover:shadow-md hover:scale-101
                  transition duration-300 !p-0 
                  flex "
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-2/5 h-30 object-cover p-2 rounded-3xl"
              />

              <CardContent className=" px-3 mt-4 w-full">
                <div className="flex items-center justify-start gap-40 mb-2">
                  <h3 className="text-sm font-normal text-gray-600">
                    {card.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-600">
                      {card.rating}
                    </span>
                  </div>
                </div>

                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {card.location}
                </h2>

                <div className="font-medium text-sm mt-3">
                  <p>
                    From <span className="text-blue-700">{card.price}</span> Per
                    Person
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
