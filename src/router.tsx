import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/home/HomePage";
import FavoritePage from "./pages/favorite/FavoritePage";
import ComparePage from "./pages/ComparePage";
import MapsPage from "./pages/MapsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import InfoPage from "./pages/profile/InfoPage";
import AccountSecurityPage from "./pages/profile/AccountSecurityPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import FlightsListsPage from "./pages/fightbooking/FlightsListsPage";
import SearchFlightsPage from "./pages/fightbooking/SearchFlightsPage";
import ChooseSeatPage from "./pages/fightbooking/ChooseSeatPage";
import BoardingPassPage from "./pages/fightbooking/BoardingPassPage";
import MyBookingPage from "./pages/profile/MyBooking/MyBookingPage";
import MyFlightBookingPage from "./pages/profile/MyBooking/MyFlightBookingPage";
import MyCarsBookingPage from "./pages/profile/MyBooking/MyCarsBookingPage";
import MyToursBookingPage from "./pages/profile/MyBooking/MyToursBookingPage";
import MyHotelBookingPage from "./pages/profile/MyBooking/MyHotelBookingPage";
import GetStart from "./components/auth/GetStart";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/Signup";
import FPassword from "./components/auth/FPassword";
import Otp from "./components/auth/Otp";
import NPassword from "./components/auth/NPassword";
import Done from "./components/auth/Done";
import HotelBookingPage from "./pages/hotelBooking/HotelBookingPage";
import RoomBookingPage from "./pages/roomBooking/RoomBookingPage";
import Search from "./pages/home/Search/Search";
import Filter from "./pages/home/Search/Filter/Filter";
import Tour from "./pages/home/Search/Filter/Tour";
import NotFound from "./components/common/NotFound";
import SuccessPage from "./pages/checkout/SuccessPage";

import ToursGridRedux from "./pages/tour/ToursPage";
import TourDetailsPage from "./pages/tour/TourDetailsPage";
import CarBookingPage from "./pages/carBooking/CarBookingPage";
import CarDetails from "./pages/carBooking/CarDetails";
import MapWithRoute from "./pages/carBooking/MapWithRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "favorite", element: <FavoritePage /> },
      { path: "compare", element: <ComparePage /> },
      { path: "maps", element: <MapsPage /> },
      { path: "Search", element: <Search /> },
      { path: "Filter", element: <Filter /> },

      { path: "tour", element: <Tour /> },

      { path: "tours", element: <ToursGridRedux /> },
      { path: "tours/:id", element: <TourDetailsPage /> },
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
            path: "car-booking",
            element: <CarBookingPage />,
          },
          {
            path: "MapWithRoute",
            element: <MapWithRoute />,
          },
          {
            path: "language",
            element: <h1 className="text-2xl font-semibold">Language</h1>,
          },
          {
            path: "account-security",
            element: <AccountSecurityPage />,
          },
        ],
      },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "checkout/success", element: <SuccessPage /> },
      { path: "flights/search", element: <SearchFlightsPage /> },
      { path: "flights/list", element: <FlightsListsPage /> },
      { path: "flights/choose-seat", element: <ChooseSeatPage /> },
      { path: "flights/boarding-pass", element: <BoardingPassPage /> },

      { path: "hotel-booking", element: <HotelBookingPage /> },
      { path: "hotel-booking/:id", element: <RoomBookingPage /> },

      { path: "car-booking", element: <CarBookingPage /> },
    ],
  },
  { path: "/GetStart", element: <GetStart /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/FPassword", element: <FPassword /> },
  { path: "/Otp", element: <Otp /> },
  { path: "/NPassword", element: <NPassword /> },
  { path: "/Done", element: <Done /> },
  { path: "/CarBooking", element: <CarBookingPage /> },
  { path: "/CarDetails/:id", element: <CarDetails /> },
  { path: "/MapWithRoute", element: <MapWithRoute /> },
  { path: "*", element: <NotFound /> },
]);
