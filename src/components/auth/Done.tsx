import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Done() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full px-6 md:px-20 pt-4 ">
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

      <div className="flex flex-col md:flex-row flex-1 px-6 md:px-16 pb-10 md:pb-10 gap-6 md:gap-7">
        <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-2xl p-2 h-full">
          <img
            src="/src/assets/Done.png"
            alt="illustration"
            className="max-w-xs sm:max-w-sm md:max-w-md w-full rounded-2xl"
          />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 text-center">
          <div className="mb-8">
            <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            password reset
          </h1>

          <p className="text-gray-600 mb-5 max-w-md leading-relaxed">
            your password has been successfully reset
            <br />
            click below to log in magically.
          </p>

          <Button
            type="submit"
            variant="default"
            onClick={() => navigate("/login")}
            className="w-md py-5 text-base font-semibold cursor-pointer"
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
}
