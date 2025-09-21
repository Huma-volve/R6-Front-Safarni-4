import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { fetchTours } from "../../store/tour/tour";
import type { Tour } from "../../Types/Tour";
import { ArrowLeft, Search, Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BackButton from "@/components/common/BackButton";

export default function ToursPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { items: tours, loading, error } = useSelector((s: RootState) => s.tours);
    const [q, setQ] = useState("");
    const nav = useNavigate();

    useEffect(() => { dispatch(fetchTours()); }, [dispatch]);

    const filtered: Tour[] = useMemo(() => {
        const s = q.trim().toLowerCase();
        if (!s) return tours;
        return tours.filter(t => (t.title + " " + t.location + " " + t.desc).toLowerCase().includes(s));
    }, [q, tours]);

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

            {loading && <div className="mx-auto w-[min(96vw,1100px)] text-slate-500">Loading tours…</div>}
            {error && <div className="mx-auto w-[min(96vw,1100px)] text-rose-600">Error: {error}</div>}

            {!loading && !error && (
                <div className="mx-auto grid w-[min(96vw,1100px)] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filtered.map((t) => {
                        const isFav = t.isFavorite;
                        return (
                            <div key={t.id} onClick={() => { nav(`/tours/${t.id}`); }} className="rounded-2xl border border-indigo-50 bg-white p-3 shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(15,23,42,0.12)]" >
                                <div className="relative">
                                    <img
                                        src={t.img}
                                        alt={t.title}
                                        className="h-40 w-full rounded-xl object-cover"
                                        onError={(e) => ((e.currentTarget as HTMLImageElement).src = "https://via.placeholder.com/600x400?text=Tour")}
                                    />
                                    <button
                                        aria-pressed={isFav}
                                        className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border bg-white shadow-md transition
                      ${isFav ? "border-transparent bg-rose-500 text-white" : "border-slate-200 text-slate-600"}`}
                                        title={isFav ? "Remove from favorites" : "Add to favorites"}
                                    >
                                        <Heart className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="mt-3 flex items-center justify-between" >
                                    <span className="text-sm font-semibold text-slate-500">{t.tag}</span>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-sm font-semibold text-slate-700">
                                        <Star className="h-4 w-4 text-amber-500" />
                                        {t.rating.toFixed(1)}
                                    </span>
                                </div>

                                <h3 className="mt-1 text-lg font-extrabold tracking-tight text-slate-900">{t.title}</h3>

                                <div className="mt-1 text-slate-500">
                                    From <span className="text-[17px] font-extrabold text-[#2474ff]">{t.priceFrom}$</span>{" "}
                                    <span className="font-medium">Per Person</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
