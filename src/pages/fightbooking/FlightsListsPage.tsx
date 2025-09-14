import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../components/common/BackButton";

interface Flight {
  id: number;
  from: string;
  to: string;
  departure_time: string;
  arrival_time: string;
  price: number;
}

interface SearchValues {
  from: string;
  to: string;
  departure: string;
  returnDate: string;
  passengers: number;
}

const API_URL = `${import.meta.env.VITE_API_URL}/flights`;
const TOKEN = localStorage.getItem("token") || import.meta.env.VITE_TOKEN;

export default function FlightsList() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchValues = location.state as SearchValues;
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        const allFlights: Flight[] = data.data || [];

        const filtered = allFlights.filter((f) => {
          const matchesFrom =
            searchValues.from === "" ||
            f.from.toLowerCase().includes(searchValues.from.toLowerCase());

          const matchesTo =
            searchValues.to === "" ||
            f.to.toLowerCase().includes(searchValues.to.toLowerCase());

          const matchesDeparture =
            searchValues.departure === "" ||
            f.departure_time.slice(0, 10) === searchValues.departure;

          const matchesReturn =
            searchValues.returnDate === "" ||
            f.arrival_time.slice(0, 10) === searchValues.returnDate;

          return matchesFrom && matchesTo && matchesDeparture && matchesReturn;
        });

        setFlights(filtered);
      } catch (error) {
        console.error("Error fetching flights:", error);
        setFlights([]);
      }
      setLoading(false);
    };

    fetchFlights();
  }, [searchValues]);

  return (
    <div className="p-6 h-auto">
      <div className="mb-6">
        <BackButton />
      </div>

      <h1 className="text-2xl font-bold mb-6">Available Flights ✈️</h1>

      {loading && <Loader2 className="animate-spin w-5 h-5 text-white" />}
      {!loading && flights.length === 0 && (
        <p className="text-gray-600">No flights found.</p>
      )}
      {flights.length > 0 && (
        <div className="grid gap-4">
          {flights.map((flight) => (
            <div
              key={flight.id}
              onClick={() =>
                navigate("/flights/choose-seat", {
                  state: { ...flight, passengers: searchValues.passengers },
                })
              }
              className="border p-4 rounded-lg shadow bg-white flex justify-between cursor-pointer hover:bg-gray-100"
            >
              <div>
                <p className="font-semibold ">
                  {flight.from} → {flight.to}
                </p>
                <p>
                  Departure: {flight.departure_time.slice(0, 10)} <br />
                  Arrival: {flight.arrival_time.slice(0, 10)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">${flight.price}</p>
                <p className="text-sm text-gray-500">
                  {searchValues.passengers} Passenger(s)
                </p>
                <p className="text-sm text-gray-500">Click to choose seat</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
