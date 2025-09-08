import { Outlet } from "react-router-dom";
import Main from "../../components/profile/Main";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

export default function ProfilePage() {
  const location = useLocation();
  const user = useContext(UserContext);

  return location.pathname === "/profile" ? (
    <div className="flex flex-col gap-6">
      <Main user={user} />
    </div>
  ) : (
    <Outlet />
  );
}
