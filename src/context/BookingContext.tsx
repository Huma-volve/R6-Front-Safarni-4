// context/BookingContext.tsx
import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface BookingData {
  car_id: number;
  pickup_date: string;
  return_date: string;
}

interface BookingContextType {
  bookCar: (bookingData: BookingData) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const bookCar = async (bookingData: BookingData) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Sending booking data:", bookingData);

      const { data } = await axios.post(
        "http://round5-safarnia.huma-volve.com/api/bookings",
        bookingData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Booking response:", data);

      // Update checkout context

      // Navigate to payment page
      navigate("/payment", {
        state: {
          car_id: bookingData.car_id,
          pickup_date: bookingData.pickup_date,
          return_date: bookingData.return_date,
          booking_type: "car",
          booking_id: data.id,
        },
      });
    } catch (err) {
      console.error("Booking failed:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Booking failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BookingContext.Provider value={{ bookCar, isLoading, error }}>
      {children}
    </BookingContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingContext must be used within BookingProvider");
  }
  return context;
};
