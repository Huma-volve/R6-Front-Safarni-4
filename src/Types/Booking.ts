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

export interface BookingCar {
  id: number;
  user_id: number;
  car_id: number;
  pickup_date: string;
  return_date: string;
  total_price: number;
  status: "pending" | "completed" | "cancelled";
  created_at: string;
  updated_at: string;
  payment_id: number;
  car: {
    id: number;
    model: string;
    brand: string;
    daily_rate: number;
    seats: number;
    transmission: string;
    fuel_type: string;
    has_ac: number;
    category_id: number;
    created_at: string;
    updated_at: string;
    category: {
      id: number;
      name: string;
      description: string;
      image_url: string;
      created_at: string;
      updated_at: string;
    };
  };
}
