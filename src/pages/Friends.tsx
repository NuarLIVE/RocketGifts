import { useState, useEffect } from "react";
import { Copy, Users, Check } from "lucide-react";
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

  return (
    <div className="pb-24 min-h-screen bg-gradient-to-b from-bg via-bg to-bg/95">
      <TopBar title="Rocket Gifts" />

      <div className="p-4 space-y-4">
        <div className="card p-6 bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border-yellow-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <Users className="text-yellow-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Пригласи друзей</h2>
              <p className="text-sm text-white/70">Получай бонусы за каждого друга</p>
            </div>
          </div>

          <div className="mb-4 p-4 bg-black/30 rounded-xl">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-1">{referrals.length}</div>
              <div className="text-sm text-white/70">Приглашено друзей</div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/70">Твоя реферальная ссылка</label>
            <div className="flex gap-2">
              <input
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono"
                value={referralLink}
                readOnly
              />
              <button
                onClick={copyToClipboard}
                className="btn bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 rounded-xl flex items-center gap-2 transition-all"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Скопировано" : "Копировать"}
              </button>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Users size={20} className="text-yellow-400" />
            Твои рефералы
          </h3>

          {loading ? (
            <div className="text-center py-8 text-white/50">Загрузка...</div>
          ) : referrals.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-white/50 mb-2">Пока нет рефералов</div>
              <div className="text-xs text-white/30">
                Отправь ссылку друзьям в Telegram, Discord или соцсетях
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {referrals.map((referral) => (
                <div
                  key={referral.id}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center font-bold text-sm">
                    {referral.referred_user?.first_name?.[0] || referral.referred_user?.username?.[0] || '?'}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">
                      {referral.referred_user?.first_name || referral.referred_user?.username || 'Пользователь'}
                    </div>
                    <div className="text-xs text-white/50">
                      {new Date(referral.created_at).toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                  <div className="text-sm text-yellow-400 font-semibold">
                    +50 ⭐
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
