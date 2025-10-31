import { Link } from "react-router-dom";
import { Box, TrendingUp, Cherry, Disc, Gift } from "lucide-react";
import TopBar from "../components/TopBar";

export default function Play(){
  const games = [
    {
      to: "/game/cases",
      title: "Кейсы",
      description: "CS:GO стиль кейсов",
      icon: Box,
      gradient: "from-blue-600/20 to-cyan-600/20",
      border: "border-blue-500/30"
    },
    {
      to: "/game/upgrades",
      title: "Улучшения",
      description: "Крути колесо удачи",
      icon: TrendingUp,
      gradient: "from-green-600/20 to-emerald-600/20",
      border: "border-green-500/30"
    },
    {
      to: "/game/slots",
      title: "Слоты",
      description: "777, лимоны и больше",
      icon: Cherry,
      gradient: "from-red-600/20 to-pink-600/20",
      border: "border-red-500/30"
    },
    {
      to: "/game/roulette",
      title: "Рулетка",
      description: "Четное, нечетное, 0",
      icon: Disc,
      gradient: "from-purple-600/20 to-fuchsia-600/20",
      border: "border-purple-500/30"
    },
    {
      to: "/game/free-case",
      title: "Бесплатный кейс",
      description: "Ежедневная награда",
      icon: Gift,
      gradient: "from-yellow-600/20 to-orange-600/20",
      border: "border-yellow-500/30"
    }
  ];

  return (
    <div className="pb-24 min-h-screen bg-gradient-to-b from-bg via-bg to-bg/95">
      <TopBar title="Rocket Gifts" />

      <div className="p-4 space-y-4">
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Выбери игру
          </h1>
          <p className="text-white/70">Открывай кейсы и выигрывай призы</p>
        </div>

        <div className="grid gap-4">
          {games.map((game) => (
            <Link
              key={game.to}
              to={game.to}
              className={`card p-6 bg-gradient-to-br ${game.gradient} border ${game.border} hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]`}
            >
              <div className="flex items-center gap-4">
                <div className="p-4 bg-black/30 rounded-2xl">
                  <game.icon size={32} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{game.title}</h3>
                  <p className="text-sm text-white/70">{game.description}</p>
                </div>
                <div className="text-white/50">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="card p-6 bg-gradient-to-br from-gray-800/40 to-gray-900/40 border-gray-700/30">
          <div className="text-center">
            <div className="text-4xl mb-3">🎰</div>
            <h3 className="text-lg font-bold mb-2">Больше игр скоро</h3>
            <p className="text-sm text-white/60">Мы работаем над новыми захватывающими играми</p>
          </div>
        </div>
      </div>
    </div>
  );
}
