import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Gift, History, Coins } from "lucide-react";
import TopBar from "../components/TopBar";

export default function Profile(){
  const [balance, setBalance] = useState(50);
  const [tickets, setTickets] = useState(10);

  const avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=RocketGifts";
  const username = "Mickey";
  const userId = "User ID 3051004";

  return (
    <div className="min-h-screen bg-bg pb-20">
      <TopBar title="Gifts Battle" showMenu={true} />

      <div className="p-4 space-y-3">
        <div className="card p-4">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-14 h-14 rounded-full border-2 border-line"
            />
            <div className="flex-1">
              <h2 className="text-base font-semibold">{username}</h2>
              <p className="text-sm text-textMute">{userId}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white text-xl">+</span>
              </button>
              <div className="flex items-center gap-1.5">
                <Star size={18} className="text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">{balance}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Gift size={18} className="text-pink-400" />
                <span className="font-semibold">{tickets}</span>
              </div>
            </div>
          </div>
        </div>

        <Link to="/inventory" className="card p-4 flex items-center gap-3 hover:bg-surface transition">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <Gift size={24} className="text-white" />
          </div>
          <span className="text-base font-medium">Инвентарь</span>
        </Link>

        <Link to="/history" className="card p-4 flex items-center gap-3 hover:bg-surface transition">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <History size={24} className="text-white" />
          </div>
          <span className="text-base font-medium">История</span>
        </Link>

        <Link to="/friends" className="card p-4 flex items-center gap-3 hover:bg-surface transition">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
            <Coins size={24} className="text-white" />
          </div>
          <span className="text-base font-medium">Апгрейды</span>
        </Link>

        <button className="card p-4 flex items-center gap-3 hover:bg-surface transition w-full">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <span className="text-base font-medium">Активировать промокод</span>
        </button>

        <div className="card p-4">
          <h3 className="text-sm font-medium text-textMute mb-3">Выбрать язык</h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-surface text-sm font-medium hover:bg-white/5 transition">
              English
            </button>
            <button className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium">
              Русский
            </button>
            <button className="px-4 py-2 rounded-xl bg-surface text-sm font-medium hover:bg-white/5 transition">
              中文
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
