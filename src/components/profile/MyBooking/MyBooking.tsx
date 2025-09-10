import BackButton from "../../common/BackButton";
import { NavLink, Outlet } from "react-router-dom";
import { Plane, Car, BedSingle, Ship } from "lucide-react";

const tabs = [
  { name: "Flights", icon: <Plane />, href: "/profile/my-booking/flights" },
  { name: "Cars", icon: <Car />, href: "/profile/my-booking/cars" },
  { name: "Tours", icon: <Ship />, href: "/profile/my-booking/tours" },
  { name: "Hotels", icon: <BedSingle />, href: "/profile/my-booking/hotels" },
];

export default function MyBooking() {
  return (
    <>
      <BackButton router="/profile" />
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-medium text-center">My Booking</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {tabs.map((tab) => (
            <NavLink
              key={tab.name}
              to={tab.href}
              className={({ isActive }) =>
                `is-active ${
                  isActive && "text-primary bg-primary/10"
                } border rounded-3xl p-3 hover:bg-primary/10 transition-colors cursor-pointer`
              }
            >
              <div className="flex items-center justify-center gap-2">
                {tab.icon}
                {tab.name}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <Outlet />
    </>
  );
}
