import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { fetchTours } from "../../store/tour/tour";
import type { Tour } from "../../Types/Tour";
import { Loader2, Search } from "lucide-react";
import BackButton from "@/components/common/BackButton";
import MainCard from "@/components/common/MainCard";

export default function ToursPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: tours, loading } = useSelector((s: RootState) => s.tours);
  const [q, setQ] = useState("");

  useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch]);

  const filtered: Tour[] = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return tours;
    return tours.filter((t) =>
      (t.title + " " + t.location + " " + t.desc).toLowerCase().includes(s)
    );
  }, [q, tours]);

  console.log(filtered);

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-slate-900 p-6">
      {/* Search */}
      <div className="mx-auto mb-5 flex w-[min(96vw,1100px)] items-center gap-3">
        <BackButton router={-1} />
        <div className="flex h-11 flex-1 items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 shadow-[0_8px_28px_rgba(15,23,42,0.06)]">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            className="h-full w-full border-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
            placeholder="Search tours…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-[calc(100vh-100px)]">
          <Loader2 className="animate-spin w-20 h-20 text-primary" />
        </div>
      )}

      {!loading && (
        <div className="mx-auto grid w-[min(96vw,1100px)] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((t) => {
            return <MainCard key={t.id} item={t} onHeartClick={() => {}} />;
          })}
        </div>
      )}
    </div>
  );
}
