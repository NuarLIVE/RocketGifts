import { useState } from "react";
import { Search } from "lucide-react";
import TopBar from "../../components/TopBar";

export default function Upgrades() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<'inventory' | 'desired'>('inventory');

  const avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=RocketGifts";

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

        <h1 className="text-2xl font-bold text-center mb-4" style={{color: '#5B7FFF'}}>
          Апгрейд NFT
        </h1>

        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center shadow-2xl">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700 flex items-center justify-center">
                  <div className="text-6xl">💎</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -left-4 text-sm font-semibold bg-surface px-3 py-1 rounded-lg border border-line">
              0%
            </div>
            <div className="absolute -top-4 -right-4 text-sm font-semibold bg-surface px-3 py-1 rounded-lg border border-line">
              0x
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-card rounded-2xl p-6 flex flex-col items-center justify-center border border-line min-h-[160px]">
            <div className="text-4xl mb-3">+</div>
            <div className="text-sm font-semibold text-center">Выберите ваш предмет</div>
          </div>
          <div className="bg-card rounded-2xl p-6 flex flex-col items-center justify-center border border-line min-h-[160px]">
            <div className="text-4xl mb-3">+</div>
            <div className="text-sm font-semibold text-center">Выберите желаемый NFT</div>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition ${
              activeTab === 'inventory'
                ? 'bg-surface text-white'
                : 'text-textMute'
            }`}
          >
            Инвентарь
          </button>
          <button
            onClick={() => setActiveTab('desired')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition ${
              activeTab === 'desired'
                ? 'bg-surface text-white'
                : 'text-textMute'
            }`}
          >
            Желаемый NFT
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-textMute" size={18} />
          <input
            type="text"
            placeholder="Быстрый поиск"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-line rounded-xl pl-11 pr-4 py-3 text-sm placeholder-textMute focus:outline-none focus:border-primary transition"
          />
        </div>

        <div className="text-center py-16 text-textMute">
          Выберите предметы для апгрейда
        </div>
      </div>
    </div>
  );
}
