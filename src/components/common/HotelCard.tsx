import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

type HotelCardProps = {
  id: number;
  image?: string;
  image_url?: string;
  name: string;
  location: string;
  rating: number;
  discount?: string;
  variant?: "grid" | "list";
};

export default function HotelCard({
  id,
  image,
  image_url,
  name,
  location,
  rating,
  discount = "15%off",
  variant = "grid",
}: HotelCardProps) {
  return (
    <Link to={`/hotel-booking/${id}`}>
      <Card className={variant === "grid" ? "md:p-0 p-2" : "md:p-4 p-2"}>
        <CardContent className={variant === "grid" ? "p-4" : "flex gap-4 px-0"}>
          {/* Image */}
          <div
            className={`flex items-center justify-center rounded-xl overflow-hidden ${
              variant === "grid" ? "" : "shrink-0"
            }`}
          >
            <img
              src={image || image_url}
              alt="Hotel"
              className={`object-cover rounded-lg ${
                variant === "grid" ? "w-full h-48" : "w-32 h-32"
              }`}
            />
          </div>

          {/* Info */}
          <div
            className={`flex justify-between w-full ${
              variant === "grid" ? "pt-4" : ""
            }`}
          >
            <div className="flex flex-col gap-2 justify-center">
              {discount && (
                <p className="bg-primary/10 w-fit px-3 py-1 text-xs rounded-full text-primary text-center">
                  {discount}
                </p>
              )}
              <p className={`line-clamp-1 text-lg`}>{name}</p>
              <p className="text-muted text-sm md:text-md flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {location}
              </p>
            </div>

            {/* Rating */}
            <p className="flex gap-2 font-semibold text-sm md:text-md">
              <Star className="w-5 h-5 text-secondary fill-secondary" />
              {rating}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
