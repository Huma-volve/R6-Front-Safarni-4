import Cars from "@/components/profile/MyBooking/Cars";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { BookingCar } from "@/Types/Booking";

export default function CarsBookingPage() {
  const [loading, setLoading] = useState(false);
  const [bookingCars, setBookingCars] = useState<BookingCar[]>([]);

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = "40|OCBC7IZByo8VotD5wprl56aAdzeEyNiaS59z64XG630f2c82";

  const handleGetBookingCars = async () => {
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
  };

  useEffect(() => {
    handleGetBookingCars();
  }, []);
  return (
    <>
      <Cars bookingCars={bookingCars} loading={loading} />
    </>
  );
}
