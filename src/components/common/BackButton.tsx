import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton({ router }: { router: string }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(router)}
      className="w-10 h-10 bg-foreground/30 text-muted rounded-full flex items-center justify-center cursor-pointer mb-4"
    >
      <ChevronLeft className="w-6 h-6" />
    </div>
  );
}
