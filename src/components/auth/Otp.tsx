import { useState, useEffect } from "react";
import { FiMail } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import BackButton from "../common/BackButton";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Otp() {
  const [timeLeft, setTimeLeft] = useState(30);
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email: string })?.email;
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (value: string, index: number) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 5) {
      setError("Please enter all 5 digits");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const res = await fetch(`${baseUrl}otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: enteredOtp,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Invalid code, please try again");
      }

      navigate("/NPassword", { state: { email } });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setTimeLeft(30);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full flex items-start justify-between px-6 md:px-20 pt-4 ">
        <div className="mt-3">
          <BackButton />
        </div>
        <div className="flex flex-col items-end mr-5">
          <Link to="/GetStart" className="flex flex-col items-center">
            <img
              src="/src/assets/Logo.png"
              alt="Safarni logo"
              className="w-10 h-10 md:w-12 md:h-12"
            />
            <span className="mt-1 font-bold text-sm md:text-base text-primary">
              Safarni
            </span>
          </Link>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-1 px-6 md:px-16 pb-10 gap-8">
        <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-2xl p-3 m-3 md:m-0 md:p-3">
          <img
            src="/src/assets/login.png"
            alt="illustration"
            className="max-w-xs sm:max-w-sm md:max-w-md w-full rounded-2xl"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center items-center px-4 md:px-8 text-center">
          <FiMail className="w-10 h-10 text-gray-400 mb-5" strokeWidth={1} />

          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Verify Code
          </h1>

          <p className="text-gray-600 text-sm sm:text-base max-w-md mb-1">
            Please enter the code we just sent to email
          </p>
          <p className="text-gray-800 font-medium mb-6">{email}</p>

          <p className="text-lg font-semibold mb-4 text-gray-600">
            00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
          </p>

          <div className="flex justify-center gap-3 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-12 h-10 border-1 border-blue-800 text-center text-lg font-semibold rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-gray-800"
              />
            ))}
          </div>

          {error && (
            <p className="text-red-600 text-sm font-medium mb-4">{error}</p>
          )}

          <p className="text-gray-600 text-md mb-6">
            OTP not received?{" "}
            <button
              type="button"
              className="text-blue-800 font-semibold hover:underline cursor-pointer"
              onClick={handleResend}
            >
              Send again
            </button>
          </p>

          <Button
            type="button"
            variant="default"
            disabled={loading}
            onClick={handleVerify}
            className="w-full max-w-sm py-3 text-base font-semibold cursor-pointer bg-blue-800 hover:bg-blue-900"
          >
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </div>
    </div>
  );
}
