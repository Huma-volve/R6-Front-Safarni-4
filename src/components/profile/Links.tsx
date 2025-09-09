import { Card, CardContent } from "../ui/card";
import { LogOut, UserRound } from "lucide-react";
import { CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Globe } from "lucide-react";
import { Lock } from "lucide-react";
import { ChevronRight } from "lucide-react";
import ProfileContainer from "../common/ProfileContainer";

const links = [
  { name: "Personal Info", icon: <UserRound />, href: "/profile/info" },
  { name: "My Booking", icon: <CreditCard />, href: "/profile/my-booking" },
  { name: "App language", icon: <Globe />, href: "/profile/language" },
  {
    name: "Account & Security",
    icon: <Lock />,
    href: "/profile/account-security",
  },
];

export default function ProfileLinks() {
  return (
    <>
      <ProfileContainer>
        <Card className="flex flex-col gap-3">
          {links.map((link) => (
            <Link key={link.name} to={link.href}>
              <Card className="md:px-4">
                <CardContent className="px-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-muted">
                      {link.icon}
                      <span className="text-md md:text-lg text-black font-medium">
                        {link.name}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          <Link key={"logout"} to={"/logout"}>
            <Card className="md:px-4">
              <CardContent className="px-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-red-600">
                    <LogOut className="rotate-180 w-5 h-5" />
                    <span className="text-md md:text-lg text-red-600 font-medium">
                      Logout
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </Card>
      </ProfileContainer>
    </>
  );
}
