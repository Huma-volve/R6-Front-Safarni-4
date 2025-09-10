import { Outlet } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import CarBookingPage from "./pages/carBooking/CarBookingPage";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 p-6 w-full max-w-[1240px] mx-auto">
        <Outlet />
        <CarBookingPage />
      </main>
    </div>
  );
}
