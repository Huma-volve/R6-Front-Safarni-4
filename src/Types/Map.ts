export interface Map {
  Place: { id: string; name: string; lat: number; lng: number };
  Tab: "main" | "restaurants" | "tourist" | "hotels";
}
