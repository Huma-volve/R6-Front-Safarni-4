import type { BookingCar } from "@/Types/Booking";
import BorderedContainer from "@/components/common/BorderedContainer";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "../../ui/card";

type CarsProps = {
  bookingCars: BookingCar[];
  loading: boolean;
};

export default function Cars({ bookingCars, loading }: CarsProps) {
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-[calc(100vh-300px)]">
          <Loader2 className="w-20 h-20 text-primary animate-spin" />
        </div>
      ) : bookingCars.length === 0 ? (
        <div className="flex items-center justify-center w-full h-[calc(100vh-500px)]">
          <h1 className="text-2xl font-medium text-muted">No Cars Found</h1>
        </div>
      ) : (
        bookingCars.map((car: BookingCar) => (
          <BorderedContainer key={car.id} className="my-12">
            <Card>
              <CardContent className="flex flex-col p-0 text-sm md:text-base relative">
                <p className="text-xl font-medium">{car.car.model}</p>
                <div className="flex items-center justify-between w-[80%] mt-6 text-muted text-sm md:text-base">
                  <p>{car.car.transmission}</p>
                  <p className="border-l-2 px-2">{car.car.seats + " Seats"}</p>
                  <p className="border-l-2 px-2">{car.car.fuel_type}</p>
                </div>
                <div className="absolute -top-5 -right-8 md:-top-15 md:-right-14 z-50">
                  <img
                    src={car.car.category.image_url}
                    alt="Car Image"
                    className="object-cover w-full h-16 md:w-full md:h-full"
                  />
                </div>
              </CardContent>
            </Card>
          </BorderedContainer>
        ))
      )}
    </>
  );
}
