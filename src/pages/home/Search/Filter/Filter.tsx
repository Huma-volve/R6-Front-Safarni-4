import { useState, useEffect, useRef } from "react";
import { Range } from "react-range";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { Search, MapPin, Star, Mountain, Waves, Car } from "lucide-react";
import BackButton from "@/components/common/BackButton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Filter() {
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [selectedAdventure, setSelectedAdventure] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number[]>([]);
  const [budgetRange, setBudgetRange] = useState<number[]>([0, 8500]);
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [tours, setTours] = useState<any[]>([]);
  const [showList, setShowList] = useState(false);
  const [allLocations, setAllLocations] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const filteredLocations = allLocations.filter((loc) =>
    loc.toLowerCase().includes(searchLocation.toLowerCase())
  );

  const sortOptions: string[] = [
    "Price (Low to High)",
    "Price (High to Low)",
    "Biggest Deals (Highest Saving)",
  ];

  const sortSecondary: string[] = ["Most Reviewed", "Most Popular"];

  type AdventureType = {
    id: string;
    label: string;
    icon: React.ForwardRefExoticComponent<
      React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
    >;
  };

  const adventureTypes: AdventureType[] = [
    { id: "adventure", label: "Adventure Travel", icon: Mountain },
    { id: "city", label: "City Breaks", icon: MapPin },
    { id: "water", label: "Water Activity", icon: Waves },
    { id: "road", label: "Road Trips", icon: Car },
  ];

  const chartData: { value: number }[] = [
    { value: 20 },
    { value: 45 },
    { value: 35 },
    { value: 80 },
    { value: 65 },
    { value: 95 },
    { value: 75 },
    { value: 60 },
    { value: 40 },
    { value: 25 },
  ];

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleAdventureToggle = (id: string) => {
    setSelectedAdventure((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRatingToggle = (rating: number) => {
    setSelectedRating((prev) =>
      prev.includes(rating)
        ? prev.filter((item) => item !== rating)
        : [...prev, rating]
    );
  };

  useEffect(() => {
    const fetchAllTours = async () => {
      try {
        const res = await fetch(`${baseUrl}tours`);
        const data = await res.json();

        type TourType = { location: string; [key: string]: any };
        const toursData: TourType[] = data.data ?? data;

        setTours(toursData);

        const uniqueLocations: string[] = [
          ...new Set(toursData.map((tour) => tour.location)),
        ];

        setAllLocations(uniqueLocations);
      } catch (err) {
        console.error(err);
        setTours([]);
        setAllLocations([]);
      }
    };

    fetchAllTours();
  }, []);

  const getFilteredTours = () => {
    let filtered = [...tours];

    filtered = filtered.filter((tour: any) => {
      const price = parseFloat(tour.price);
      return price >= budgetRange[0] && price <= budgetRange[1];
    });

    if (selectedLocation) {
      filtered = filtered.filter(
        (tour: any) => tour.location === selectedLocation
      );
    }

    if (selectedAdventure.length) {
      filtered = filtered.filter((tour: any) =>
        selectedAdventure.some((adv) => tour.adventure?.includes(adv))
      );
    }

    if (selectedRating.length) {
      filtered = filtered.filter((tour: any) =>
        selectedRating.includes(Math.round(tour.rating))
      );
    }

    if (selectedSort === "Price (Low to High)") {
      filtered.sort(
        (a: any, b: any) => parseFloat(a.price) - parseFloat(b.price)
      );
    } else if (selectedSort === "Price (High to Low)") {
      filtered.sort(
        (a: any, b: any) => parseFloat(b.price) - parseFloat(a.price)
      );
    }

    return filtered;
  };

  const tourCount = getFilteredTours().length;

  const handleShowTours = async () => {
    const toursData = await getFilteredTours();

    navigate("/tour", {
      state: {
        tours: toursData,
        filters: {
          location: selectedLocation,
          sort: selectedSort,
          adventure: selectedAdventure,
          rating: selectedRating,
          budgetRange,
        },
      },
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white px-10">
      <BackButton router={-1} />

      <div className="flex flex-wrap gap-4 mb-3">
        {sortOptions.map((option, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSelectedSort(option)}
            className={`px-4 py-3 rounded-xl border transition-colors ${
              selectedSort === option
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-200 text-gray-700 hover:border-gray-300"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mb-8 ">
        {sortSecondary.map((option, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSelectedSort(option)}
            className={`px-6 py-3 text-md rounded-xl border transition-colors ${
              selectedSort === option
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : "border-gray-200 text-gray-700 hover:border-gray-300"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-4 border-white">
        Budget Range
      </h2>
      <div className="mb-8 px-40">
        <div className="h-32 mb-4 relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                fill="#93C5FD"
                fillOpacity={0.6}
                strokeWidth={0}
              />
            </AreaChart>
          </ResponsiveContainer>

          <div className="absolute bottom-0 left-0 right-0 px-2">
            <Range
              step={100}
              min={0}
              max={8500}
              values={budgetRange}
              onChange={(values) => setBudgetRange(values)}
              renderTrack={({ props, children }) => (
                <div {...props} className="h-2 bg-gray-200 rounded w-full">
                  {children}
                </div>
              )}
              renderThumb={({ props, index }) => (
                <div
                  {...props}
                  key={index}
                  className="w-4 h-4 bg-blue-500 rounded-full shadow-lg"
                />
              )}
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">Min</span>
            <div className="font-semibold text-gray-900">${budgetRange[0]}</div>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500">Max</span>
            <div className="font-semibold text-gray-900">${budgetRange[1]}</div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Adventure Style{" "}
          <span className="text-sm text-gray-500 mb-4 ml-2 font-light">
            Multi Select
          </span>
        </h2>

        <div className="grid grid-cols-4 gap-3">
          {adventureTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => handleAdventureToggle(type.id)}
                className={`p-3 py-5 rounded-xl border flex items-center space-x-2 transition-colors ${
                  selectedAdventure.includes(type.id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    selectedAdventure.includes(type.id)
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                />
                <div
                  className={`text-md font-medium ${
                    selectedAdventure.includes(type.id)
                      ? "text-blue-700"
                      : "text-gray-700"
                  }`}
                >
                  {type.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Location</h2>
        </div>

        <div className="relative" ref={containerRef}>
          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm focus-within:ring-1 focus-within:ring-gray-400 focus-within:border-blue-300 transition-all">
            <Search className="text-gray-600 mr-2 w-5 h-5" strokeWidth={1} />
            <input
              type="text"
              placeholder="Search Location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              onFocus={() => setShowList(true)}
              className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 text-md font-medium border-0 outline-none"
            />
          </div>

          {showList && filteredLocations.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-sm max-h-60 overflow-y-auto z-10">
              {filteredLocations.map((loc, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer text-gray-700 rounded-sm"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setSelectedLocation(loc);
                    setSearchLocation(loc);
                    setShowList(false);
                  }}
                >
                  <MapPin className="w-5 h-5 text-blue-700" strokeWidth={-1} />
                  <span>{loc}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Rating{" "}
          <span className="text-sm text-gray-500 mb-4 ml-2 font-light">
            Multi Select
          </span>
        </h2>
        <div className="flex justify-start items-center gap-15 px-50 ">
          {[1, 2, 3, 4, 5].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => handleRatingToggle(r)}
              className={`flex items-center space-x-1 px-6 py-4 rounded-3xl border transition-colors ${
                selectedRating.includes(r)
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-400 "
              }`}
            >
              <Star
                className={`w-4 h-4 ${
                  selectedRating.includes(r) ? "text-blue-600" : "text-gray-400"
                }`}
              />
              <span
                className={`text-sm ${
                  selectedRating.includes(r) ? "text-blue-700" : "text-gray-700"
                }`}
              >
                {r}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex space-x-10 mb-8">
        <Button
          type="button"
          onClick={() => {
            setSelectedAdventure([]);
            setSelectedRating([]);
            setBudgetRange([0, 8500]);
            setSelectedLocation("");
            setSearchLocation("");
            setSelectedSort("");
          }}
          className="flex-1 py-5 px-4 border bg-white border-blue-900 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors text-md"
        >
          Clear All
        </Button>
        <Button
          type="button"
          onClick={handleShowTours}
          className="flex-1 py-5 px-4 text-white rounded-xl text-md hover:bg-blue-900 transition-colors"
        >
          {tourCount} Tours Found
        </Button>
      </div>
    </div>
  );
}
