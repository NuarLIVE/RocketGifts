import { Gamepad2, Users, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const tabs = [
  { to: "/friends", name: "Друзья", icon: Users },
  { to: "/play",   name: "Играть", icon: Gamepad2 },
  { to: "/profile",name: "Профиль",icon: User },
];

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-bg/80 blur-panel border-t border-white/5">
      <div className="grid grid-cols-3 px-2 py-2">
        {tabs.map(({ name, icon: Icon, to }) => (
          <NavLink
            key={name}
            to={to}
            className={({isActive}) => 
              `flex flex-col items-center py-2 rounded-xl transition ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Icon size={22} />
            <span className="text-[11px] mt-1">{name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}