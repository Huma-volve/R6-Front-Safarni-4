import { RouterProvider, createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <h1 className="text-muted">Ziad</h1>,
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;

