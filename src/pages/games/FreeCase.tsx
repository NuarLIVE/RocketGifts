import { useState, useEffect } from "react";
import { ArrowLeft, Gift, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";

interface CaseItem {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
}

const rarityColors = {
  common: 'from-gray-500 to-gray-700',
  rare: 'from-blue-500 to-blue-700',
  epic: 'from-purple-500 to-purple-700',
  legendary: 'from-yellow-500 to-orange-600'
};

export default function FreeCase() {
  const navigate = useNavigate();
  const [isOpening, setIsOpening] = useState(false);
  const [wonItem, setWonItem] = useState<CaseItem | null>(null);
  const [canOpen, setCanOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);

  const caseItems: CaseItem[] = [
    { id: '1', name: 'Bonus Stars', rarity: 'common', image: '⭐' },
    { id: '2', name: 'Free Spin Token', rarity: 'rare', image: '🎰' },
    { id: '3', name: 'Lucky Coin', rarity: 'epic', image: '🪙' },
    { id: '4', name: 'Jackpot Ticket', rarity: 'legendary', image: '🎫' },
  ];

  useEffect(() => {
    const lastOpen = localStorage.getItem('lastFreeCase');
    if (lastOpen) {
      const lastOpenTime = new Date(lastOpen).getTime();
      const now = Date.now();
      const timeDiff = 24 * 60 * 60 * 1000 - (now - lastOpenTime);

      if (timeDiff > 0) {
        setCanOpen(false);
        setTimeLeft(Math.floor(timeDiff / 1000));
      }
    }
  }, []);

  useEffect(() => {
    if (!canOpen && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setCanOpen(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [canOpen, timeLeft]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}ч ${minutes}м ${secs}с`;
  };

  const openCase = () => {
    if (!canOpen) return;

    setIsOpening(true);
    setWonItem(null);

    setTimeout(() => {
      const randomItem = caseItems[Math.floor(Math.random() * caseItems.length)];
      setWonItem(randomItem);
      setIsOpening(false);

      localStorage.setItem('lastFreeCase', new Date().toISOString());
      setCanOpen(false);
      setTimeLeft(24 * 60 * 60);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg via-bg to-bg/95">
      <TopBar
        title="Бесплатный кейс"
        right={
          <button onClick={() => navigate('/play')} className="btn-ghost p-2">
            <ArrowLeft size={20} />
          </button>
        }
      />

      <div className="p-4 space-y-6">
        <div className="card p-6 bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border-yellow-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <Gift className="text-yellow-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Ежедневный кейс</h2>
              <p className="text-sm text-white/70">Открывай каждый день бесплатно</p>
            </div>
          </div>

          <div className="mb-4 p-4 bg-black/30 rounded-xl text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">Бесплатно</div>
            <div className="text-sm text-white/70">Один раз в 24 часа</div>
          </div>

          {canOpen && !isOpening && !wonItem && (
            <button
              onClick={openCase}
              className="btn bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-full py-4 rounded-xl transition-all"
            >
              Открыть бесплатный кейс
            </button>
          )}

          {!canOpen && !isOpening && !wonItem && (
            <div className="py-6 text-center">
              <Clock className="mx-auto mb-3 text-yellow-400" size={48} />
              <div className="text-lg font-semibold mb-2">Следующий кейс через:</div>
              <div className="text-3xl font-bold text-yellow-400">{formatTime(timeLeft)}</div>
              <div className="text-sm text-white/60 mt-3">Возвращайся завтра за новым призом</div>
            </div>
          )}

          {isOpening && (
            <div className="py-8 text-center">
              <div className="animate-spin w-16 h-16 mx-auto mb-4 border-4 border-yellow-500 border-t-transparent rounded-full"></div>
              <div className="text-lg font-semibold">Открываем кейс...</div>
            </div>
          )}

          {wonItem && (
            <div className="py-6 text-center">
              <div className={`mx-auto w-32 h-32 rounded-2xl bg-gradient-to-br ${rarityColors[wonItem.rarity]} flex items-center justify-center text-6xl mb-4 animate-pulse`}>
                {wonItem.image}
              </div>
              <div className="text-2xl font-bold mb-2">{wonItem.name}</div>
              <div className="text-sm text-white/70 mb-4 capitalize">Редкость: {wonItem.rarity}</div>
              <button
                onClick={() => { setWonItem(null); setCanOpen(false); setTimeLeft(24 * 60 * 60); }}
                className="btn bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-xl"
              >
                Забрать приз
              </button>
            </div>
          )}
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold mb-4">Возможные призы</h3>
          <div className="grid grid-cols-2 gap-3">
            {caseItems.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-xl bg-gradient-to-br ${rarityColors[item.rarity]} border border-white/10`}
              >
                <div className="text-4xl text-center mb-2">{item.image}</div>
                <div className="text-sm font-semibold text-center">{item.name}</div>
                <div className="text-xs text-center text-white/70 capitalize mt-1">{item.rarity}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6 bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/30">
          <div className="text-center">
            <div className="text-3xl mb-3">🎁</div>
            <h3 className="text-lg font-bold mb-2">Ежедневная награда</h3>
            <p className="text-sm text-white/60">
              Не пропускай ни одного дня и получай бонусы каждые 24 часа
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
