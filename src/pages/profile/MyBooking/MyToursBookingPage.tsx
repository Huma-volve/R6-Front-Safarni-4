import type { Tour } from "@/Types/Tours";
import Tours from "@/components/profile/MyBooking/Tours";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyToursBookingPage() {
  const [loading, setLoading] = useState(false);
  const [bookedToursIDs, setBookedToursIDs] = useState<number[]>([]);
  const [toursDetails, setToursDetails] = useState<Tour[]>([]);

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const getAllBookedTours = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}my-tour-bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        const ids = response.data.data.map((tour: Tour) => tour.tour_id);
        setBookedToursIDs(ids);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getToursDetails = async (ids: number[]) => {
    try {
      setLoading(true);
      const requests = ids.map((id) =>
        axios.get(`${BASE_URL}tours/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      );
      const responses = await Promise.all(requests);
      if (responses.every((res) => res.status === 200)) {
        toast.success("Booked Tours fetched successfully");
        const toursData = responses.map((res) => res.data.data);
        setToursDetails(toursData);
        console.log(toursData);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Failed to fetch booked tours details");
    }
  };

  useEffect(() => {
    getAllBookedTours();
  }, []);

  useEffect(() => {
    if (bookedToursIDs.length > 0) {
      getToursDetails(bookedToursIDs);
    }
  }, [bookedToursIDs]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <Loader2 className="animate-spin text-primary w-20 h-20" />
        </div>
      ) : bookedToursIDs.length === 0 ? (
        <h1>No Tours Booked</h1>
      ) : (
        toursDetails.map((tour: Tour) => (
          <Tours key={tour.id} tourDetails={tour} />
        ))
      )}
    </>
  );
}
