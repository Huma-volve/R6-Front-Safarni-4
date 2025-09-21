import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type SearchBarProps = {
  placeholder?: string;
  onChange?: (value: string) => void;
};

export default function SearchBar({
  placeholder = "Search...",
  onChange,
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 relative w-full">
      <Input
        type="text"
        placeholder={placeholder}
        className="pl-8 rounded-md"
        onChange={(e) => onChange?.(e.target.value)}
      />
      <div className="absolute top-1/2 left-2 -translate-y-1/2 flex items-center justify-center">
        <Search className="w-4 h-4 text-muted" />
      </div>
    </div>
  );
}
