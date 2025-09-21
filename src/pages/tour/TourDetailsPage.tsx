import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star, Heart, ImagePlus } from "lucide-react";
import type { AppDispatch, RootState } from "../../store/store";
import { fetchTourDetails, fetchTourReviews, clearDetails } from "../../store/tour/tour";

export default function TourDetailsPage() {
    const { id = "" } = useParams();
    const nav = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { details, detailsLoading, detailsError, reviews, reviewsLoading } =
        useSelector((s: RootState) => s.tours);

    useEffect(() => {
        dispatch(fetchTourDetails(id));
        dispatch(fetchTourReviews(id));
        return () => { dispatch(clearDetails()); };
    }, [dispatch, id]);


    if (detailsLoading) return <div className="p-6 text-slate-600">Loading…</div>;
    if (detailsError || !details) return <div className="p-6 text-rose-600">Failed to load.</div>;

    const price = details.priceFrom.toFixed(2);

    return (
        <div className="min-h-screen bg-[#f6f7fb] text-slate-900">
            <div className="mx-auto w-[min(1000px,95vw)] p-4">
                <button onClick={() => nav('/tour')} className="mb-2 grid h-8 w-8 place-items-center rounded-full border border-slate-200 bg-white shadow">
                    <ArrowLeft className="h-4 w-4" />
                </button>

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <img src={details.img} alt={details.title} className="h-64 w-full object-cover md:h-80" />

                    <div className="p-4 md:p-6">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h1 className="text-xl font-extrabold md:text-2xl">{details.title}</h1>
                                <div className="mt-1 text-slate-500">{details.location}</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-sm font-semibold text-slate-700">
                                    <Star className="h-4 w-4 text-amber-500" />
                                    {details.rating.toFixed(1)}
                                </div>
                                <button

                                    className={`grid h-9 w-9 place-items-center rounded-full border bg-white shadow
                    ${details.isFavorite ? "border-transparent bg-rose-500 text-white" : "border-slate-200 text-slate-700"}`}
                                >
                                    <Heart className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-3 text-slate-600 md:grid-cols-3">
                            <div><div className="text-sm font-semibold text-slate-500">Trip Type</div>City Breaks</div>
                            <div><div className="text-sm font-semibold text-slate-500">Duration</div>{details.duration} Days</div>
                            <div className="text-right md:text-left"><div className="text-sm font-semibold text-slate-500">Country</div>{details.location.split(",").slice(-1)}</div>
                        </div>

                        <div className="mt-5">
                            <div className="mb-2 font-bold">Best Time to Visit</div>
                            <p className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                                Spring (April–June) and autumn (September–October) are perfect times to visit.
                            </p>
                        </div>

                        {/* gallery */}
                        <div className="mt-5">
                            <div className="mb-2 flex items-center justify-between">
                                <div className="font-bold">Gallery ({details.slots.length})</div>
                                <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm shadow">
                                    <ImagePlus className="h-4 w-4" /> add Photo
                                </button>
                            </div>
                            <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
                                {details.slots.slice(0, 12).map((s, i) => (
                                    <img
                                        key={s.slot_id}
                                        className="h-20 w-full rounded-md object-cover"
                                        src={`https://picsum.photos/seed/${details.id}-${i}/300/200`}
                                        alt=""
                                    />
                                ))}
                            </div>
                        </div>

                        {/* reviews */}
                        <div className="mt-6">
                            <div className="mb-2 font-bold">Reviews</div>

                            {reviewsLoading && <div className="text-slate-500">Loading reviews…</div>}

                            {!reviewsLoading && reviews.length === 0 && (
                                <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                                    No reviews yet.
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                {reviews.map((r) => (
                                    <div key={r.id} className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700 shadow-sm">
                                        <div className="mb-1 flex items-center justify-between">
                                            <div className="font-semibold">{r.user?.name ?? "Guest"}</div>
                                            <div className="text-xs text-slate-500">{new Date(r.created_at).toLocaleDateString()}</div>
                                        </div>
                                        <div className="mb-1 text-amber-500">
                                            {"★".repeat(Math.round(r.rating))}<span className="text-slate-400">{"☆".repeat(5 - Math.round(r.rating))}</span>
                                        </div>
                                        <p>{r.review}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                <div className="sticky bottom-0 mt-4 flex items-center justify-between gap-3 rounded-lg bg-white/70 p-3 backdrop-blur">
                    <div className="text-slate-700">
                        Total price: <span className="font-extrabold text-[#2474ff]">${price}</span><span className="text-sm text-slate-500"> /night</span>
                    </div>
                    <button className="h-10 rounded-md bg-[#365cff] px-5 font-bold text-white shadow-md hover:brightness-105" onClick={() => nav('')}>
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
}
