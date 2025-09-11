import { useState } from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import BackButton from "../common/BackButton";

export default function NPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full flex items-start justify-between px-6 md:px-20 pt-4 ">
        <div className="mt-3">
          <BackButton />
        </div>

        <div className="flex flex-col items-end mr-5">
          <img
            src="/src/assets/Logo.png"
            alt="Safarni logo"
            className="w-10 h-10 md:w-12 md:h-12"
          />
          <span className="mt-1 font-bold text-sm md:text-base text-primary">
            Safarni
          </span>
        </div>
      </header>
      <div className="flex flex-col md:flex-row flex-1 px-4 sm:px-6 md:px-16 py-6 md:py-5 md:pt-0 gap-6 md:gap-10">
        <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-2xl p-4 md:p-2">
          <img
            src="/src/assets/FPassword.png"
            alt="illustration"
            className="max-w-xs sm:max-w-sm md:max-w-md w-full rounded-2xl"
          />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-md md:p-2">
            <div className="flex flex-col items-center mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 ">
                <FiLock className="text-gray-400 w-6 h-6" />
              </div>

              <h1 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 text-center">
                Set New Password
              </h1>

              <p className="text-sm sm:text-base text-gray-500 text-center md:max-w-xs leading-relaxed">
                Your New Password Must be Different from Previously Used
                Password
              </p>
            </div>

            <form className="flex flex-col gap-5">
              <div className="w-full">
                <label className="text-black font-medium mb-2 block text-sm">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent text-sm"
                  />
                  <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <div
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="w-4 h-4" />
                    ) : (
                      <FiEye className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full">
                <label className="text-black font-medium mb-2 block text-sm">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent text-sm"
                  />
                  <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <div
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="w-4 h-4" />
                    ) : (
                      <FiEye className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-sm text-gray-500 mb-1">
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
                className="w-full py-3  text-base font-semibold cursor-pointer"
              >
                Reset Password
              </Button>

              <div className="text-center mt-1">
                <Link
                  to="/login"
                  className="text-blue-800 hover:underline text-sm font-medium transition-colors duration-200"
                >
                  ← Back To Log In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
