import { useFormik } from "formik";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import Info from "../../components/profile/Info";
import axios from "axios";
import toast from "react-hot-toast";
import * as Yup from "yup";

type ProfileInfoType = {
  name: string;
  email: string;
  country: string;
  phone: string;
};

export default function ProfileInfoPage() {
  const { user, handleGetProfile } = useContext(UserContext);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    country: Yup.string().required("Country is required"),
    phone: Yup.string()
      .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
      .required("Phone is required"),
  });

  const handleSubmit = async (values: ProfileInfoType) => {
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const token = localStorage.getItem("token");
      const response = await axios.post(`${BASE_URL}profile`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(values);
      if (response.status === 200) {
        toast.success("Profile updated successfully");
        handleGetProfile();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      country: user?.country || "",
      phone: user?.phone || "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return <Info formik={formik} />;
}
