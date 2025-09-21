import { Card } from "@/components/ui/card";
import { Calendar, Clock, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import type { CarData } from "@/Types/CarDataTypes";
import axios from "axios";

export default function CarDetails() {
  const { id } = useParams();
  const carId = Number(id);
  const [carDetails, setCarDetails] = useState<CarData | null>(null);
  const [carDetailsLoading, setCarDetailsLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleGetCarDetails = async (carId: number | string) => {
    try {
      setCarDetailsLoading(true);
      const { data } = await axios.get(`${BASE_URL}cars/${carId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setCarDetails(data as CarData);
    } catch (error) {
      console.error("Failed to fetch car details:", error);
      setCarDetails(null);
    } finally {
      setCarDetailsLoading(false);
    }
  };

  useEffect(() => {
    handleGetCarDetails(carId);
  }, [carId]);

  if (carDetailsLoading)
    return (
      <>
        <div className="flex items-center justify-center h-screen text-primary">
          <Loader2 className="w-16 h-16 animate-spin text-primary" />
        </div>
      </>
    );

  return (
    <main className="container h-[calc(100vh-100px)] flex items-center">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        <div className="bg-white rounded-md flex justify-center items-center">
          <img
            src={carDetails?.category.image_url}
            alt={carDetails?.brand}
            onError={(e) =>
              (e.currentTarget.src = "/src/assets/images/64027.jpg")
            }
            loading="lazy"
            className="w-66 h-42 object-cover rounded-md hover:scale-105 transition-transform duration-300"
          />
        </div>
        <section className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-left font-semibold text-md">Popular Cars</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-2 text-center border border-gray-300 rounded-md">
                <h3 className="text-base lg:text-lg font-semibold">Power</h3>
                <span>{carDetails?.transmission}</span>
              </div>
              <div className="p-2 text-center border border-gray-300 rounded-md">
                <h3 className="text-base lg:text-lg font-semibold">
                  Fuel Type
                </h3>
                <span>{carDetails?.fuel_type}</span>
              </div>
              <div className="text-center p-2 border border-gray-300 rounded-md">
                <h3 className="text-base lg:text-lg font-semibold">
                  Max Speed
                </h3>
                <span>{carDetails?.daily_rate}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-left font-semibold text-md">Plan</h2>
            <div className="grid gap-3">
              <Card className="flex items-center gap-3 p-4 bg-blue-50">
                <Clock className="w-6 h-6 text-blue-600" />
                <div className="flex flex-col">
                  <span className="font-semibold text-blue-700">$10</span>
                  <span className="text-sm text-gray-600">
                    Hourly Rent - Best for business appointments
                  </span>
                </div>
              </Card>
              <Card className="flex items-center gap-3 p-4 bg-green-50">
                <Calendar className="w-6 h-6 text-green-600" />
                <div className="flex flex-col">
                  <span className="font-semibold text-green-700">$80</span>
                  <span className="text-sm text-gray-600">
                    Daily Rent - Best for longer trips
                  </span>
                </div>
              </Card>
            </div>
          </div>

          <div className="w-full">
            <Link
              to="/MapWithRoute"
              state={{ selectedCar: carDetails }}
              className="w-full block text-center bg-[#1E429F] hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-md shadow-md transition-all"
            >
              Pick Up
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
