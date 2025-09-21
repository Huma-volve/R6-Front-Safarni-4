import { useContext } from "react";
import Brands from "@/components/carsBrand/CarBrandCard";
import brand from "@/components/carsBrand/Brands";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay } from "swiper/modules";
import CarContext from "@/context/CarContext";
import type { CarData } from "@/Types/CarDataTypes";
import CarPopularCard from "@/components/carsPopular/CarPopularCard";

export default function CarBookingPage() {
  const { cars, CarLoading } = useContext(CarContext);

  if (CarLoading) return <p>Loading cars...</p>;

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
        {cars?.map((item: CarData) => (
          <CarPopularCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
