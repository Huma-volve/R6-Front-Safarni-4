import { Menu, Search, SlidersHorizontal } from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { name: "Home", to: "/" },
  { name: "Favorite", to: "/favorite" },
  { name: "Compare", to: "/compare" },
  { name: "Maps", to: "/maps" },
];

export default function NavBar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-[1240px] mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <img src="/src/assets/Logo.png" alt="logo" className="w-8 h-8" />
          <span className="font-bold text-sm text-primary">Safarni</span>
        </div>

        {/* Desktop Nav */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="flex gap-10">
            {links.map(({ name, to }) => (
              <NavigationMenuItem key={to}>
                <NavLink to={to}>
                  {({ isActive }) => (
                    <NavigationMenuLink
                      className={
                        isActive
                          ? "text-primary font-semibold"
                          : "text-gray-900 font-medium hover:text-primary transition-colors"
                      }
                    >
                      {name}
                    </NavigationMenuLink>
                  )}
                </NavLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Icons + Mobile Menu */}
        <div className="flex items-center gap-4">
          <button>
            <Search className="w-5 h-5 text-gray-600 hover:text-primary" />
          </button>
          <button>
            <SlidersHorizontal className="w-5 h-5 text-gray-600 hover:text-primary" />
          </button>
          <img
            src="/avatar.jpg"
            alt="user"
            className="w-8 h-8 rounded-full border"
          />

          {/* Mobile Drawer */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden">
                <Menu className="w-6 h-6 text-gray-800" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-6">
              <nav className="flex flex-col gap-4 mt-6">
                {links.map(({ name, to }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      (isActive
                        ? "text-primary font-semibold"
                        : "text-gray-800") +
                      " hover:text-primary transition-colors"
                    }
                  >
                    {name}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
