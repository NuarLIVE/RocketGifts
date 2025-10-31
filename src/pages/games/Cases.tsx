import { useState } from "react";
import { ArrowLeft, Box } from "lucide-react";
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

export default function Cases() {
  const navigate = useNavigate();
  const [isOpening, setIsOpening] = useState(false);
  const [wonItem, setWonItem] = useState<CaseItem | null>(null);

  const caseItems: CaseItem[] = [
    { id: '1', name: 'Bronze Star NFT', rarity: 'common', image: '⭐' },
    { id: '2', name: 'Silver Gem NFT', rarity: 'rare', image: '💎' },
    { id: '3', name: 'Gold Crown NFT', rarity: 'epic', image: '👑' },
    { id: '4', name: 'Legendary Rocket NFT', rarity: 'legendary', image: '🚀' },
    { id: '5', name: 'Magic Coin NFT', rarity: 'common', image: '🪙' },
    { id: '6', name: 'Ruby Stone NFT', rarity: 'rare', image: '💍' },
  ];

  const openCase = () => {
    setIsOpening(true);
    setWonItem(null);

    setTimeout(() => {
      const randomItem = caseItems[Math.floor(Math.random() * caseItems.length)];
      setWonItem(randomItem);
      setIsOpening(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg via-bg to-bg/95">
      <TopBar
        title="Кейсы"
        right={
          <button onClick={() => navigate('/play')} className="btn-ghost p-2">
            <ArrowLeft size={20} />
          </button>
        }
      />

      <div className="p-4 space-y-6">
        <div className="card p-6 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Box className="text-blue-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Стандартный кейс</h2>
              <p className="text-sm text-white/70">Открой и получи случайный NFT</p>
            </div>
          </div>

          <div className="mb-4 p-4 bg-black/30 rounded-xl text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">100 ⭐</div>
            <div className="text-sm text-white/70">Цена открытия</div>
          </div>

          {!isOpening && !wonItem && (
            <button
              onClick={openCase}
              className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold w-full py-4 rounded-xl transition-all"
            >
              Открыть кейс
            </button>
          )}

          {isOpening && (
            <div className="py-8 text-center">
              <div className="animate-spin w-16 h-16 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full"></div>
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
                onClick={() => setWonItem(null)}
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
      </div>
    </div>
  );
}
