import { useLocation } from "react-router-dom";
import BackButton from "@/components/common/BackButton";
import { Heart, Star } from "lucide-react";
import { useState } from "react";

export default function Tour() {
  const location = useLocation();

  const tours = location.state?.tours || [];
  const selectedLocation =
    location.state?.filters?.location &&
    location.state.filters.location.trim() !== ""
      ? location.state.filters.location
      : "All Locations";

  return (
    <div className="bg-white px-10 py-6">
      <BackButton router={-1} />
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        {selectedLocation}{" "}
        <span className="text-sm font-light">({tours.length} Results)</span>
      </h2>

      {tours.length === 0 ? (
        <p className="text-gray-500">No tours found with your filters.</p>
      ) : (
        <div
          className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-6
        "
        >
          {tours.map((tour: any) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      )}
    </div>
  );
}

function TourCard({ tour }: { tour: any }) {
  const [isFavorite, setIsFavorite] = useState(tour.is_favorite);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative px-3 pt-3 pb-2">
        <img
          src={tour.image || "/placeholder.jpg"}
          alt={tour.title}
          className="h-48 w-full object-cover rounded-2xl"
        />
        <button
          onClick={toggleFavorite}
          className="absolute top-5 right-5 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
            } transition-colors duration-200`}
          />
        </button>
      </div>

      <div className="px-3 pb-3">
        <div className="flex items-center justify-between gap-2">
          <h3
            className="text-md font-semibold text-gray-800 break-words"
            title={tour.title}
          >
            {tour.title}
          </h3>

          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
            <span className="text-sm text-gray-700">
              {tour.rating?.toFixed(1)}
            </span>
            <span className="text-sm text-gray-700">({tour.views})</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
          <span>Pickup Available</span>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-blue-800 rounded-full inline-block"></span>
            <span>{tour.duration ?? "N/A"}</span>
          </div>
        </div>

        <div className="mt-2 text-gray-600 font-bold">
          <p className="text-gray-500 font-light">
            From{" "}
            <span className="text-blue-600 font-semibold">
              {parseFloat(tour.price)}${" "}
            </span>
            per Person
          </p>
        </div>
      </div>
    </div>
  );
}
