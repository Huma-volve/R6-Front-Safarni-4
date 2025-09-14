// src/pages/CheckoutSuccess.tsx
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BackButton from "../../components/common/BackButton";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="p-6 h-auto">
      <div className="mb-4">
        <BackButton router={-1} />
      </div>
      <div className="flex flex-col md:flex-row h-auto md:h-[calc(100vh-130px)] rounded-2xl">
        {/* Left Side */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-gray-100 rounded-2xl">
          <img
            src="/src/assets/done.png"
            alt="Payment Success"
            className="max-w-full md:max-w-sm w-full h-auto"
          />
        </div>

        {/* Right Side */}
        <div className="flex-1 p-6 flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="text-green-500 w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold mb-2 text-gray-800">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-6">Thank you for your trust</p>
            <Button
              onClick={() => navigate("/")}
              className="mt-6 w-full bg-primary hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Back To Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
