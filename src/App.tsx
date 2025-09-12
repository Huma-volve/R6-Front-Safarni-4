import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import { UserProvider } from "./context/UserContext";
import { Toaster } from "react-hot-toast";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      {token ? (
        <UserProvider>
          <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-1 p-6 w-full max-w-[1240px] mx-auto">
              <Outlet />
            </main>
          </div>
          <Toaster />
        </UserProvider>
      ) : (
        <Navigate to="/GetStart" />
      )}
    </>
  );
}
