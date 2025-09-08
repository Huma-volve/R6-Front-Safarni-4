import { NavLink } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";

const links = [
  { name: "Home", to: "/" },
  { name: "Favorite", to: "/favorite" },
  { name: "Compare", to: "/compare" },
  { name: "Maps", to: "/maps" },
];

export default function NavBar() {
  return (
    <header className="bg-white ">
      <div className="max-w-[1240px] mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="gap-2">
          <img src="/src/assets/Logo.png" alt="logo" className="w-8 h-8" />
          <span className="font-bold text-sm text-primary">Safarni</span>
        </div>

        {/* Nav Links */}
        <nav className="flex gap-14">
          {links.map(({ name, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                (isActive ? "text-primary font-semibold" : "text-gray-800") +
                " hover:text-primary transition-colors"
              }
            >
              {name}
            </NavLink>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-10">
          <button>
            <Search className="w-5 h-5 text-gray-600 hover:text-brand" />
          </button>
          <button>
            <SlidersHorizontal className="w-5 h-5 text-gray-600 hover:text-brand" />
          </button>
          <img
            src="/avatar.jpg"
            alt="user"
            className="w-8 h-8 rounded-full border"
          />
        </div>
      </div>
    </header>
  );
}
