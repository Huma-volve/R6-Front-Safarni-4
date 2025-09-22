import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import L, { LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Map } from "../../Types/Map";

const icon = (emoji: string, bg: string) =>
    L.divIcon({
        html: `<div class="flex items-center justify-center w-[30px] h-[30px] rounded-full border border-slate-900/10 shadow-[0_6px_18px_rgba(15,23,42,0.18)] text-white text-[16px]" style="background:${bg}">${emoji}</div>`,
        iconAnchor: [15, 15],
        popupAnchor: [0, -12],
    });

function BoundsWatcher({ on }: { on: (b: LatLngBounds) => void }) {
    useMapEvents({ moveend: (e) => on(e.target.getBounds()) });
    const map = useMap();
    return null;
}

export default function MapView({
    tab,
    points,
    onBoundsChange,
}: {
    tab: Map.Tab;
    points: Map.Place[];
    onBoundsChange: (b: LatLngBounds) => void;
}) {
    return (
        <div className="h-[calc(100vh-24px)] m-3 rounded-[18px] overflow-hidden shadow-[0_10px_30px_rgba(15,23,42,0.08)] bg-white">
            <MapContainer
                center={[48.8566, 2.3522]}
                zoom={13}
                zoomControl={false}
                style={{ height: "100%", width: "100%" }}
                attributionControl={false}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution="&copy; OpenStreetMap &copy; CARTO"
                />
                <BoundsWatcher on={onBoundsChange} />

                {tab === "restaurants" &&
                    points.map((p) => (
                        <Marker key={p.id} position={[p.lat, p.lng]} icon={icon("🍴", "#111827")}>
                            <Popup>{p.name}</Popup>
                        </Marker>
                    ))}
                {tab === "tourist" &&
                    points.map((p) => (
                        <Marker key={p.id} position={[p.lat, p.lng]} icon={icon("🏛️", "#3b82f6")}>
                            <Popup>{p.name}</Popup>
                        </Marker>
                    ))}
                {tab === "hotels" &&
                    points.map((p) => (
                        <Marker key={p.id} position={[p.lat, p.lng]} icon={icon("🛏️", "#10b981")}>
                            <Popup>{p.name}</Popup>
                        </Marker>
                    ))}
            </MapContainer>
        </div>
    );
}
