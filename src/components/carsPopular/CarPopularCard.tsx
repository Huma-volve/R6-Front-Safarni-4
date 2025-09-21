import type { CarData } from "@/Types/CarDataTypes";
import { Link } from "react-router-dom";

type PopularCarsCardProps = {
  item: CarData;
};
export default function CarPopularCard({ item }: PopularCarsCardProps) {
  return (
    <>
      <div className="px-6 pb-4 shadow-sm rounded-xl hover:shadow-md transition-shadow duration-300">
        <div className="flex justify-between items-center  ">
          <h2 className="font-semibold text-lg md:text-md lg:text-xl">
            {item.model}
          </h2>
          <div>
            <img
              src={item.category.image_url}
              onError={(e) =>
                (e.currentTarget.src = "/src/assets/images/64027.jpg")
              }
              alt={item.brand}
              loading="lazy"
              className="w-44 h-32 object-fill rounded-md hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <div className="flex justify-between mb-4 text-gray-500 text-sm md:text-base">
          <span className="flex items-center gap-1">{item.transmission}</span>
          <span className="flex items-center gap-1">{item.seats} seats</span>
          <span className="flex items-center gap-1">{item.fuel_type}</span>
        </div>

        <div className="flex gap-3">
          <Link
            to="/MapWithRoute"
            className="bg-[#1E429F] hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-md shadow-md transition-all"
          >
            Rent Now
          </Link>
          <Link
            to={`/CarDetails/${item.id}`}
            className="bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 px-6 py-2 rounded-md transition"
          >
            Details
          </Link>
        </div>
      </div>
    </>
  );
}
