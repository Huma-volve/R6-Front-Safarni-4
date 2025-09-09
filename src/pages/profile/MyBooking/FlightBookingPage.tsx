import Flights from "@/components/profile/MyBooking/Flights";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import type { BookingFlight, Flight } from "@/Types/Booking";
import toast from "react-hot-toast";

export default function FlightBookingPage() {
  const [bookingFlights, setBookingFlights] = useState<BookingFlight[]>([]);
  const [bookingFlightsDetails, setBookingFlightsDetails] = useState<Flight[]>(
    []
  );
  const [flightIDs, setFlightIDs] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = "40|OCBC7IZByo8VotD5wprl56aAdzeEyNiaS59z64XG630f2c82";

  // Step 1: get flight IDs from my bookings
  const handleGetBookingFlights = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}my-bookings/flight`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        toast.success("Booking flights fetched successfully");
        const ids = response.data.data.map(
          (booking: BookingFlight) => booking.flight_id
        );
        const BookingData = response.data.data;
        setFlightIDs(ids);
        setBookingFlights(BookingData);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch booking flights");
      setLoading(false);
    }
  }, [BASE_URL, token]);

  // Step 2: fetch full flight details when IDs are ready
  const handleGetFlights = useCallback(
    async (ids: number[]) => {
      try {
        const requests = ids.map((id) =>
          axios.get(`${BASE_URL}flights/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        );

        const responses = await Promise.all(requests);
        const flightsData = responses.map((res) => res.data.data);
        setBookingFlightsDetails(flightsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
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
