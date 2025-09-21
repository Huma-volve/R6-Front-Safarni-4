import NotFoundImage from "../../assets/Notfound.jpg";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center flex-col">
      <img src={NotFoundImage} alt="" />

      <Button
        className="mt-4 cursor-pointer py-6 px-10"
        variant="default"
        onClick={() => navigate("/")}
      >
        Back to Home
      </Button>
    </div>
  );
}
