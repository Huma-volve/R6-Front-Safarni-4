import BorderedContainer from "../common/BorderedContainer";
import { Button } from "../ui/button";
import { Card, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Loader2, UserRound, Mail, Map, Phone } from "lucide-react";
import BackButton from "../common/BackButton";
import type { FormikProps } from "formik";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

interface ProfileInfoProps {
  formik: FormikProps<{
    name: string;
    email: string;
    country: string;
    phone: string;
  }>;
}

export default function ProfileInfo({ formik }: ProfileInfoProps) {
  const { Userloading } = useContext(UserContext);

  const profileInfo = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Name",
      icon: <UserRound className="w-4 h-4" />,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Email",
      icon: <Mail className="w-4 h-4" />,
    },
    {
      label: "Location",
      name: "country",
      type: "text",
      placeholder: "Location",
      icon: <Map className="w-4 h-4" />,
    },
    {
      label: "Phone Number",
      name: "phone",
      type: "text",
      placeholder: "Phone",
      icon: <Phone className="w-4 h-4" />,
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <BackButton router="/profile" />
        <CardTitle className="text-center text-xl md:hidden block">
          Personal Information
        </CardTitle>
      </div>
      {Userloading ? (
        <div className="flex items-center justify-center w-full h-[calc(100vh-300px)]">
          <Loader2 className="w-20 h-20 text-primary animate-spin" />
        </div>
      ) : (
        <>
          <BorderedContainer>
            <Card>
              <CardTitle className="text-center text-xl md:block hidden">
                Personal Information
              </CardTitle>
              <CardContent className="p-0">
                <div className="flex items-center flex-col gap-4">
                  <form className="w-full" onSubmit={formik.handleSubmit}>
                    {profileInfo.map((info) => (
                      <div key={info.name} className="w-full mb-6">
                        <Label className="my-2">{info.label}</Label>
                        <div className="relative">
                          <Input
                            className="pl-8"
                            type={info.type}
                            placeholder={info.placeholder}
                            name={info.name}
                            value={
                              formik.values[
                                info.name as keyof typeof formik.values
                              ]
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <div className="absolute top-1/2 transform -translate-y-1/2 left-3 flex items-center justify-center gap-2 text-muted">
                            {info.icon}
                          </div>
                        </div>
                        <div className="text-red-500 text-sm mt-2">
                          {(formik.touched[
                            info.name as keyof typeof formik.touched
                          ] ||
                            formik.submitCount > 0) &&
                            formik.errors[
                              info.name as keyof typeof formik.errors
                            ] && (
                              <p>
                                {
                                  formik.errors[
                                    info.name as keyof typeof formik.errors
                                  ]
                                }
                              </p>
                            )}
                        </div>
                      </div>
                    ))}
                    <Button
                      type="submit"
                      className="w-1/2 rounded-none cursor-pointer"
                      disabled={
                        Object.keys(formik.errors).length > 0 ||
                        formik.isSubmitting
                      }
                    >
                      {formik.isSubmitting ? (
                        <Loader2 className="animate-spin w-5 h-5 text-white" />
                      ) : (
                        "Update"
                      )}
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </BorderedContainer>
        </>
      )}
    </>
  );
}
