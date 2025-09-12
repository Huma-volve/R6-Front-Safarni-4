import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton({ router }: { router: string | number }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (typeof router === "number") {
      navigate(router);
    } else {
      navigate(router);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-10 h-10 bg-foreground/30 text-muted rounded-full flex items-center justify-center cursor-pointer"
    >
      <ChevronLeft className="w-6 h-6" />
    </div>
  );
}
