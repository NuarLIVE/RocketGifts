import { useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import { Clock } from "lucide-react";

export default function Play(){
  const [activeTab, setActiveTab] = useState<'tickets' | 'free'>('tickets');

  const avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=RocketGifts";

  return (
    <div className="min-h-screen bg-bg pb-20">
      <TopBar title="Gifts Battle" showMenu={true} />

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
          Конкурсы
        </h1>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition ${
              activeTab === 'tickets'
                ? 'bg-white text-black'
                : 'bg-transparent text-white border border-line'
            }`}
          >
            За билеты (1)
          </button>
          <button
            onClick={() => setActiveTab('free')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition ${
              activeTab === 'free'
                ? 'bg-white text-black'
                : 'bg-transparent text-white border border-line'
            }`}
          >
            Бесплатные (4)
          </button>
        </div>

        {activeTab === 'tickets' && (
          <div className="space-y-4">
            <button className="w-full btn-primary py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              Подключите TON кошелек
            </button>

            <div className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold">Конкурс за билеты</h3>
                <div className="flex items-center gap-1.5 text-sm">
                  <Clock size={16} />
                  <span>13:29:46</span>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl flex items-center justify-center text-4xl">
                  ⌚
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Swiss Watch Rockefeller</h4>
                  <div className="flex items-center gap-2 text-sm mb-1">
                    <span className="text-yellow-400">🏆</span>
                    <span className="font-semibold">155</span>
                  </div>
                  <div className="text-xs text-textMute">Твои билеты: 0</div>
                  <div className="text-xs text-textMute flex items-center gap-1 mt-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    <span>88</span>
                    <button className="text-primary underline ml-1">Последние победители</button>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-sm font-medium mb-2">Способ оплаты</div>
                <div className="text-xs text-textMute mb-2">Выберите способ оплаты</div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="py-2.5 px-4 bg-surface rounded-xl font-medium flex items-center justify-center gap-2">
                    ⭐ STARS
                  </button>
                  <button className="py-2.5 px-4 bg-surface rounded-xl font-medium flex items-center justify-center gap-2">
                    💎 TON
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-sm font-medium mb-2">Покупка билетов</div>
                <div className="flex items-center gap-2">
                  <button className="btn-primary flex-1 py-3 rounded-xl font-semibold">
                    Купить билет 100 ⭐
                  </button>
                  <button className="w-10 h-10 bg-surface rounded-xl flex items-center justify-center">
                    <span className="text-xl">−</span>
                  </button>
                  <div className="w-12 text-center font-semibold">1</div>
                  <button className="w-10 h-10 bg-surface rounded-xl flex items-center justify-center">
                    <span className="text-xl">+</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'free' && (
          <div className="text-center py-8 text-textMute">
            Бесплатные конкурсы скоро
          </div>
        )}
      </div>
    </div>
  );
}
