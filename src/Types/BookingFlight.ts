export interface Flight {
  id: number;
  category_id: number;
  airline: string;
  from: string;
  to: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  created_at: string;
  updated_at: string;
  flight_seats: [
    {
      id: number;
      flight_id: number;
      seat_number: number;
      status: string;
      created_at: string;
      updated_at: string;
    }
  ];
}

export interface BookingFlight {
  id: number;
  user_id: number;
  flight_id: number;
  seat_id: number;
  booking_date: string;
  total_price: number;
  status: "pending" | "completed" | "cancelled";
  created_at: string;
  updated_at: string;
}
