import { useState } from "react";
import { Link } from "react-router-dom";
import { Wallet, Star, Package, History, ChevronRight } from "lucide-react";
import TopBar from "../components/TopBar";

export default function Profile(){
  const [balance, setBalance] = useState(250);
  const [walletConnected, setWalletConnected] = useState(false);

  const avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=RocketGifts";
  const username = "Игрок";
  const telegramId = "@username";

  const topUp = () => {
    alert('Интеграция с Telegram Stars для пополнения баланса');
  };

  const connectWallet = () => {
    setWalletConnected(true);
    alert('Кошелек подключен');
  };

  return (
    <div className="pb-24 min-h-screen bg-gradient-to-b from-bg via-bg to-bg/95">
      <TopBar title="Rocket Gifts" />

      <div className="p-4 space-y-4">
        <div className="card p-6 bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border-yellow-500/30">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-20 h-20 rounded-full border-4 border-yellow-500/50 bg-white"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{username}</h2>
              <p className="text-sm text-white/70">{telegramId}</p>
            </div>
          </div>

          <div className="mb-4 p-4 bg-black/30 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-white/70">Баланс</div>
              <Star className="text-yellow-400" size={20} />
            </div>
            <div className="text-3xl font-bold text-yellow-400 mb-3">{balance} ⭐</div>
            <button
              onClick={topUp}
              className="btn bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-full py-3 rounded-xl transition-all"
            >
              Пополнить баланс
            </button>
          </div>

          {!walletConnected ? (
            <button
              onClick={connectWallet}
              className="btn bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold w-full py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Wallet size={20} />
              Подключить кошелек
            </button>
          ) : (
            <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-2">
              <Wallet className="text-green-400" size={20} />
              <div className="flex-1">
                <div className="text-sm font-semibold text-green-400">Кошелек подключен</div>
                <div className="text-xs text-white/60 font-mono">0x742d...9f2a</div>
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-3">
          <Link
            to="/inventory"
            className="card p-4 hover:bg-white/10 transition-all flex items-center gap-4"
          >
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Package className="text-blue-400" size={24} />
            </div>
            <div className="flex-1">
              <div className="font-semibold">Инвентарь</div>
              <div className="text-sm text-white/60">Мои NFT и призы</div>
            </div>
            <ChevronRight className="text-white/40" size={20} />
          </Link>

          <Link
            to="/history"
            className="card p-4 hover:bg-white/10 transition-all flex items-center gap-4"
          >
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <History className="text-purple-400" size={24} />
            </div>
            <div className="flex-1">
              <div className="font-semibold">История</div>
              <div className="text-sm text-white/60">Игры и транзакции</div>
            </div>
            <ChevronRight className="text-white/40" size={20} />
          </Link>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold mb-4">Статистика</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl text-center">
              <div className="text-2xl font-bold text-green-400">156</div>
              <div className="text-xs text-white/60 mt-1">Выигрышей</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl text-center">
              <div className="text-2xl font-bold text-red-400">89</div>
              <div className="text-xs text-white/60 mt-1">Проигрышей</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl text-center">
              <div className="text-2xl font-bold text-yellow-400">12</div>
              <div className="text-xs text-white/60 mt-1">NFT в инвентаре</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl text-center">
              <div className="text-2xl font-bold text-blue-400">1,250</div>
              <div className="text-xs text-white/60 mt-1">Всего игр</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
