import Cars from "@/components/profile/MyBooking/Cars";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { BookingCar } from "@/Types/Booking";

export default function MyCarsBookingPage() {
  const [loading, setLoading] = useState(false);
  const [bookingCars, setBookingCars] = useState<BookingCar[]>([]);

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const handleGetBookingCars = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}bookings/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        toast.success("Booking cars fetched successfully");
        setBookingCars(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [BASE_URL, token]);

  useEffect(() => {
    handleGetBookingCars();
  }, [handleGetBookingCars]);
  return (
    <>
      <Cars bookingCars={bookingCars} loading={loading} />
    </>
  );
}
