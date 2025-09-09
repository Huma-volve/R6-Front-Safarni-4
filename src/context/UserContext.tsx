import { createContext, useState, useEffect } from "react";
import axios from "axios";
import type { User } from "../Types/User";

const UserContext = createContext<{
  user: User["user"] | null;
  Userloading: boolean;
  setUserLoading: (loading: boolean) => void;
  handleGetProfile: () => void;
}>({
  user: null,
  Userloading: false,
  setUserLoading: () => {},
  handleGetProfile: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User["user"] | null>(null);
  const [Userloading, setUserLoading] = useState(false);

  const handleGetProfile = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
      setUserLoading(true);
      const response = await axios.get(`${BASE_URL}profile`, {
        headers: {
          Authorization: `Bearer 40|OCBC7IZByo8VotD5wprl56aAdzeEyNiaS59z64XG630f2c82`,
        },
      });
      if (response.status === 200) {
        const data = response.data.data.user;
        setUser(data);
        setUserLoading(false);
      }
    } catch (error) {
      setUserLoading(false);
      console.error("Failed to fetch profile:", error);
    }
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, Userloading, setUserLoading, handleGetProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
