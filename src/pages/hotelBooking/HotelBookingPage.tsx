import { useEffect, useState } from "react";
import BackButton from "../../components/common/BackButton";
import SearchBar from "../../components/common/SearchBar";
import axios from "axios";
import HotelCard from "@/components/common/HotelCard";
import type { Hotel } from "@/Types/hotels";
import { Loader2, X } from "lucide-react";
import { toast } from "react-hot-toast";

export default function HotelBookingPage() {
  const [recommendations, setRecommendations] = useState<Hotel[]>([]);
  const [nearby, setNearby] = useState<Hotel[]>([]);
  const [allhotels, setAllhotels] = useState<Hotel[]>([]);
  const [viewAll, setViewAll] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  // fetch all hotels (default)
  const getHotels = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}hotels`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        const data = response.data.data;
        setRecommendations(data.slice(0, 3));
        setNearby(data.slice(3));
        setAllhotels(data);
        toast.success("Hotels fetched successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // fetch hotels by search term
  const searchHotels = async (key: string) => {
    setSearchTerm(key);
    if (!key.trim()) {
      getHotels();
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}hotels/search?key=${key}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        const data = response.data.data;
        setAllhotels(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHotels();
  }, []);

  return (
    <>
      <div className="flex items-center gap-2 w-full">
        <BackButton router="/" />
        <div className="flex-1">
          <SearchBar
            placeholder="Search..."
            onChange={(value) => searchHotels(value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <Loader2 className="w-20 h-20 text-primary animate-spin" />
        </div>
      ) : (
        <>
          {/* If searching → show only allhotels */}
          {searchTerm || viewAll ? (
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-medium">
                  {searchTerm ? "Search Results" : "All Hotels"}
                </h1>
                <X
                  className={`w-5 h-5 cursor-pointer ${
                    viewAll ? "" : "hidden"
                  }`}
                  onClick={() => {
                    setViewAll(false);
                  }}
                />
              </div>
              {allhotels.length === 0 && (
                <p className="text-center text-2xl text-muted mt-4">
                  No hotels found
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
                {allhotels.map((hotel) => (
                  <HotelCard
                    key={hotel.id}
                    id={hotel.id}
                    image={hotel.image}
                    image_url={hotel.image_url}
                    name={hotel.name}
                    location={hotel.location}
                    rating={hotel.average_rating}
                    variant="grid"
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Recommendations */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-medium">Recommendations</h1>
                  <p
                    className="text-primary cursor-pointer"
                    onClick={() => setViewAll((prev) => !prev)}
                  >
                    View All
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
                  {recommendations.length === 0 && (
                    <p className="text-center">No hotels found</p>
                  )}
                  {recommendations.map((hotel) => (
                    <HotelCard
                      key={hotel.id}
                      id={hotel.id}
                      image={hotel.image}
                      image_url={hotel.image_url}
                      name={hotel.name}
                      location={hotel.location}
                      rating={hotel.average_rating}
                      variant="grid"
                    />
                  ))}
                </div>
              </div>

              {/* Nearby Hotels */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-medium">Nearby Hotels</h1>
                  <p
                    className="text-primary cursor-pointer"
                    onClick={() => setViewAll((prev) => !prev)}
                  >
                    View All
                  </p>
                </div>
                {nearby.length === 0 && (
                  <p className="text-center w-full">No hotels found</p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-3">
                  {nearby.map((hotel) => (
                    <HotelCard
                      key={hotel.id}
                      id={hotel.id}
                      image={hotel.image}
                      image_url={hotel.image_url}
                      name={hotel.name}
                      location={hotel.location}
                      rating={hotel.average_rating}
                      variant="list"
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
