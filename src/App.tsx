import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Friends from "./pages/Friends";
import Play from "./pages/Play";
import Profile from "./pages/Profile";
import Inventory from "./pages/Inventory";
import History from "./pages/History";
import Cases from "./pages/games/Cases";
import Upgrades from "./pages/games/Upgrades";
import FreeCase from "./pages/games/FreeCase";

export default function App(){
  const loc = useLocation();
  const isBottomVisible = !loc.pathname.startsWith('/game/') && !loc.pathname.startsWith('/inventory') && !loc.pathname.startsWith('/history');
  return (
    <div className="min-h-screen pb-20">
      <Routes>
        <Route path="/" element={<Navigate to="/play" replace/>} />
        <Route path="/friends" element={<Friends/>} />
        <Route path="/play" element={<Play/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/inventory" element={<Inventory/>} />
        <Route path="/history" element={<History/>} />
        <Route path="/game/cases" element={<Cases/>} />
        <Route path="/game/upgrades" element={<Upgrades/>} />
        <Route path="/game/free-case" element={<FreeCase/>} />
      </Routes>
      {isBottomVisible && <Navbar />}
    </div>
  )
}