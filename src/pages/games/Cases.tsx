import { useState } from "react";
import TopBar from "../../components/TopBar";

export default function Cases() {
  const [activeTab, setActiveTab] = useState<'all' | 'free' | 'limited'>('free');

  const avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=RocketGifts";

  const freeCases = [
    {
      id: 1,
      name: "Бесплатный за промокод",
      image: "🎁",
      bgClass: "from-purple-600 via-purple-700 to-blue-700",
      price: "БЕСПЛАТНО"
    },
    {
      id: 2,
      name: "Бесплатный за пополнение от 1000",
      image: "🎁",
      bgClass: "from-orange-600 via-orange-700 to-red-700",
      price: "БЕСПЛАТНО"
    },
    {
      id: 3,
      name: "Бесплатный за пополнение от 2000",
      image: "🎁",
      bgClass: "from-red-600 via-red-700 to-pink-700",
      price: "БЕСПЛАТНО"
    },
    {
      id: 4,
      name: "Бесплатный за пополнение от 5000",
      image: "🎁",
      bgClass: "from-orange-500 via-orange-600 to-yellow-600",
      price: "БЕСПЛАТНО"
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

        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition ${
              activeTab === 'all'
                ? 'bg-surface text-white'
                : 'text-textMute'
            }`}
          >
            Все
          </button>
          <button
            onClick={() => setActiveTab('free')}
            className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition ${
              activeTab === 'free'
                ? 'bg-surface text-white'
                : 'text-textMute'
            }`}
          >
            Бесплатные Кейсы
          </button>
          <button
            onClick={() => setActiveTab('limited')}
            className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition ${
              activeTab === 'limited'
                ? 'bg-surface text-white'
                : 'text-textMute'
            }`}
          >
            Лимитированные
          </button>
        </div>

        {activeTab === 'free' && (
          <>
            <div className="text-sm font-bold text-white mb-2 text-center">БЕСПЛАТНЫЕ КЕЙСЫ</div>
            <div className="grid grid-cols-2 gap-3">
              {freeCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className="overflow-hidden rounded-2xl"
                >
                  <div className={`aspect-square bg-gradient-to-br ${caseItem.bgClass} relative flex items-center justify-center`}>
                    <div className="text-7xl">{caseItem.image}</div>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap">
                      GIFTS BATTLE
                    </div>
                  </div>
                  <div className="bg-card p-3 text-center">
                    <div className="text-xs font-medium mb-1.5 text-textMute">{caseItem.name}</div>
                    <div className="text-sm font-bold text-white">{caseItem.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'all' && (
          <div className="text-center py-16 text-textMute">
            Скоро появятся новые кейсы
          </div>
        )}

        {activeTab === 'limited' && (
          <div className="text-center py-16 text-textMute">
            Лимитированные кейсы скоро
          </div>
        )}
      </div>
    </div>
  );
}
