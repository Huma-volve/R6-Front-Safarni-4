import { Link, Outlet } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import ProfileMain from "../../components/profile/ProfileMain";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import type { User } from "../../Types/User";

export default function ProfilePage() {
  const location = useLocation();
  const [user, setUser] = useState<User["user"] | null>(null);

  const handleGetProfile = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/profile`,
      {
        headers: {
          Authorization: `Bearer 23|Sr6D5qpESAa1HvTRIWVKSoc6OE4IQUbBgNDkIv522eaf9082`,
        },
      }
    );
    console.log(response);
    const data = response.data.user;
    setUser(data);
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Only show back arrow if NOT on /profile */}
      {location.pathname === "/profile" ? (
        <ProfileMain user={user} />
      ) : (
        <>
          <div className="w-10 h-10 bg-foreground/30 text-muted rounded-full flex items-center justify-center cursor-pointer">
            <Link to="/profile">
              <ChevronLeft className="w-6 h-6" />
            </Link>
          </div>
          <Outlet />
        </>
      )}
    </div>
  );
}
