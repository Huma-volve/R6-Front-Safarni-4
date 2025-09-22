import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FiMail, FiKey } from "react-icons/fi";
import BackButton from "../common/BackButton";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

export default function FPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_BASE_URL?.replace(/\/+$/, "") || "";
      const res = await fetch(`${baseUrl}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));
      console.log("OTP response:", data);

      if ((data as any).otp) {
        console.log("DEV OTP (from response):", (data as any).otp);
      }

      navigate("/otp", { state: { email } });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full hidden md:flex items-start justify-between px-6 md:px-20 pt-4">
        <div className="mt-3">
          <BackButton router={-1} />
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
        <div className="flex-1 hidden md:flex items-center justify-center bg-gray-100 rounded-2xl p-3 md:p-3">
          <img
            src="/src/assets/FPassword.png"
            alt="illustration"
            className="max-w-xs sm:max-w-sm md:max-w-md w-full rounded-2xl"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 md:px-8">
          <div className="flex flex-col items-center justify-center text-center max-w-xl w-full mx-auto space-y-4">
            <FiKey className="text-4xl text-gray-400 mb-10" />

            <h1 className="text-2xl sm:text-2xl md:text-2xl text-black font-semibold">
              Forgot Password?
            </h1>

            <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-lg">
              Please enter your email to reset your password
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full max-w-md mx-auto"
            >
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-left text-black font-medium"
                >
                  Email
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-700 text-gray-900"
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button
                type="submit"
                variant="default"
                disabled={loading}
                className="w-full py-5 text-base font-semibold cursor-pointer rounded-md"
              >
                {loading ? "Sending OTP..." : "Reset Password"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
