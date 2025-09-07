import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <h1>Safarni</h1>,
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
