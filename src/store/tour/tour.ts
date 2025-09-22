// src/store/tour/tour.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  ApiResponse,
  ApiTour,
  Review,
  ReviewsResponse,
  Tour,
} from "../../Types/Tour";

const API = "http://round5-safarnia.huma-volve.com/api/tours";

const mapTour = (t: ApiTour): Tour => ({
  id: String(t.id),
  title: t.title,
  location: t.location,
  desc: t.description,
  priceFrom: Number.parseFloat(t.price),
  img: t.image,
  rating: Math.round((t.rating ?? 0) * 10) / 10,
  isFavorite: !!t.is_favorite,
  isRecommended: !!t.is_recommended,
  tag: "Full Day Tours",
});

export const fetchTours = createAsyncThunk<Tour[]>("tours/fetch", async () => {
  const res = await fetch(API);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json: ApiResponse = await res.json();
  return (json?.data ?? []).map(mapTour);
});

export type TourDetails = Tour & {
  slots: { slot_id: number; max_seats: number }[];
  duration: number;
  highlights: string[];
  guide: string;
  transportation: string;
};

type DetailsResponse = {
  status: number;
  message: string;
  data: {
    id: number;
    title: string;
    location: string;
    description: string;
    price: string;
    image: string;
    slots: { slot_id: number; max_seats: number }[];
    duration: number;
    highlights: string[];
    guide: string;
    transportation: string;
    rating?: number;
  };
};

const mapDetails = (d: DetailsResponse["data"]): TourDetails => ({
  id: String(d.id),
  title: d.title,
  location: d.location,
  desc: d.description,
  priceFrom: Number.parseFloat(d.price),
  img: d.image,
  rating: Math.round((d.rating ?? 0) * 10) / 10,
  isFavorite: false,
  isRecommended: false,
  tag: "Full Day Tours",
  slots: d.slots || [],
  duration: d.duration,
  highlights: d.highlights || [],
  guide: d.guide,
  transportation: d.transportation,
});

export const fetchTourDetails = createAsyncThunk<TourDetails, string>(
  "tours/details",
  async (id: string) => {
    const res = await fetch(`${API}/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json: DetailsResponse = await res.json();
    return mapDetails(json.data);
  }
);

export type ToursState = {
  items: Tour[];
  loading: boolean;
  error: string | null;
  fav: Record<string, true>;
  details: TourDetails | null;
  detailsLoading: boolean;
  detailsError: string | null;
  reviews: Review[];
  reviewsLoading: boolean;
  reviewsError: string | null;
};

const initialState: ToursState = {
  items: [],
  loading: false,
  error: null,
  fav: {},
  details: null,
  detailsLoading: false,
  detailsError: null,
  reviews: [],
  reviewsLoading: false,
  reviewsError: null,
};

export const fetchTourReviews = createAsyncThunk<Review[], string>(
  "tours/reviews",
  async (id: string) => {
    const res = await fetch(`${API}/${id}/reviews`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json: ReviewsResponse = await res.json();
    return json.data?.reviews ?? [];
  }
);

const toursSlice = createSlice({
  name: "tours",
  initialState,
  reducers: {
    clearDetails(state) {
      state.details = null;
      state.detailsError = null;
      state.detailsLoading = false;
      state.reviews = [];
      state.reviewsError = null;
      state.reviewsLoading = false;
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchTours.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(fetchTours.fulfilled, (s, a) => {
      s.loading = false;
      s.items = a.payload.map((t) => ({
        ...t,
        isFavorite: s.fav[t.id] ? true : t.isFavorite,
      }));
    });
    b.addCase(fetchTours.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error.message || "Failed to load";
    });

    b.addCase(fetchTourDetails.pending, (s) => {
      s.detailsLoading = true;
      s.detailsError = null;
    });
    b.addCase(fetchTourDetails.fulfilled, (s, a) => {
      s.detailsLoading = false;
      s.details = a.payload;
    });
    b.addCase(fetchTourDetails.rejected, (s, a) => {
      s.detailsLoading = false;
      s.detailsError = a.error.message || "Failed to load";
    });
    b.addCase(fetchTourReviews.pending, (s) => {
      s.reviewsLoading = true;
      s.reviewsError = null;
    });
    b.addCase(fetchTourReviews.fulfilled, (s, a) => {
      s.reviewsLoading = false;
      s.reviews = a.payload;
    });
    b.addCase(fetchTourReviews.rejected, (s, a) => {
      s.reviewsLoading = false;
      s.reviewsError = a.error.message || "Failed to load reviews";
    });
  },
});

export const { clearDetails } = toursSlice.actions;
export default toursSlice.reducer;
