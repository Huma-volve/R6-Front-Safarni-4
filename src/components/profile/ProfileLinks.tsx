import { Card, CardContent } from "../ui/card";
import { LogOut, UserRound } from "lucide-react";
import { CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Globe } from "lucide-react";
import { Lock } from "lucide-react";
import { ChevronRight } from "lucide-react";

const links = [
  { name: "Personal Info", icon: <UserRound />, href: "/profile/info" },
  { name: "My Booking", icon: <CreditCard />, href: "/profile/my-booking" },
  { name: "App language", icon: <Globe />, href: "/profile/language" },
  {
    name: "Account & Security",
    icon: <Lock />,
    href: "/profile/account",
  },
];

export default function ProfileLinks() {
  return (
    <>
      <div className="p-0.5 bg-gradient-to-b from-[#3F52B4] to-[#B22459] rounded-xl">
        <Card className="flex flex-col gap-3">
          {links.map((link) => (
            <Link key={link.name} to={link.href}>
              <Card>
                <CardContent className="px-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-muted">
                      {link.icon}
                      <span className="text-md md:text-lg text-black font-semibold">
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
            <Card>
              <CardContent className="px-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-red-600">
                    <LogOut className="rotate-180 w-5 h-5" />
                    <span className="text-md md:text-lg text-red-600 font-semibold">
                      Logout
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </Card>
      </div>
    </>
  );
}
