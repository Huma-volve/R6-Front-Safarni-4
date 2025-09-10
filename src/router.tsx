import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/home/HomePage";
import FavoritePage from "./pages/favorite/FavoritePage";
import ComparePage from "./pages/ComparePage";
import MapsPage from "./pages/MapsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import InfoPage from "./pages/profile/InfoPage";
import AccountSecurityPage from "./pages/profile/AccountSecurityPage";
import MyBookingPage from "./pages/profile/MyBooking/MyBookingPage";
import FlightBookingPage from "./pages/profile/MyBooking/FlightBookingPage";
import CarsBookingPage from "./pages/profile/MyBooking/CarsBookingPage";

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
              {
                index: true,
                element: <Navigate to="flights" replace />,
              },
              { path: "flights", element: <FlightBookingPage /> },
              { path: "cars", element: <CarsBookingPage /> },
              { path: "tours", element: <h1>Tours</h1> },
              { path: "hotels", element: <h1>Hotels</h1> },
            ],
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
    ],
  },
]);
