import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Market from "./pages/Market";
import Friends from "./pages/Friends";
import Play from "./pages/Play";
import Profile from "./pages/Profile";
import Double from "./pages/games/Double";

export default function App(){
  const loc = useLocation();
  const isBottomVisible = !loc.pathname.startsWith('/game/');
  return (
    <div className="min-h-screen pb-20">
      <Routes>
        <Route path="/" element={<Navigate to="/play" replace/>} />
        <Route path="/market" element={<Market/>} />
        <Route path="/friends" element={<Friends/>} />
        <Route path="/play" element={<Play/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/game/double" element={<Double/>} />
      </Routes>
      {isBottomVisible && <Navbar />}
    </div>
  )
}