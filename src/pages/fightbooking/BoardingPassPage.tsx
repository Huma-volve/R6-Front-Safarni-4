import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

const API_URL = `${import.meta.env.VITE_BASE_URL}`;
const TOKEN = localStorage.getItem("token") || import.meta.env.VITE_TOKEN;

interface Flight {
  id: number;
  airline: string;
  from: string;
  to: string;
  departure_time: string;
  arrival_time: string;
  price: number;
}

// Define the type for location.state to avoid 'any'
interface LocationState {
  flight?: Flight;
  selectedSeats?: number[];
  totalPrice?: number;
  seatId?: number;
  flightId?: number;
}

export default function BoardingPassPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  const user = userContext?.user;

  const state = location.state as LocationState;
  const stateFlight = state.flight;
  const selectedSeats = state.selectedSeats || [];
  const totalPrice = state.totalPrice || 0;
  const seatId = state.seatId;
  const flightId = state.flightId;

  const [flight, setFlight] = useState<Flight | null>(stateFlight || null);
  const [loading, setLoading] = useState(!stateFlight);

  useEffect(() => {
    if (flight) return;

    const query = new URLSearchParams(location.search);
    const qFlightId = query.get("flightId");
    if (!qFlightId) return;

    const fetchFlight = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}booking/flight`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setFlight(data.data);
      } catch (error) {
        console.error("Error fetching flight:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlight();
  }, [flight, location.search]);

  const handleCheckout = async () => {
    if (!flightId || !seatId) {
      console.error("Missing flightId or seatId");
      return;
    }

    try {
      const res = await fetch(`${API_URL}booking/flight`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flight_id: flightId,
          seat_id: seatId,
        }),
      });

      const data = await res.json();

      if (res.ok && data.data?.booking) {
        const bookingId = data.data.booking.id;
        console.log("Booking successful:", data.data.booking.id);

        navigate(`/checkout?booking_id=${bookingId}&booking_type=flight`);
      } else {
        console.error("Booking failed:", data);
      }
    } catch (error) {
      console.error("Error booking flight:", error);
    }
  };

  if (loading || !flight) return <Loader2 />;

  return (
    <div className="p-8">
      <div className="mb-6">
        <BackButton router={-1} />
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Left side*/}
        <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-2xl p-6">
          <img
            src="/src/assets/flightbooking.png"
            alt="Airplane"
            className="w-3/4 object-contain"
          />
        </div>

        {/* Right side */}
        <div className="flex-1 bg-white rounded-2xl shadow p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Boarding Pass</h1>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold">{flight.from}</span>
              <span>✈️</span>
              <span className="font-semibold">{flight.to}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="font-semibold">{flight.airline}</span>
              <span>
                {new Date(flight.departure_time).toLocaleDateString("en-US", {
                  dateStyle: "medium",
                })}
              </span>
            </div>

            <div className="flex justify-between text-sm items-center">
              <span>
                {new Date(flight.departure_time).toLocaleTimeString("en-US", {
                  timeStyle: "short",
                })}
              </span>

              <span className="text-gray-500 text-xs">
                {(() => {
                  const dep = new Date(flight.departure_time);
                  const arr = new Date(flight.arrival_time);

                  let diffHours = arr.getHours() - dep.getHours();
                  let diffMinutes = arr.getMinutes() - dep.getMinutes();

                  // if minutes negative, borrow 1 hour
                  if (diffMinutes < 0) {
                    diffMinutes += 60;
                    diffHours -= 1;
                  }

                  // if hours negative or zero, arrival is next day
                  if (diffHours <= 0) {
                    diffHours += 24;
                  }

                  return `${diffHours}h ${diffMinutes}m`;
                })()}
              </span>

              <span>
                {new Date(flight.arrival_time).toLocaleTimeString("en-US", {
                  timeStyle: "short",
                })}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Total Price</span>
              <span className="font-semibold">${totalPrice?.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 p-4 rounded-lg border">
            {/* Profile Pic + Name (Left) */}
            <div className="flex items-center gap-3">
              <img
                src={user?.image || "/default-avatar.png"}
                alt={user?.name || "User"}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{user?.name || "Guest"}</p>
                <p className="text-gray-500 text-sm">
                  {user?.email || "No email"}
                </p>
              </div>
            </div>

            {/* Seat (Right) */}
            <p className="text-gray-700 font-medium">
              Seat: {selectedSeats[0] || "-"}
            </p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mt-6">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                `${window.location.origin}/flights/boarding-pass?flightId=${flight.id}`
              )}`}
              alt="QR Code"
              className="rounded-lg"
            />
          </div>

          <button
            className="mt-6 w-full bg-primary hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            onClick={handleCheckout}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
