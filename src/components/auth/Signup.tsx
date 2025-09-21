import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import { FaFacebook, FaApple } from "react-icons/fa";
import { useState } from "react";
import BackButton from "../common/BackButton";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const specialCharRegex = /[^A-Za-z0-9]/;

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill all fields");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    if (!specialCharRegex.test(formData.password)) {
      setError("Password must contain at least one special character");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_BASE_URL;

      const res = await fetch(`${baseUrl}register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Sign up failed");
      }

      const data = await res.json();

      if (data?.data?.token) {
        localStorage.setItem("token", data.data.token);
      }

      navigate("/login");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const Loader = () => (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  );

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
              className="w-12 h-12"
            />
            <span className="mt-1 font-bold text-base text-primary">
              Safarni
            </span>
          </Link>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-1 px-4 sm:px-6 md:px-18 pb-10 gap-8">
        <div className="flex-1 hidden md:flex items-center justify-center bg-gray-100 rounded-2xl p-3 sm:p-4 md:p-2 ">
          <img
            src="/src/assets/signup.png"
            alt="illustration"
            className="max-w-[240px] md:max-w-md w-full rounded-2xl"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center px-2 sm:px-6 md:px-8">
          <div className="flex flex-col items-center justify-center text-center max-w-2xl w-full mx-auto mt-14 md:mt-0">
            <h1 className="text-xl sm:text-2xl md:text-2xl text-black mb-2 font-semibold ">
              Welcome Again
            </h1>
            <p className="text-gray-600 mb-3 text-sm sm:text-base md:text-lg leading-relaxed">
              welcome back! please fill your Data
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 w-full max-w-md mx-auto"
            >
              <div className="flex flex-col gap-1 ">
                <label
                  htmlFor="name"
                  className="text-left text-black font-medium"
                >
                  Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-700 text-gray-900"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="text-left text-black font-medium"
                >
                  Email
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-700 text-gray-900"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="password"
                  className="text-left text-black font-medium"
                >
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="*********"
                    className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-700 text-gray-900"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer "
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm font-medium">{error}</p>
              )}
              <div className="flex flex-col gap-1 mt-1 text-sm text-gray-500">
                <span className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  Must Be At Least 8 Characters
                </span>
                <span className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  Must Contain One Special Character
                </span>
              </div>
              <Button
                type="submit"
                variant="default"
                className="w-full  text-base font-semibold flex items-center justify-center gap-2 cursor-pointer mt-2 "
                disabled={loading}
              >
                {loading && <Loader />}
                {loading ? "Signing up" : "Sign Up"}
              </Button>

              <div className="relative flex items-center justify-center my-2">
                <div className="border-t border-gray-300 w-full"></div>
                <span className="px-4 text-gray-500 text-sm bg-white">Or</span>
                <div className="border-t border-gray-300 w-full"></div>
              </div>

              <div className="flex flex-col md:flex-row gap-3 mb-2">
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>

                <button className="flex-1 flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <FaFacebook className="w-5 h-5 mr-2 text-blue-600" />
                  Facebook
                </button>

                <button className="flex-1 flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <FaApple className="w-5 h-5 mr-2 text-black" />
                  Apple
                </button>
              </div>

              <div className="text-center">
                <span className="text-gray-600 font-semibold text-sm sm:text-base">
                  Already have an account?
                </span>
                <Link
                  to="/Login"
                  className="text-blue-800 font-bold font-serif text-sm sm:text-base hover:underline ml-1"
                >
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
