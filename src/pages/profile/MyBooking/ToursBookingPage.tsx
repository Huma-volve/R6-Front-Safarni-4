import Tours from "@/components/profile/MyBooking/Tours";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useCallback } from "react";
// import toast from "react-hot-toast";

export default function ToursBookingPage() {
  // const [loading, setLoading] = useState(false);
  // const [bookingTours, setBookingTours] = useState<BookingTour[]>([]);

  // const BASE_URL = import.meta.env.VITE_BASE_URL;
  // const token = "40|OCBC7IZByo8VotD5wprl56aAdzeEyNiaS59z64XG630f2c82";

  // const handleGetBookingTours = useCallback(async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(`${BASE_URL}bookings/my`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     if (response.status === 200) {
  //       toast.success("Booking cars fetched successfully");
  //       setBookingTours(response.data);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setLoading(false);
  //   }
  // }, [BASE_URL, token]);

  // useEffect(() => {
  //   handleGetBookingTours();
  // }, [handleGetBookingTours]);

  return (
    <>
      <Tours />
    </>
  );
}
