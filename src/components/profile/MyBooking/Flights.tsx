import { Loader2, Plane, Timer } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import BorderedContainer from "./../../common/BorderedContainer";
import type { BookingFlight, Flight } from "../../../Types/BookingFlight";

type FlightsProps = {
  flights: Flight[];
  loading: boolean;
  allFlights: BookingFlight[];
};

const formatTime = (date: Date) =>
  `${String(date.getHours()).padStart(2, "0")}h${String(
    date.getMinutes()
  ).padStart(2, "0")}`;

const getTimeDifference = (dep: string, arr: string) => {
  const depDate = new Date(dep);
  const arrDate = new Date(arr);

  const depMinutes = depDate.getHours() * 60 + depDate.getMinutes();
  const arrMinutes = arrDate.getHours() * 60 + arrDate.getMinutes();

  let diff = arrMinutes - depMinutes;

  if (diff < 0) diff += 24 * 60;

  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  return `${hours}h ${minutes}m`;
};

export default function Flights({
  flights,
  loading,
  allFlights,
}: FlightsProps) {
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-[calc(100vh-300px)]">
          <Loader2 className="w-20 h-20 text-primary animate-spin" />
        </div>
      ) : flights.length === 0 ? (
        <div className="flex items-center justify-center w-full h-[calc(100vh-500px)]">
          <h1 className="text-2xl font-medium text-muted">No Flights Found</h1>
        </div>
      ) : (
        flights.map((flight: Flight) => {
          const dep = new Date(flight.departure_time);
          const arr = new Date(flight.arrival_time);

          return (
            <BorderedContainer key={flight.id} className="mb-6">
              <Card>
                <CardContent className="flex flex-col p-0 text-sm md:text-base">
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-2">
                      <Plane className="text-red-500 w-5 h-5" />
                      {"Air " + flight.airline}
                    </p>
                    <p>
                      {dep.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p>{formatTime(dep)}</p>
                    <p>{formatTime(arr)}</p>
                  </div>

                  <div className="flex items-end justify-between border-b-2">
                    <p>{flight.from}</p>
                    <p className="flex items-center flex-col gap-2">
                      <Timer className="w-5 h-5 text-muted" />
                      {getTimeDifference(
                        flight.departure_time,
                        flight.arrival_time
                      )}
                    </p>
                    <p>{flight.to}</p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center flex-col gap-2">
                      <p className="text-muted">{flight.price}</p>
                      <p className="text-sm">Price</p>
                    </div>
                    <div className="flex items-center flex-col gap-2">
                      <p className="text-muted">
                        {
                          allFlights.find((f) => f.flight_id === flight.id)
                            ?.seat_id
                        }
                      </p>
                      <p className="text-sm">Seat</p>
                    </div>
                    <div className="flex items-center flex-col gap-2">
                      <p className="text-muted">{flight.flight_seats.length}</p>
                      <p className="text-sm">No.Seats</p>
                    </div>
                    <div className="flex items-center flex-col gap-2">
                      <p className="text-muted">{flight.id}</p>
                      <p className="text-sm">Flight</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </BorderedContainer>
          );
        })
      )}
    </>
  );
}
