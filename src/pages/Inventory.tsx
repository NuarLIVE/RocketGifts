import { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import { supabase, InventoryItem } from "../lib/supabase";

const rarityColors = {
  common: 'from-gray-500 to-gray-700',
  rare: 'from-blue-500 to-blue-700',
  epic: 'from-purple-500 to-purple-700',
  legendary: 'from-yellow-500 to-orange-600'
};

export default function Inventory() {
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
  ];

  const avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=RocketGifts";

  return (
    <div className="min-h-screen bg-bg pb-20">
      <TopBar title="Gifts Battle" showBack={true} showMenu={true} />

      <div className="p-4 space-y-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-14 h-14 rounded-full border-2 border-line"
            />
            <div className="flex-1">
              <h2 className="text-base font-semibold">Mickey</h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white text-xl">+</span>
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
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8 text-textMute">Загрузка...</div>
        ) : mockInventory.length === 0 ? (
          <div className="card p-8 text-center">
            <div className="text-6xl mb-4">📦</div>
            <div className="text-lg font-bold mb-2">Инвентарь пуст</div>
            <div className="text-sm text-textMute">
              Начни играть и выигрывать NFT призы
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {mockInventory.map((item) => (
              <div
                key={item.id}
                className={`card p-4 bg-gradient-to-br ${rarityColors[item.rarity]} border-0`}
              >
                <div className="text-5xl text-center mb-3">{item.image}</div>
                <div className="text-sm font-bold text-center mb-1">{item.name}</div>
                <div className="text-xs text-center text-white/70 capitalize">
                  {item.rarity}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
