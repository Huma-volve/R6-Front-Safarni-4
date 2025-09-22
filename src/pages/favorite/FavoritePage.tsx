import toast from "react-hot-toast";
import MainCard from "../../components/common/MainCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import BackButton from "@/components/common/BackButton";

function FavoritePage() {
  const [favorite, setFavorite] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetFavorite = async () => {
    try {
      setLoading(true);
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Favorites fetched successfully");
        setFavorite(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetFavorite();
  }, []);

  return (
    <>
      <div className="flex items-center relative">
        <BackButton router={-1} />
        <h1 className="text-2xl font-medium absolute left-1/2 -translate-x-1/2">
          Favorite
        </h1>
      </div>
      {loading ? (
        <div className="flex items-center justify-center w-full h-[calc(100vh-200px)]">
          <Loader2 className="w-20 h-20 text-primary animate-spin" />
        </div>
      ) : favorite.length === 0 ? (
        <div className="flex items-center justify-center w-full h-[calc(100vh-500px)]">
          <h1 className="text-2xl font-medium text-muted">No Favorite Found</h1>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {favorite.map((item, index) => (
              <MainCard
                key={index}
                item={item}
                onHeartClick={handleGetFavorite}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default FavoritePage;
