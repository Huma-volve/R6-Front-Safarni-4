import React from "react";
import SearchBar from "../components/map/SearchBar";
import TabsBar from "../components/map/TabsBar";
import MapView from "../components/map/MapView";
import { MapApiProvider, useMapApi } from "../context/MapContext";

function MapsInner() {
  const { query, setQuery, tab, setTab, points, setBounds, loading, error } = useMapApi();

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-slate-900 relative">
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-full max-w-[980px] z-[1000] grid gap-[14px] pointer-events-none">
        <SearchBar value={query} onChange={setQuery} loading={loading} />
        <TabsBar tab={tab} setTab={setTab} />
        {error && <div className="pointer-events-auto mx-auto text-sm text-red-600">{error}</div>}
      </div>
      <MapView tab={tab} points={points} onBoundsChange={setBounds} />
    </div>
  );
}

export default function MapsPage() {
  return (
    <MapApiProvider>
      <MapsInner />
    </MapApiProvider>
  );
}
