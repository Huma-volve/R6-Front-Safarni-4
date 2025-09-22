import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { LatLngBounds } from "leaflet";
import type { Map } from "../Types/Map";

type DataBuckets = { restaurants: Map.Place[]; tourist: Map.Place[]; hotels: Map.Place[] };

type Ctx = {
    tab: Map.Tab;
    setTab: (t: Map.Tab) => void;

    query: string;
    setQuery: (q: string) => void;

    bounds: LatLngBounds | null;
    setBounds: (b: LatLngBounds | null) => void;

    points: Map.Place[];
    raw: DataBuckets;
    loading: boolean;
    error: string | null;
};

const MapApiContext = createContext<Ctx | null>(null);

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

function buildQL(t: Map.Tab, b: LatLngBounds) {
    const [s, w, n, e] = [b.getSouth(), b.getWest(), b.getNorth(), b.getEast()];
    const box = `${s},${w},${n},${e}`;
    if (t === "restaurants") return `[out:json];node["amenity"="restaurant"](${box});out center 200;`;
    if (t === "hotels") return `[out:json];node["tourism"="hotel"](${box});out center 200;`;
    if (t === "tourist") return `[out:json];node["tourism"="attraction"](${box});out center 200;`;
    return "";
}

function cacheKey(t: Map.Tab, b: LatLngBounds) {
    const r = (x: number) => x.toFixed(4);
    return `${t}:${r(b.getSouth())},${r(b.getWest())},${r(b.getNorth())},${r(b.getEast())}`;
}

export function MapApiProvider({ children }: { children: React.ReactNode }) {
    const [tab, setTab] = useState<Map.Tab>("main");
    const [query, setQuery] = useState("");
    const [bounds, setBounds] = useState<LatLngBounds | null>(null);

    const [raw, setRaw] = useState<DataBuckets>({ restaurants: [], tourist: [], hotels: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const abortRef = useRef<AbortController | null>(null);
    const cacheRef = useRef<Map<string, Map.Place[]>>(new Map());
    const mounted = useRef(true);

    useEffect(() => {
        return () => {
            mounted.current = false;
            abortRef.current?.abort();
        };
    }, []);

    useEffect(() => {
        if (!bounds || tab === "main") return;
        const ql = buildQL(tab, bounds);
        if (!ql) return;
        const key = cacheKey(tab, bounds);
        if (cacheRef.current.has(key)) {
            const cached = cacheRef.current.get(key)!;
            setRaw(prev => ({ ...prev, [tab]: cached }));
            return;
        }

        setLoading(true);
        setError(null);
        abortRef.current?.abort();
        const c = new AbortController();
        abortRef.current = c;

        fetch(OVERPASS_URL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
            body: new URLSearchParams({ data: ql }),
            signal: c.signal,
        })
            .then(r => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            })
            .then(j => {
                const places: Map.Place[] = (j.elements ?? []).map((el: any) => ({
                    id: String(el.id),
                    name: el.tags?.name || "Unknown",
                    lat: el.lat ?? el.center?.lat,
                    lng: el.lon ?? el.center?.lon,
                })).filter((p: Map.Place) => typeof p.lat === "number" && typeof p.lng === "number");

                cacheRef.current.set(key, places);
                if (!mounted.current) return;
                setRaw(prev => ({ ...prev, [tab]: places }));
            })
            .catch((e: any) => {
                if (e?.name === "AbortError") return;
                if (!mounted.current) return;
                setError(e?.message || "Failed to load data");
            })
            .finally(() => mounted.current && setLoading(false));
    }, [tab, bounds]);

    const points = useMemo(() => {
        const s = query.trim().toLowerCase();
        const base =
            tab === "restaurants" ? raw.restaurants :
                tab === "tourist" ? raw.tourist :
                    tab === "hotels" ? raw.hotels : [];
        return s ? base.filter(p => p.name.toLowerCase().includes(s)) : base;
    }, [raw, tab, query]);

    const value: Ctx = {
        tab, setTab,
        query, setQuery,
        bounds, setBounds,
        points, raw,
        loading, error,
    };

    return <MapApiContext.Provider value={value}>{children}</MapApiContext.Provider>;
}

export function useMapApi() {
    const ctx = useContext(MapApiContext);
    if (!ctx) throw new Error("useMapApi must be used within MapApiProvider");
    return ctx;
}
