import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import TopBar from "../components/TopBar";
import { supabase, Referral, User } from "../lib/supabase";

export default function Friends(){
  const [referralLink, setReferralLink] = useState("");
  const [referrals, setReferrals] = useState<(Referral & { referred_user: User })[]>([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReferralData();
  }, []);

  const loadReferralData = async () => {
    setLoading(true);
    const mockUserId = "00000000-0000-0000-0000-000000000001";
    const mockReferralCode = "ABC12345";

    const botUsername = "RocketGiftsBot";
    const link = `https://t.me/${botUsername}?start=${mockReferralCode}`;
    setReferralLink(link);

    const { data, error } = await supabase
      .from('referrals')
      .select(`
        *,
        referred_user:users!referrals_referred_id_fkey(*)
      `)
      .eq('referrer_id', mockUserId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setReferrals(data as any);
    }

    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

        <div className="text-center py-6">
          <h1 className="text-2xl font-bold mb-3">
            Приглашай друзей -<br/>Получай Награды!
          </h1>
          <p className="text-textMute text-sm mb-6">
            Каждый приглашенный друг = 1 <span className="text-pink-400">🎁</span> билет
          </p>

          <div className="flex gap-2 mb-4">
            <button
              onClick={copyToClipboard}
              className="btn-primary flex-1 py-3.5 rounded-xl font-semibold"
            >
              Пригласить друга
            </button>
            <button
              onClick={copyToClipboard}
              className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center"
              style={{background: '#007AFF'}}
            >
              <Copy size={20} className="text-white" />
            </button>
          </div>

          <p className="text-xs text-textMute">
            Если хотите стать партнёром и зарабатывать<br/>
            TON, <span className="text-primary underline">смотреть условия</span>
          </p>
        </div>

        <div className="card p-4">
          <h3 className="text-base font-semibold mb-3">Создание промокода</h3>
          <button className="btn-primary w-full py-3 rounded-xl font-semibold">
            Создать промокод
          </button>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold">Приглашенные друзья</h3>
            <span className="text-textMute">({referrals.length})</span>
          </div>

          {loading ? (
            <div className="text-center py-8 text-textMute">Загрузка...</div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-primary mb-2">
                Друг должен зайти в приложение по вашей<br/>
                ссылке, чтобы вы получили билет.
              </p>
              <p className="text-base font-semibold">
                Пока нет приглашенных друзей
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
