import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SearchBar from "@/components/common/SearchBar";
import BackButton from "@/components/common/BackButton";
import type { Room } from "@/Types/Rooms";
import { Link, useParams } from "react-router-dom";

export default function RoomBookingPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const getRooms = async () => {
    try {
      setLoading(true);
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const response = await axios.get(`${BASE_URL}hotel/rooms/${id}`);
      if (response.status === 200) {
        toast.success("Rooms fetched successfully");
        setRooms(response.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const searchRooms = async (value: string) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}rooms/search?key=${value}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        const data = response.data.data;
        setRooms(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);
  return (
    <>
      <div className="flex items-center gap-2 w-full">
        <BackButton router={-1} />
        <div className="flex-1">
          <SearchBar
            placeholder="Search..."
            onChange={(value) => searchRooms(value)}
          />
        </div>
      </div>
      <div className="mt-6">
        <h1 className="text-2xl font-medium">Available Rooms</h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <Loader2 className="w-20 h-20 text-primary animate-spin" />
        </div>
      ) : (
        <>
          {rooms.length === 0 && (
            <div className="flex items-center justify-center h-[calc(100vh-200px)] text-muted text-xl">
              No rooms found
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {rooms.map((room: Room) => (
              <Link to={"/hotel-booking/" + id + "/" + room.id}>
                <Card key={room.id} className="p-2 md:p-2">
                  <CardContent className="md:p-0">
                    {/* Image */}
                    <div className="flex items-center justify-center rounded-xl overflow-hidden">
                      <img
                        src={room.image}
                        className="object-cover w-full h-32"
                        alt="Room"
                      />
                    </div>

                    <div className="flex flex-col gap-2 p-2">
                      <h1>{room?.name || "Unknown"}</h1>
                      <p className="text-muted">
                        From{" "}
                        <span className="text-primary">
                          {Number(room.price).toFixed(0)}$
                        </span>{" "}
                        Per Night
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
