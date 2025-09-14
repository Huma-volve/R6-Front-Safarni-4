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
            element: <h1 className="text-2xl font-semibold">Language</h1>,
          },
          {
            path: "account-security",
            element: <AccountSecurityPage />,
          },
        ],
      },
      { path: "checkout", element: <CheckoutPage /> },
    ],
  },
]);
