import { useState } from "react";
import Brands from "@/components/carsBrand/CarBrandCard";
import brand from "@/components/carsBrand/Brands";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay } from "swiper/modules";
import type { CarData } from "@/Types/CarDataTypes";
import CarPopularCard from "@/components/carsPopular/CarPopularCard";
import { useEffect } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function CarBookingPage() {
  const [cars, setCars] = useState<CarData[]>([]);
  const [CarLoading, setCarLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const handleGetCars = async () => {
    try {
      setCarLoading(true);
      const res = await axios.get(`${BASE_URL}cars`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("API Full Response:", res.data);
      setCars(res.data.cars || []);
    } catch (error) {
      console.error("Failed to fetch cars", error);
      setCars([]);
    } finally {
      setCarLoading(false);
    }
  };

  useEffect(() => {
    handleGetCars();
  }, []);

  if (CarLoading)
    return (
      <>
        <div className="flex items-center justify-center h-screen text-primary">
          <Loader2 className="w-16 h-16 animate-spin" />
        </div>
      </>
    );

  return (
    <div className="gap-14 flex flex-col container mx-auto my-8">
      {/* Brands Slider */}
      <div className="flex gap-4 justify-between">
        <Swiper
          spaceBetween={10}
          slidesPerGroup={3}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 4 },
            1000: { slidesPerView: 6 },
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {brand.map((item) => (
            <SwiperSlide key={item.id}>
              <Brands item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {cars.map((item: CarData) => (
          <CarPopularCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
