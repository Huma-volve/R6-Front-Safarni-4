import { Card, CardContent } from "../ui/card";
import {
  LogOut,
  UserRound,
  CreditCard,
  Globe,
  Lock,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import BorderedContainer from "../common/BorderedContainer";

const links = [
  {
    name: "Personal Info",
    icon: <UserRound className="w-4 h-4" />,
    href: "/profile/info",
  },
  {
    name: "My Booking",
    icon: <CreditCard className="w-4 h-4" />,
    href: "/profile/my-booking",
  },
  {
    name: "App language",
    icon: <Globe className="w-4 h-4" />,
    href: "/profile/language",
  },
  {
    name: "Account & Security",
    icon: <Lock className="w-4 h-4" />,
    href: "/profile/account-security",
  },
];

export default function ProfileLinks() {
  return (
    <>
      <BorderedContainer>
        <Card className="flex flex-col gap-3">
          {links.map((link) => (
            <Link key={link.name} to={link.href}>
              <Card className="md:p-4">
                <CardContent className="px-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-muted">
                      {link.icon}
                      <span className="text-md md:text-lg text-black font-medium">
                        {link.name}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          <Link key={"logout"} to={"/logout"}>
            <Card className="md:p-4">
              <CardContent className="px-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-red-600">
                    <LogOut className="rotate-180 w-4 h-4" />
                    <span className="text-md md:text-lg text-red-600 font-medium">
                      Logout
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </Card>
      </BorderedContainer>
    </>
  );
}
