// context/CarContext.tsx
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import type { CarData } from "@/Types/CarDataTypes";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const CarContext = createContext<{
  cars: CarData[] | null;
  carDetails: CarData | null;
  CarLoading: boolean;
  CarDetailsLoading: boolean;
  handleGetCars: () => void;
  handleGetCarDetails: (carId: number | string) => void;
}>({
  cars: null,
  carDetails: null,
  CarLoading: false,
  CarDetailsLoading: false,
  handleGetCars: () => {},
  handleGetCarDetails: () => {},
});

export const CarProvider = ({ children }: { children: React.ReactNode }) => {
  const [cars, setCars] = useState<CarData[] | null>(null);
  const [carDetails, setCarDetails] = useState<CarData | null>(null);
  const [CarLoading, setCarLoading] = useState(false);
  const [CarDetailsLoading, setCarDetailsLoading] = useState(false);

  const handleGetCars = async () => {
    try {
      setCarLoading(true);
      const { data } = await axios.get(`${BASE_URL}/cars`);
      console.log(data);
      setCars(data as CarData[]);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    } finally {
      setCarLoading(false);
    }
  };

  const handleGetCarDetails = async (carId: number | string) => {
    try {
      setCarDetailsLoading(true);
      const { data } = await axios.get(`${BASE_URL}/cars/${carId}`);
      setCarDetails(data as CarData);
    } catch (error) {
      console.error("Failed to fetch car details:", error);
    } finally {
      setCarDetailsLoading(false);
    }
  };

  useEffect(() => {
    handleGetCars();
  }, []);

  return (
    <CarContext.Provider
      value={{
        cars,
        carDetails,
        CarLoading,
        CarDetailsLoading,
        handleGetCars,
        handleGetCarDetails,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export default CarContext;
