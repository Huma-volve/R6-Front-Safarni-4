import { createContext, useState, useEffect } from "react";
import axios from "axios";
import type { User } from "../Types/User";

const UserContext = createContext<User["user"] | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User["user"] | null>(null);

  const handleGetProfile = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${BASE_URL}profile`, {
        headers: {
          Authorization: `Bearer 23|Sr6D5qpESAa1HvTRIWVKSoc6OE4IQUbBgNDkIv522eaf9082`,
        },
      });
      const data = response.data.data.user;
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserContext;
