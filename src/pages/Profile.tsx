import { useState } from "react";
import TopBar from "../components/TopBar";

type ProfileView = 'main' | 'inventory' | 'history' | 'upgrades' | 'promo';

export default function Profile(){
  const [activeView, setActiveView] = useState<ProfileView>('main');
  const [language, setLanguage] = useState<'en' | 'ru' | 'zh'>('ru');

  const avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=RocketGifts";
  const username = "Mickey";
  const userId = "User ID 3051004";

  const renderContent = () => {
    switch (activeView) {
      case 'inventory':
        return (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-bold mb-2">Ваш инвентарь пуст</h3>
            <p className="text-textMute">Нужно это исправить!</p>
          </div>
        );

      case 'history':
        return (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📜</div>
            <h3 className="text-xl font-bold mb-2">История пуста</h3>
            <p className="text-textMute">Начните играть чтобы увидеть историю</p>
          </div>
        );

      case 'upgrades':
        return (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⬆️</div>
            <h3 className="text-xl font-bold mb-2">Апгрейды</h3>
            <p className="text-textMute">Улучшайте свои предметы</p>
          </div>
        );

      case 'promo':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Активировать промокод</h3>
            <input
              type="text"
              placeholder="Введите промокод"
              className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-sm placeholder-textMute focus:outline-none focus:border-primary transition"
            />
            <button className="btn-primary w-full py-3 rounded-xl font-semibold">
              Активировать
            </button>
          </div>
        );

      default:
        return (
          <div className="space-y-3">
            <div className="card p-4">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="w-16 h-16 rounded-2xl border-2 border-line"
                />
                <div>
                  <h2 className="text-lg font-semibold">{username}</h2>
                  <p className="text-sm text-textMute">{userId}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveView('inventory')}
              className="card p-4 flex items-center gap-3 hover:bg-surface transition w-full text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <span className="text-2xl">🎁</span>
              </div>
              <span className="text-base font-medium">Инвентарь</span>
            </button>

            <button
              onClick={() => setActiveView('history')}
              className="card p-4 flex items-center gap-3 hover:bg-surface transition w-full text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <span className="text-base font-medium">История</span>
            </button>

            <button
              onClick={() => setActiveView('upgrades')}
              className="card p-4 flex items-center gap-3 hover:bg-surface transition w-full text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
              <span className="text-base font-medium">Апгрейды</span>
            </button>

            <button
              onClick={() => setActiveView('promo')}
              className="card p-4 flex items-center gap-3 hover:bg-surface transition w-full text-left"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{background: '#007AFF'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <circle cx="12" cy="12" r="10"/>
                </svg>
              </div>
              <span className="text-base font-medium">Активировать промокод</span>
            </button>

            <div className="card p-4">
              <h3 className="text-sm font-semibold mb-3">Выбрать язык</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                    language === 'en' ? 'bg-primary text-white' : 'bg-surface hover:bg-white/5'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('ru')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition relative ${
                    language === 'ru' ? 'text-white' : 'bg-surface hover:bg-white/5'
                  }`}
                  style={language === 'ru' ? {background: '#5B7FFF'} : {}}
                >
                  Русский
                  {language === 'ru' && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </button>
                <button
                  onClick={() => setLanguage('zh')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                    language === 'zh' ? 'bg-primary text-white' : 'bg-surface hover:bg-white/5'
                  }`}
                >
                  中文
                </button>
              </div>
            </div>

            <div className="text-center py-8">
              <h3 className="text-xl font-bold mb-2">Ваш инвентарь пуст</h3>
              <p className="text-textMute">Нужно это исправить!</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-bg pb-20">
      <TopBar title="Gifts Battle" showBack={activeView !== 'main'} showMenu={true} onBack={() => setActiveView('main')} />

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

        {renderContent()}
      </div>
    </div>
  );
}
