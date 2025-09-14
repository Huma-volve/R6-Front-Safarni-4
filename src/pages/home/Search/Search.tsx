import BackButton from "@/components/common/BackButton";
import { Search, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import Tour from "@/pages/home/Search/Tour";

export default function SearchBar() {
  const [allLocations, setAllLocations] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showList, setShowList] = useState(false);
  const [places, setPlaces] = useState<any[]>([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetch(`${baseUrl}locations`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          const uniqueLocations = [...new Set(data.data as string[])];
          setAllLocations(uniqueLocations);
        } else {
          setAllLocations([]);
        }
      })
      .catch((err) => console.error("Error fetching locations:", err));
  }, [baseUrl]);

  const filteredLocations = allLocations.filter((loc) =>
    loc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLocationClick = (loc: string) => {
    setSearchTerm(loc);
    setShowList(false);

    fetch(`${baseUrl}tours?location=${encodeURIComponent(loc)}`)
      .then((res) => res.json())
      .then((data) => setPlaces(data.data ?? []))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="flex items-center gap-3 p-4">
        <BackButton router={-1} />
        <div className="relative flex-1">
          <div
            className="flex items-center bg-white border border-gray-300 rounded-2xl px-5 py-2 shadow-sm 
            focus-within:ring-1 focus-within:ring-gray-400 focus-within:border-blue-300 transition-all mb-4"
          >
            <Search className="text-blue-600 mr-3 w-5 h-5 " strokeWidth={1} />
            <input
              type="text"
              placeholder="Search.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowList(true)}
              onBlur={() => setShowList(false)}
              className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 text-md font-medium
                border-0 shadow-none outline-none 
                focus:border-0 focus:ring-0 focus:shadow-none"
            />
          </div>

          {showList && (
            <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-sm max-h-80 overflow-y-auto z-10">
              {(searchTerm ? filteredLocations : allLocations).length > 0 ? (
                (searchTerm ? filteredLocations : allLocations).map(
                  (loc, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer text-gray-700 rounded-sm"
                      onMouseDown={() => handleLocationClick(loc)}
                    >
                      <MapPin
                        className="w-5 h-5 text-blue-700"
                        strokeWidth={-1}
                      />
                      <span>{loc}</span>
                    </div>
                  )
                )
              ) : (
                <div className="p-3 text-gray-500">No results found</div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 px-4">
        {places.map((place) => (
          <Tour key={place.id} tour={place} />
        ))}
      </div>
    </div>
  );
}
