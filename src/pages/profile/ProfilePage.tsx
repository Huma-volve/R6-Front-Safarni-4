import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import UserInfo from "../../components/profile/UserInfo";
import Links from "../../components/profile/Links";

export default function ProfilePage() {
  const location = useLocation();
  const { user, handleGetProfile } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please select a valid image file (JPEG, PNG)");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB");
        return;
      }
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    const uploadImage = async () => {
      if (!selectedFile) return;

      const fileData = new FormData();
      fileData.append("image", selectedFile);

      try {
        setLoading(true);
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const response = await axios.post(`${BASE_URL}profile`, fileData, {
          headers: {
            Authorization: `Bearer 40|OCBC7IZByo8VotD5wprl56aAdzeEyNiaS59z64XG630f2c82`,
          },
        });
        if (response.status === 200) {
          toast.success("Profile Image updated successfully");
          handleGetProfile();
        }
      } catch (error) {
        toast.error("Failed to update profile image");
        console.error(error);
      } finally {
        setLoading(false);
        setSelectedFile(null);
      }
    };

    uploadImage();
  }, [selectedFile, user, handleGetProfile]);

  return location.pathname === "/profile" ? (
    <div className="flex flex-col gap-6">
      <UserInfo
        user={user}
        handleFileChange={handleFileChange}
        loading={loading}
      />
      <Links />
    </div>
  ) : (
    <Outlet />
  );
}
