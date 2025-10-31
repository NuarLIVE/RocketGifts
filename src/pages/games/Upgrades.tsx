import { useState } from "react";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";

export default function Upgrades() {
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<'win' | 'loss' | null>(null);

  const winChance = 45;

  const spin = () => {
    setIsSpinning(true);
    setResult(null);

    const spins = 5 + Math.random() * 3;
    const isWin = Math.random() * 100 < winChance;

    let finalAngle;
    if (isWin) {
      finalAngle = Math.random() * 162;
    } else {
      finalAngle = 162 + Math.random() * 198;
    }

    const totalRotation = spins * 360 + finalAngle;
    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setResult(isWin ? 'win' : 'loss');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg via-bg to-bg/95">
      <TopBar
        title="Улучшения"
        right={
          <button onClick={() => navigate('/play')} className="btn-ghost p-2">
            <ArrowLeft size={20} />
          </button>
        }
      />

      <div className="p-4 space-y-6">
        <div className="card p-6 bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <TrendingUp className="text-green-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Улучшение</h2>
              <p className="text-sm text-white/70">Крути колесо и попади в зону выигрыша</p>
            </div>
          </div>

          <div className="mb-4 p-4 bg-black/30 rounded-xl">
            <div className="text-center mb-2">
              <div className="text-2xl font-bold text-green-400 mb-1">50 ⭐</div>
              <div className="text-sm text-white/70">Ставка</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-yellow-400">{winChance}%</div>
              <div className="text-xs text-white/60">Шанс выигрыша</div>
            </div>
          </div>

          <div className="relative mb-6">
            <div className="w-64 h-64 mx-auto relative">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="20"
                  strokeDasharray={`${162 * Math.PI / 180 * 90} ${360 * Math.PI / 180 * 90}`}
                  strokeDashoffset="0"
                  className="opacity-50"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="20"
                  strokeDasharray={`${198 * Math.PI / 180 * 90} ${360 * Math.PI / 180 * 90}`}
                  strokeDashoffset={`-${162 * Math.PI / 180 * 90}`}
                  className="opacity-50"
                />
              </svg>

              <div className="absolute top-1/2 left-1/2 w-0 h-0 -translate-x-1/2 -translate-y-1/2 z-10">
                <div
                  className="transition-transform duration-[4000ms] ease-out origin-bottom"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transformOrigin: 'center bottom'
                  }}
                >
                  <div className="w-1 h-24 bg-white -translate-x-1/2 relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-white"></div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-bg rounded-full border-4 border-white flex items-center justify-center">
                <TrendingUp className="text-white" size={24} />
              </div>
            </div>
          </div>

          {!isSpinning && !result && (
            <button
              onClick={spin}
              className="btn bg-green-500 hover:bg-green-600 text-white font-semibold w-full py-4 rounded-xl transition-all"
            >
              Крутить колесо
            </button>
          )}

          {isSpinning && (
            <div className="py-4 text-center">
              <div className="text-lg font-semibold">Крутим...</div>
            </div>
          )}

          {result && (
            <div className="py-4 text-center">
              {result === 'win' ? (
                <>
                  <div className="text-3xl font-bold text-green-400 mb-2">Выигрыш!</div>
                  <div className="text-lg mb-4">+100 ⭐</div>
                  <button
                    onClick={() => { setResult(null); setRotation(0); }}
                    className="btn bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-xl"
                  >
                    Попробовать снова
                  </button>
                </>
              ) : (
                <>
                  <div className="text-3xl font-bold text-red-400 mb-2">Проигрыш</div>
                  <div className="text-sm text-white/70 mb-4">В следующий раз повезет!</div>
                  <button
                    onClick={() => { setResult(null); setRotation(0); }}
                    className="btn bg-gray-500 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded-xl"
                  >
                    Попробовать снова
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold mb-3">Как играть</h3>
          <div className="space-y-2 text-sm text-white/70">
            <p>• Зеленая зона - выигрыш (45%)</p>
            <p>• Красная зона - проигрыш (55%)</p>
            <p>• Попади стрелкой в зеленую зону и удвой свою ставку</p>
          </div>
        </div>
      </div>
    </div>
  );
}
