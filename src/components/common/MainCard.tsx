import { Card } from "../ui/card";
import { Heart, Star } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Dot } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

interface MainCardProps {
  item: any;
  onHeartClick: () => void;
}

export default function MainCard({ item, onHeartClick }: MainCardProps) {
  const location = useLocation();

  const handleAddToFavorite = async (id: number) => {
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const token = localStorage.getItem("token");

      const response = await axios.post(`${BASE_URL}favorites/add/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Added to favorites successfully");
        // onHeartClick();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleRemoveFromFavorite = async (id: number) => {
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${BASE_URL}favorites/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Removed from favorites successfully");
        onHeartClick();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Link to={`/tours/${item.id}`} >
        <Card className="md:p-4 p-2 shadow-gray-300 shadow-2xl relative rounded-3xl">
          <div className="rounded-3xl overflow-hidden">
            <img src={item.image} alt="" className="w-full h-62 object-cover" />
          </div>

          <div
            className="absolute top-8 right-8 bg-white rounded-full p-2 cursor-pointer"
            onClick={() =>
              item.is_favorite || item.favorited_at === null
                ? handleRemoveFromFavorite(item.id)
                : handleAddToFavorite(item.id)
            }
          >
            <Heart
              className={`w-5 h-5 ${location.pathname === "/favorite" || item.is_favorite
                ? "fill-red-500 text-red-500"
                : "text-muted"
                }`}
            />
          </div>

          <Link to={`/destination/${item.id}`} key={item.id}>
            <div className="flex flex-col mt-2 text-muted p-4 md:p-0">
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold text-black">
                  {item.title.split(" ").slice(0, 2).join(" ")}
                </h1>
                <p className="text-muted flex items-center gap-2 text-xsm">
                  <Star className="w-5 h-5 text-secondary fill-secondary" />
                  {item.rating.toFixed(1) + " (" + item.views + ")"}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="line-clamp-1">{item.location}</p>
                <p className="flex items-center">
                  <Dot className="w-10 h-10 text-primary" />
                  {item.transportation}
                </p>
              </div>

              <p>
                From{" "}
                <span className="text-primary font-semibold">
                  {Math.floor(item.price)}$
                </span>{" "}
                per person
              </p>
            </div>
          </Link>
        </Card>
      </Link>
    </>
  );
}
