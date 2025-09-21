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
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";

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
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <>
      <BorderedContainer>
        <Card className="flex flex-col gap-0 md:gap-3 p-0">
          {links.map((link) => (
            <Link key={link.name} to={link.href}>
              <Card className="md:p-4 p-4">
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

          <Dialog>
            <Card className="md:p-4 p-2 cursor-pointer">
              <CardContent className="px-0 flex items-center justify-between">
                <DialogTrigger asChild>
                  <div className="flex items-center gap-3 text-red-600 w-full">
                    <LogOut className="rotate-180 w-4 h-4" />
                    <span className="text-md md:text-lg text-red-600 font-medium">
                      Logout
                    </span>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-black text-2xl text-center font-medium">
                      Do You Want To Register The Exit Already ?
                    </DialogTitle>
                  </DialogHeader>
                  <DialogFooter className="sm:justify-start">
                    <Button
                      className="md:w-1/2 cursor-pointer rounded-sm border border-primary"
                      type="button"
                      onClick={handleLogout}
                    >
                      Yes, Log Me Out
                    </Button>
                    <DialogClose asChild>
                      <Button
                        className="md:w-1/2 cursor-pointer rounded-sm border border-primary text-primary"
                        type="button"
                        variant="outline"
                      >
                        No
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
                <ChevronRight className="w-4 h-4 text-muted" />
              </CardContent>
            </Card>
          </Dialog>
        </Card>
      </BorderedContainer>
    </>
  );
}
