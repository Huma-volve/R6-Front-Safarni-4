import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <h2>Safarni</h2>,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
