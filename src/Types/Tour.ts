export type ApiTour = {
  id: number;
  title: string;
  location: string;
  description: string;
  price: string;
  image: string;
  views: number;
  is_recommended: boolean;
  is_favorite: boolean;
  rating: number;
};

export type ApiResponse = {
  data: ApiTour[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    path: string;
    from: number;
    to: number;
  };
};

export type Tour = {
  id: string;
  title: string;
  location: string;
  desc: string;
  priceFrom: number;
  img: string;
  rating: number;
  isFavorite: boolean;
  isRecommended: boolean;
  tag: string;
};

export type ReviewUser = { id: number; name: string };

export type Review = {
  id: number;
  tour_id: number;
  user_id: number;
  rating: number; // 1..5
  review: string;
  created_at: string; // ISO
  user: ReviewUser;
};

export type ReviewsResponse = {
  status: number;
  message: string;
  data: {
    tour_id: number;
    total_reviews: number;
    reviews: Review[];
  };
};
