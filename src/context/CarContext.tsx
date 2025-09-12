import { createContext, useState, useEffect } from "react";
import axios from "axios";
import type { BookingCar } from "@/Types/Booking";

const CarContext = createContext<{
  cars: BookingCar[] | null;
  CarLoading: boolean;
  setCarLoading: (loading: boolean) => void;
  handleGetCars: () => void;
}>({
  cars: null,
  CarLoading: false,
  setCarLoading: () => {},
  handleGetCars: () => {},
});

export const CarProvider = ({ children }: { children: React.ReactNode }) => {
  const [cars, setCars] = useState<BookingCar[] | null>(null);
  const [CarLoading, setCarLoading] = useState(false);

  const handleGetCars = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
      setCarLoading(true);
      const response = await axios.get(`${BASE_URL}cars`, {
        headers: {
          Authorization: `Bearer 40|OCBC7IZByo8VotD5wprl56aAdzeEyNiaS59z64XG630f2c82`,
        },
      });
console.log(response);
      if (response.status === 200) {
        const data = response.data.data; // Assuming response = { data: [cars] }
        setCars(data);
      }
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    } finally {
      setCarLoading(false);
    }
  };

  useEffect(() => {
    handleGetCars();
  }, []);

  return (
    <CarContext.Provider
      value={{ cars, CarLoading, setCarLoading, handleGetCars }}
    >
      {children}
    </CarContext.Provider>
  );
};

export default CarContext;
