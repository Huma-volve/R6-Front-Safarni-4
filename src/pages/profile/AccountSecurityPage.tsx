import AccountSecurity from "@/components/profile/AccountSecurity";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";

export default function AccountSecurityPage() {
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const response = await axios.post(
        `${BASE_URL}profile/delete-account`,
        {},
        {
          headers: {
            Authorization: `Bearer 35|8MTAhKb3ZWaVuD4lVpsxqGjrIcmobQ1ruzJlSJOcb49f2e51`,
          },
        }
      );
      console.log(response);
      toast.success("Account deleted successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete account");
    }
  };

  return (
    <>
      <AccountSecurity onDeleteAccount={handleDeleteAccount} />
    </>
  );
}
