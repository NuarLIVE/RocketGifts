import { useState } from "react";
import TopBar from "../../components/TopBar";

export default function FreeCase() {
  const [promoCode, setPromoCode] = useState("");

  const avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=RocketGifts";

  const caseItems = [
    {
      id: 1,
      name: "Durov's Cap Dipper",
      image: "🧢",
      starsValue: 377600,
      ticketsValue: 1888
    },
    {
      id: 2,
      name: "Vintage Cigar The Gentleman",
      image: "🎯",
      starsValue: 8600,
      ticketsValue: 43
    },
    {
      id: 3,
      name: "Record Player Emocore",
      image: "💿",
      starsValue: 7400,
      ticketsValue: 37
    },
    {
      id: 4,
      name: "Diamond Ring Nocturne",
      image: "💍",
      starsValue: 6000,
      ticketsValue: 30
    },
    {
      id: 5,
      name: "Sakura Flower Snowdrop",
      image: "🌸",
      starsValue: 5200,
      ticketsValue: 26
    },
    {
      id: 6,
      name: "Jester Hat Hellscape",
      image: "🃏",
      starsValue: 4800,
      ticketsValue: 24
    }
  ];

  return (
    <div className="min-h-screen bg-bg pb-20">
      <TopBar title="Gifts Battle" showBack={true} showMenu={true} />

      <div className="p-4 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-12 h-12 rounded-full border-2 border-line"
          />
          <div className="flex-1">
            <h2 className="text-base font-semibold">Mickey</h2>
          </div>
          <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white text-xl font-semibold">+</span>
          </button>
          <div className="flex items-center gap-1.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="font-semibold">50</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-pink-400">
              <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
            </svg>
            <span className="font-semibold">10</span>
          </div>
        </div>

        <h1 className="text-base font-bold text-center mb-4 text-white">
          БЕСПЛАТНЫЙ ЗА ПРОМОКОД
        </h1>

        <div className="flex items-center justify-center mb-6">
          <div className="w-64 h-64 bg-gradient-to-br from-purple-600 via-purple-700 to-blue-700 rounded-3xl relative flex items-center justify-center shadow-2xl">
            <div className="text-8xl">🎁</div>
            <div className="absolute bottom-4 bg-black/70 backdrop-blur-sm px-4 py-1.5 rounded-lg text-xs font-bold">
              GIFTS BATTLE
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Введите код активации"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="w-full bg-surface border border-line rounded-xl px-4 py-3.5 text-sm placeholder-textMute focus:outline-none focus:border-primary transition"
          />
          <button className="btn-primary w-full py-3.5 rounded-xl font-semibold">
            Активировать
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-base font-bold text-center mb-4 text-white">
            СОДЕРЖИМОЕ КЕЙСА
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {caseItems.map((item) => (
              <div key={item.id} className="bg-card rounded-xl overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center relative">
                  <div className="text-6xl">{item.image}</div>
                  <button className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white/70">ⓘ</span>
                  </button>
                </div>
                <div className="p-3">
                  <div className="text-xs font-medium mb-2 text-center">{item.name}</div>
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="font-semibold">{item.starsValue.toLocaleString()}</span>
                    </div>
                    <span className="text-textMute">/</span>
                    <div className="flex items-center gap-1">
                      <span className="text-blue-400">💎</span>
                      <span className="font-semibold">{item.ticketsValue}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
