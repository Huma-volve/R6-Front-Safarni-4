import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function GetStart() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full flex justify-end px-6 md:px-20 md:pt-4 ">
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
        <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-2xl p-3 m-3 md:m-0 md:p-3  ">
          <img
            src="/src/assets/start.png"
            alt="illustration"
            className="max-w-xs sm:max-w-sm md:max-w-md w-full rounded-2xl"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center px-4 md:px-8">
          <div className="flex flex-col items-center md:items-center justify-center text-center max-w-lg mx-auto md:mx-0">
            <h1 className="text-xl sm:text-2xl md:text-2xl font-semibold text-black mb-3 ">
              Welcome
            </h1>

            <p className="text-gray-600 mb-5 text-base sm:text-lg md:text-xl leading-relaxed max-w-110">
              Safarni is your all-in-one travel guide. Discover destinations,
              compare trip prices, book flights, hotels, car rentals, and local
              tours — all through one interactive experience.
            </p>

            <div className="flex flex-col space-y-4 w-full max-w-sm">
              <Button
                variant="default"
                size="lg"
                className="w-full py-4 text-base font-semibold cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full py-4 text-base font-semibold hover:bg-gray-100 cursor-pointer border-blue-800"
                onClick={() => navigate("/login")}
              >
                Log In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
