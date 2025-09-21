import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import { UserProvider } from "./context/UserContext";
import { Toaster } from "react-hot-toast";
import { BookingProvider } from "./context/BookingContext";
import CarDetails from "./pages/carBooking/CarDetails";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      {token ? (
        <BookingProvider>
          <UserProvider>
            <div className="min-h-screen flex flex-col">
              <NavBar />
              <main className="flex-1 p-6 w-full max-w-[1240px] mx-auto">
                <Outlet />
                <CarDetails />
                              </main>
            </div>
            <Toaster />
          </UserProvider>
        </BookingProvider>
      ) : (
        <Navigate to="/GetStart" />
      )}
    </>
  );
}
