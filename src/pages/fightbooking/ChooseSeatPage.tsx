import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import BackButton from "../../components/common/BackButton";
import { Loader2 } from "lucide-react";

interface Seat {
  id: number;
  seat_number: number;
  status: "available" | "booked";
}

interface Flight {
  id: number;
  airline: string;
  from: string;
  to: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  passengers: number;
}

const API_URL = `${import.meta.env.VITE_API_URL}/flights`;
const TOKEN = localStorage.getItem("token") || import.meta.env.VITE_TOKEN;

export default function ChooseSeatPage() {
  const location = useLocation();
  const flight = location.state as Flight;
  const [flightWithAirline, setFlightWithAirline] = useState<Flight | null>(
    null
  );
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeats = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/${flight.id}`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setSeats(data.data.flight_seats || []);
        setFlightWithAirline(data.data || null);
      } catch (error) {
        console.error("Error fetching flight seats:", error);
        setSeats([]);
      }
      setLoading(false);
    };
    fetchSeats();
  }, [flight.id]);

  const toggleSeat = (seat: Seat) => {
    if (seat.status === "booked") return;

    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats([]);
    } else {
      if (selectedSeats.length >= 1) {
        toast.error("You can only select 1 seat");
        return;
      }
      setSelectedSeats([seat.id]);
    }
  };

  const totalPrice = flight.price;

  const handleContinue = () => {
    if (selectedSeats.length !== 1) {
      toast.error("You must select 1 seat");
      return;
    }

    const seatId = selectedSeats[0];
    const flightId = flightWithAirline?.id || flight.id;
    console.log(seatId, flightId);

    navigate("/flights/boarding-pass", {
      state: {
        flight: flightWithAirline,
        selectedSeats,
        totalPrice,
        seatId,
        flightId,
      },
    });
  };

  return (
    <div className="p-8 mb-8">
      <Toaster position="top-center" />
      <div className="mb-6">
        <BackButton />
      </div>

      <div className="flex flex-col md:flex-row gap-10 h-[calc(100vh-130px)]">
        {/* Left side */}
        <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-2xl p-6">
          <img
            src="/src/assets/flightbooking.png"
            alt="Airplane"
            className="w-3/4 object-contain"
          />
        </div>

        {/* Right side */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6">Choose seat</h1>

          {/* Legend */}
          <div className="flex gap-6 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-primary"></span> Available
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-green-500"></span> Selected
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-gray-300"></span> Unavailable
            </div>
          </div>

          {/* Seats Grid */}
          {loading && <Loader2 />}
          {!loading && (
            <div className="grid grid-cols-5 gap-3 mb-8">
              {seats.map((seat) => {
                const isSelected = selectedSeats.includes(seat.id);
                const seatColor =
                  seat.status === "booked"
                    ? "bg-gray-300 cursor-not-allowed"
                    : isSelected
                    ? "bg-green-500 text-white"
                    : "bg-primary text-white";

                return (
                  <div
                    key={seat.id}
                    onClick={() => toggleSeat(seat)}
                    className={`w-12 h-12 flex items-center justify-center rounded font-semibold ${seatColor}`}
                  >
                    {seat.seat_number}
                  </div>
                );
              })}
            </div>
          )}

          {/* Summary */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Ticket price</span>
              <span className="font-semibold">${flight.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Price</span>
              <span className="font-semibold">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Your Seat</span>
              <span className="font-semibold">
                {selectedSeats.join(", ") || "-"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Airline</span>
              <span className="font-semibold">
                {flightWithAirline?.airline || "Loading..."}
              </span>
            </div>
          </div>

          <button
            onClick={handleContinue}
            className="mt-6 w-full bg-primary hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
