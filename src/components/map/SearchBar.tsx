import { Search } from "lucide-react";

export default function SearchBar({
    value,
    onChange,
    loading,
}: {
    value: string;
    onChange: (v: string) => void;
    loading?: boolean;
}) {
    return (
        <div className="pointer-events-auto h-11 flex items-center gap-2 bg-white border border-indigo-50 rounded-[22px] px-3 mx-auto w-full shadow-[0_8px_28px_rgba(15,23,42,0.07)]">
            <Search className="w-[18px] h-[18px] text-slate-400" />
            <input
                className="flex-1 border-0 outline-none text-sm text-slate-900 placeholder:text-slate-400 bg-transparent"
                placeholder="Search by name…"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {loading && (
                <span className="text-xs text-slate-400">Loading…</span>
            )}
        </div>
    );
}
