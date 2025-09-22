import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Check } from "lucide-react";

type Tour = { id: string; title: string; time: string; desc: string; price: number; img: string; };
const TOURS: Tour[] = [
  { id: "1", title: "Paris  Evening Cruise", time: "6:00 PM - 9:00 PM | $75", desc: "Enjoy a romantic evening cruise in Paris.", price: 75, img: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=800&auto=format&fit=crop" },
  { id: "2", title: "Iconic Paris Tour", time: "10:00 AM - 1:00 PM | $50", desc: "Explore Paris’s iconic landmarks and hidden gems in Paris.", price: 50, img: "https://images.unsplash.com/photo-1522093007474-09cb256ab504?q=80&w=800&auto=format&fit=crop" },
  { id: "3", title: "Paris Art & Culture Tour", time: "2:00 PM - 5:00 PM | $60", desc: "Discover Paris’s artistic side with visits to museums.", price: 60, img: "https://images.unsplash.com/photo-1523650960935-4f9550bc7f0f?q=80&w=800&auto=format&fit=crop" },
  { id: "4", title: "Paris Historical Sites", time: "9:00 AM - 12:00 PM | $45", desc: "Explore the historic heart of Paris.", price: 45, img: "https://images.unsplash.com/photo-1578926078641-9c375f4abf9a?q=80&w=800&auto=format&fit=crop" },
  { id: "5", title: "Paris Louvre Museum Tour", time: "1:00 PM - 4:00 PM | $55", desc: "Guided tour of the Louvre Museum.", price: 55, img: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?q=80&w=800&auto=format&fit=crop" },
  { id: "6", title: "Paris  Evening Cruise", time: "6:00 PM - 9:00 PM | $75", desc: "Enjoy a romantic evening cruise in Paris.", price: 75, img: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?q=80&w=800&auto=format&fit=crop" },
];

function ResultCard({
  t, selected, onToggle,
}: { t: Tour; selected: boolean; onToggle: (id: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(t.id)}
      className={[
        "group grid grid-cols-[120px,1fr] gap-3 rounded-2xl border p-2 text-left",
        "bg-white transition-all",
        selected
          ? "border-[#cfe3ff] shadow-[0_12px_28px_rgba(54,92,255,.18)] ring-2 ring-[#e9f1ff]"
          : "border-[rgba(2,6,23,0.06)] shadow-[0_10px_22px_rgba(2,6,23,.06)] hover:shadow-[0_12px_26px_rgba(2,6,23,.1)]",
      ].join(" ")}
    >
      <img
        src={t.img}
        alt={t.title}
        className="h-[86px] w-[120px] rounded-xl object-cover"
      />
      <div className="relative pr-6">
        <div className="line-clamp-1 text-[13px] font-semibold text-slate-800 tracking-[.2px]">
          {t.title}
        </div>
        <div className="mt-0.5 text-[12px] text-slate-500">{t.time}</div>
        <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-slate-500">
          {t.desc}
        </p>

        <span
          className={[
            "absolute -left-1 -top-1 grid h-5 w-5 place-items-center rounded-full border text-[11px]",
            selected
              ? "border-[#365cff] bg-[#365cff] text-white"
              : "border-[rgba(2,6,23,0.12)] bg-white text-slate-400",
          ].join(" ")}
        >
          <Check className="h-3.5 w-3.5" />
        </span>
      </div>
    </button>
  );
}

function CompareCard({ t, active }: { t: Tour; active: boolean }) {
  const features = [
    "Duration: 3 hours",
    t.title.includes("Cruise") ? "Highlights: Evening cruise" :
      t.title.includes("Louvre") ? "Highlights: Louvre Museum" :
        t.title.includes("Historical") ? "Highlights: Notre Dame" : "Highlights: Museums",
    "Availability: Available",
    "Guide: Local guide",
    `Transportation: ${t.title.includes("Cruise") ? "Boat" : "Walking"}`,
  ];
  return (
    <div
      className={[
        "rounded-2xl bg-white p-4",
        "border shadow-[0_8px_22px_rgba(2,6,23,.06)]",
        active ? "border-[#cfe3ff] ring-2 ring-[#e9f1ff]" : "border-[rgba(2,6,23,0.08)]",
      ].join(" ")}
    >
      <div className="text-[13px] font-semibold text-slate-700 tracking-[.2px]">
        {t.title}
      </div>
      <div className="mt-1.5 flex items-end gap-1">
        <span className="text-[28px] font-extrabold text-slate-900 leading-none">
          ${t.price}
        </span>
        <span className="pb-[2px] text-[13px] text-slate-500">/person</span>
      </div>
      <ul className="mt-2.5 space-y-1.5">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-[12.5px] text-slate-600">
            <span className="inline-block h-[14px] w-[14px] rounded-full border border-slate-300" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ComparePage() {
  const [q, setQ] = useState("");
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const tours = TOURS;

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return tours;
    return tours.filter(t => (t.title + " " + t.desc + " " + t.time).toLowerCase().includes(s));
  }, [q, tours]);

  const selectedTours = useMemo(() => tours.filter(t => picked.has(t.id)), [picked, tours]);
  const total = useMemo(() => selectedTours.reduce((a, t) => a + t.price, 0), [selectedTours]);

  const toggle = (id: string) => {
    setPicked(prev => {
      const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n;
    });
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-slate-900">
      <div className="mx-auto w-[min(1100px,96vw)] px-4 pb-24 pt-6">

        <div className="mb-5 flex items-center gap-3">
          <Link
            to="/"
            className="grid h-8 w-8 place-items-center rounded-full border border-[rgba(2,6,23,0.12)] bg-white shadow-sm"
          >
            <span className="text-[12px] text-slate-700">‹</span>
          </Link>
          <div className="flex h-11 flex-1 items-center gap-2 rounded-full border border-[#dbeafe] bg-white px-4 shadow-[0_10px_28px_rgba(2,6,23,.06)]">
            <Search className="h-[18px] w-[18px] text-slate-400" />
            <input
              className="h-full w-full border-0 bg-transparent text-[14px] outline-none placeholder:text-slate-400"
              placeholder="Pari"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(t => (
            <ResultCard key={t.id} t={t} selected={picked.has(t.id)} onToggle={toggle} />
          ))}
        </div>

        <div className="mt-6">
          <div className="mb-2 text-[13px] font-semibold text-slate-700">Compare</div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {(selectedTours.length ? selectedTours : filtered.slice(0, 4)).map(t => (
              <CompareCard key={`c-${t.id}`} t={t} active={picked.has(t.id)} />
            ))}
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-[rgba(2,6,23,0.06)] bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-[min(1100px,96vw)] items-center gap-3 px-4 py-3">
          <div className="text-[14px] text-slate-700">
            Total price:{" "}
            <span className="text-[16px] font-extrabold text-[#2474ff]">${total.toFixed(2)}</span>
          </div>
          <button
            disabled={!selectedTours.length}
            className={[
              "ml-auto h-10 rounded-md px-6 font-bold shadow transition",
              selectedTours.length
                ? "bg-[#365cff] text-white hover:brightness-105"
                : "cursor-not-allowed bg-slate-300 text-slate-600",
            ].join(" ")}
            onClick={() => { na }}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
