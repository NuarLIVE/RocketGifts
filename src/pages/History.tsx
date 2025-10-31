import { useState, useEffect } from "react";
import { History as HistoryIcon, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import TopBar from "../components/TopBar";
import { supabase, GameHistory, Transaction } from "../lib/supabase";

type HistoryFilter = 'all' | 'wins' | 'losses' | 'deposits';

export default function History() {
  const [filter, setFilter] = useState<HistoryFilter>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    const mockUserId = "00000000-0000-0000-0000-000000000001";

    setLoading(false);
  };

  const mockHistory = [
    { id: '1', type: 'win' as const, game: 'Кейсы', amount: 200, date: '2024-10-28 14:30', prize: 'Legendary Rocket NFT' },
    { id: '2', type: 'loss' as const, game: 'Рулетка', amount: -50, date: '2024-10-28 14:15' },
    { id: '3', type: 'deposit' as const, amount: 500, date: '2024-10-28 13:00' },
    { id: '4', type: 'win' as const, game: 'Слоты', amount: 150, date: '2024-10-27 18:20', prize: 'Gold Crown NFT' },
    { id: '5', type: 'loss' as const, game: 'Улучшения', amount: -50, date: '2024-10-27 17:45' },
    { id: '6', type: 'win' as const, game: 'Бесплатный кейс', amount: 0, date: '2024-10-27 12:00', prize: 'Bronze Star NFT' },
    { id: '7', type: 'win' as const, game: 'Кейсы', amount: 100, date: '2024-10-26 20:15', prize: 'Silver Gem NFT' },
    { id: '8', type: 'loss' as const, game: 'Рулетка', amount: -50, date: '2024-10-26 19:30' },
    { id: '9', type: 'deposit' as const, amount: 300, date: '2024-10-26 15:00' },
    { id: '10', type: 'win' as const, game: 'Слоты', amount: 350, date: '2024-10-25 16:45', prize: '777 Jackpot' },
  ];

  const filteredHistory = mockHistory.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'wins') return item.type === 'win';
    if (filter === 'losses') return item.type === 'loss';
    if (filter === 'deposits') return item.type === 'deposit';
    return true;
  });

  const getIcon = (type: string) => {
    if (type === 'win') return <TrendingUp className="text-green-400" size={20} />;
    if (type === 'loss') return <TrendingDown className="text-red-400" size={20} />;
    if (type === 'deposit') return <Wallet className="text-blue-400" size={20} />;
  };

  const getLabel = (type: string) => {
    if (type === 'win') return 'Выигрыш';
    if (type === 'loss') return 'Проигрыш';
    if (type === 'deposit') return 'Пополнение';
  };

  const totalWins = mockHistory.filter(h => h.type === 'win').length;
  const totalLosses = mockHistory.filter(h => h.type === 'loss').length;
  const totalDeposits = mockHistory.filter(h => h.type === 'deposit').reduce((sum, h) => sum + h.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg via-bg to-bg/95">
      <TopBar title="Gifts Battle" showBack={true} showMenu={true} />

      <div className="p-4 space-y-4">
        <div className="card p-6 bg-gradient-to-br from-purple-600/20 to-fuchsia-600/20 border-purple-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <HistoryIcon className="text-purple-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">История активности</h2>
              <p className="text-sm text-white/70">Все твои игры и транзакции</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 bg-black/30 rounded-xl text-center">
              <div className="text-xl font-bold text-green-400">{totalWins}</div>
              <div className="text-xs text-white/70">Выигрышей</div>
            </div>
            <div className="p-3 bg-black/30 rounded-xl text-center">
              <div className="text-xl font-bold text-red-400">{totalLosses}</div>
              <div className="text-xs text-white/70">Проигрышей</div>
            </div>
            <div className="p-3 bg-black/30 rounded-xl text-center">
              <div className="text-xl font-bold text-blue-400">{totalDeposits}</div>
              <div className="text-xs text-white/70">Депозиты ⭐</div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
              filter === 'all'
                ? 'bg-white text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Все
          </button>
          <button
            onClick={() => setFilter('wins')}
            className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
              filter === 'wins'
                ? 'bg-green-500 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Выигрыши
          </button>
          <button
            onClick={() => setFilter('losses')}
            className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
              filter === 'losses'
                ? 'bg-red-500 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Проигрыши
          </button>
          <button
            onClick={() => setFilter('deposits')}
            className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
              filter === 'deposits'
                ? 'bg-blue-500 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Депозиты
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8 text-white/50">Загрузка...</div>
        ) : filteredHistory.length === 0 ? (
          <div className="card p-8 text-center">
            <div className="text-6xl mb-4">📊</div>
            <div className="text-xl font-bold mb-2">Нет записей</div>
            <div className="text-sm text-white/60">
              История пуста для выбранного фильтра
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className="card p-4 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    item.type === 'win' ? 'bg-green-500/20' :
                    item.type === 'loss' ? 'bg-red-500/20' :
                    'bg-blue-500/20'
                  }`}>
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">
                      {getLabel(item.type)}
                      {item.game && ` - ${item.game}`}
                    </div>
                    {item.prize && (
                      <div className="text-sm text-yellow-400">{item.prize}</div>
                    )}
                    <div className="text-xs text-white/50">{item.date}</div>
                  </div>
                  <div className={`text-lg font-bold ${
                    item.type === 'win' ? 'text-green-400' :
                    item.type === 'loss' ? 'text-red-400' :
                    'text-blue-400'
                  }`}>
                    {item.amount > 0 ? '+' : ''}{item.amount !== 0 ? `${item.amount} ⭐` : 'Бесплатно'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
