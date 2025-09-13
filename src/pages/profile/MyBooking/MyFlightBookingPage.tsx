import Flights from "@/components/profile/MyBooking/Flights";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import type { BookingFlight, Flight } from "@/Types/Booking";
import toast from "react-hot-toast";

export default function MyFlightBookingPage() {
  const [bookingFlights, setBookingFlights] = useState<BookingFlight[]>([]);
  const [bookingFlightsDetails, setBookingFlightsDetails] = useState<Flight[]>(
    []
  );
  const [flightIDs, setFlightIDs] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  // Step 1: get flight IDs from my bookings
  const handleGetBookingFlights = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}my-bookings/flight`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        const ids = response.data.data.map(
          (booking: BookingFlight) => booking.flight_id
        );
        const BookingData = response.data.data;
        setFlightIDs(ids);
        setBookingFlights(BookingData);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [BASE_URL, token]);

  // Step 2: fetch full flight details when IDs are ready
  const handleGetFlights = useCallback(
    async (ids: number[]) => {
      try {
        setLoading(true);
        const requests = ids.map((id) =>
          axios.get(`${BASE_URL}flights/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        );
        const responses = await Promise.all(requests);
        if (responses.every((res) => res.status === 200)) {
          toast.success("Flights fetched successfully");
          const flightsData = responses.map((res) => res.data.data);
          setBookingFlightsDetails(flightsData);
          setLoading(false);
        }
      } catch (error) {
        toast.error("Failed to fetch booking flights");
        setLoading(false);
        console.error(error);
      }
    },
    [BASE_URL, token]
  );

  // Run on mount
  useEffect(() => {
    handleGetBookingFlights();
  }, [handleGetBookingFlights]);

  // Run when IDs are ready
  useEffect(() => {
    if (flightIDs.length > 0) {
      handleGetFlights(flightIDs);
    }
  }, [flightIDs, handleGetFlights]);

  return (
    <Flights
      flights={bookingFlightsDetails}
      loading={loading}
      allFlights={bookingFlights}
    />
  );
}
