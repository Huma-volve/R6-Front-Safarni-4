export interface User {
  user: {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    country: string | null;
    image: string | null;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
  };
  status: {
    total_bookings: number;
    total_reviews: number;
    member_since: string;
  };
}
