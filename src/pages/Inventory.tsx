import { useState, useEffect } from "react";
import { ArrowLeft, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import { supabase, InventoryItem } from "../lib/supabase";

const rarityColors = {
  common: 'from-gray-500 to-gray-700',
  rare: 'from-blue-500 to-blue-700',
  epic: 'from-purple-500 to-purple-700',
  legendary: 'from-yellow-500 to-orange-600'
};

export default function Inventory() {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    setLoading(true);
    const mockUserId = "00000000-0000-0000-0000-000000000001";

    const { data, error } = await supabase
      .from('inventory')
      .select(`
        *,
        nft_item:nft_items(*)
      `)
      .eq('user_id', mockUserId)
      .order('acquired_at', { ascending: false });

    if (!error && data) {
      setInventory(data as any);
    }

    setLoading(false);
  };

  const mockInventory = [
    { id: '1', name: 'Legendary Rocket NFT', rarity: 'legendary' as const, image: '🚀', game: 'Кейсы', date: '2024-10-28' },
    { id: '2', name: 'Gold Crown NFT', rarity: 'epic' as const, image: '👑', game: 'Слоты', date: '2024-10-27' },
    { id: '3', name: 'Silver Gem NFT', rarity: 'rare' as const, image: '💎', game: 'Кейсы', date: '2024-10-26' },
    { id: '4', name: 'Bronze Star NFT', rarity: 'common' as const, image: '⭐', game: 'Бесплатный кейс', date: '2024-10-25' },
    { id: '5', name: 'Ruby Stone NFT', rarity: 'rare' as const, image: '💍', game: 'Рулетка', date: '2024-10-24' },
    { id: '6', name: 'Magic Coin NFT', rarity: 'common' as const, image: '🪙', game: 'Улучшения', date: '2024-10-23' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg via-bg to-bg/95">
      <TopBar
        title="Инвентарь"
        right={
          <button onClick={() => navigate('/profile')} className="btn-ghost p-2">
            <ArrowLeft size={20} />
          </button>
        }
      />

      <div className="p-4 space-y-4">
        <div className="card p-6 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Package className="text-blue-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Мои NFT</h2>
              <p className="text-sm text-white/70">Все выигранные призы</p>
            </div>
          </div>

          <div className="p-4 bg-black/30 rounded-xl text-center">
            <div className="text-3xl font-bold text-blue-400 mb-1">{mockInventory.length}</div>
            <div className="text-sm text-white/70">Всего предметов</div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8 text-white/50">Загрузка...</div>
        ) : mockInventory.length === 0 ? (
          <div className="card p-8 text-center">
            <div className="text-6xl mb-4">📦</div>
            <div className="text-xl font-bold mb-2">Инвентарь пуст</div>
            <div className="text-sm text-white/60 mb-4">
              Начни играть и выигрывать NFT призы
            </div>
            <button
              onClick={() => navigate('/play')}
              className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl"
            >
              Играть
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {mockInventory.map((item) => (
              <div
                key={item.id}
                className={`card p-4 bg-gradient-to-br ${rarityColors[item.rarity]} border border-white/10 hover:scale-105 transition-transform`}
              >
                <div className="text-5xl text-center mb-3">{item.image}</div>
                <div className="text-sm font-bold text-center mb-1">{item.name}</div>
                <div className="text-xs text-center text-white/70 capitalize mb-2">
                  {item.rarity}
                </div>
                <div className="text-xs text-center text-white/50 border-t border-white/10 pt-2">
                  <div>Из: {item.game}</div>
                  <div className="mt-1">{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="card p-6">
          <h3 className="text-lg font-bold mb-3">Распределение по редкости</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-xl border border-yellow-500/30">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600"></div>
                <span className="font-semibold">Legendary</span>
              </div>
              <span className="text-yellow-400 font-bold">1</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 rounded-xl border border-purple-500/30">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-500 to-purple-700"></div>
                <span className="font-semibold">Epic</span>
              </div>
              <span className="text-purple-400 font-bold">1</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl border border-blue-500/30">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-700"></div>
                <span className="font-semibold">Rare</span>
              </div>
              <span className="text-blue-400 font-bold">2</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-600/20 to-gray-700/20 rounded-xl border border-gray-500/30">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gray-500 to-gray-700"></div>
                <span className="font-semibold">Common</span>
              </div>
              <span className="text-gray-400 font-bold">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
