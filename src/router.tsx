import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/home/HomePage";
import FavoritePage from "./pages/favorite/FavoritePage";
import ComparePage from "./pages/ComparePage";
import MapsPage from "./pages/MapsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import InfoPage from "./pages/profile/InfoPage";
import AccountSecurityPage from "./pages/profile/AccountSecurityPage";
import GetStart from "./components/auth/GetStart";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/Signup";
import FPassword from "./components/auth/FPassword";
import Otp from "./components/auth/Otp";
import NPassword from "./components/auth/NPassword";
import Done from "./components/auth/Done";
import NotFound from "./components/common/NotFound";
import MyHotelBookingPage from "./pages/profile/MyBooking/MyHotelBookingPage";
import MyToursBookingPage from "./pages/profile/MyBooking/MyToursBookingPage";
import MyFlightBookingPage from "./pages/profile/MyBooking/MyFlightBookingPage";
import MyCarsBookingPage from "./pages/profile/MyBooking/MyCarsBookingPage";
import MyBookingPage from "./pages/profile/MyBooking/MyBookingPage";
import HotelBookingPage from "./pages/hotelBooking/HotelBookingPage";
import RoomBookingPage from "./pages/roomBooking/RoomBookingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "favorite", element: <FavoritePage /> },
      { path: "compare", element: <ComparePage /> },
      { path: "maps", element: <MapsPage /> },
      {
        path: "profile",
        element: <ProfilePage />,
        children: [
          { path: "info", element: <InfoPage /> },
          {
            path: "my-booking",
            element: <MyBookingPage />,
            children: [
              { index: true, element: <Navigate to="flights" replace /> },
              { path: "flights", element: <MyFlightBookingPage /> },
              { path: "cars", element: <MyCarsBookingPage /> },
              { path: "tours", element: <MyToursBookingPage /> },
              { path: "hotels", element: <MyHotelBookingPage /> },
            ],
          },
          {
            path: "language",
            element: <NotFound />,
          },
          { path: "account-security", element: <AccountSecurityPage /> },
        ],
      },
      { path: "hotel-booking", element: <HotelBookingPage /> },
      { path: "hotel-booking/:id", element: <RoomBookingPage /> },
    ],
  },
  { path: "/GetStart", element: <GetStart /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/FPassword", element: <FPassword /> },
  { path: "/Otp", element: <Otp /> },
  { path: "/NPassword", element: <NPassword /> },
  { path: "/Done", element: <Done /> },
  { path: "*", element: <NotFound /> },
]);
