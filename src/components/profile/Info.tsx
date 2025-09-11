import ProfileContainer from "../common/ProfileContainer";
import { Button } from "../ui/button";
import { Card, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { UserRound } from "lucide-react";
import { Mail } from "lucide-react";
import { Map } from "lucide-react";
import { Phone } from "lucide-react";
import BackButton from "../common/BackButton";
import type { FormikProps } from "formik";

interface ProfileInfoProps {
  formik: FormikProps<{
    name: string;
    email: string;
    country: string;
    phone: string;
  }>;
}

export default function ProfileInfo({ formik }: ProfileInfoProps) {
  const profileInfo = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Name",
      icon: <UserRound className="w-4 h-4" />,
      value: formik.values.name,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Email",
      icon: <Mail className="w-4 h-4" />,
      value: formik.values.email,
    },
    {
      label: "Location",
      name: "country",
      type: "text",
      placeholder: "Location",
      icon: <Map className="w-4 h-4" />,
      value: formik.values.country,
    },
    {
      label: "Phone Number",
      name: "phone",
      type: "text",
      placeholder: "Phone",
      icon: <Phone className="w-4 h-4" />,
      value: formik.values.phone,
    },
  ];
  return (
    <>
      <BackButton />
      <ProfileContainer>
        <Card>
          <CardTitle className="text-center text-xl">
            personal information
          </CardTitle>
          <CardContent>
            <div className="flex items-center flex-col gap-4">
              <form className="w-full" onSubmit={formik.handleSubmit}>
                {profileInfo.map((info) => (
                  <>
                    <div className="w-full mb-6">
                      <Label className="my-2">{info.label}</Label>
                      <div className="relative">
                        <Input
                          className="pl-8"
                          type={info.type}
                          placeholder={info.placeholder}
                          name={info.name.toLowerCase()}
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
                        {formik.errors[
                          info.name.toLowerCase() as keyof typeof formik.errors
                        ] ||
                          (formik.touched[
                            info.name.toLowerCase() as keyof typeof formik.touched
                          ] && (
                            <p>
                              {
                                formik.errors[
                                  info.name.toLowerCase() as keyof typeof formik.errors
                                ]
                              }
                            </p>
                          ))}
                      </div>
                    </div>
                  </>
                ))}
                <Button
                  className="w-1/2 rounded-none cursor-pointer"
                  disabled={
                    Object.keys(formik.errors).length > 0 || formik.isSubmitting
                  }
                >
                  Update
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </ProfileContainer>
    </>
  );
}
