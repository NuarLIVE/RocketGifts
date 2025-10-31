import { useState } from "react";
import { ArrowLeft, Cherry } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";

const symbols = ['🍒', '🍋', '🍊', '🍇', '7️⃣', '💎', '⭐'];

export default function Slots() {
  const navigate = useNavigate();
  const [reels, setReels] = useState(['🍒', '🍋', '🍊']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<'win' | 'loss' | null>(null);
  const [winAmount, setWinAmount] = useState(0);

  const spin = () => {
    setIsSpinning(true);
    setResult(null);

    let spinCount = 0;
    const interval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]);
      spinCount++;

      if (spinCount >= 20) {
        clearInterval(interval);

        const isWin = Math.random() < 0.3;
        let finalReels;

        if (isWin) {
          const winSymbol = symbols[Math.floor(Math.random() * symbols.length)];
          finalReels = [winSymbol, winSymbol, winSymbol];

          let multiplier = 2;
          if (winSymbol === '7️⃣') multiplier = 10;
          else if (winSymbol === '💎') multiplier = 7;
          else if (winSymbol === '⭐') multiplier = 5;

          setWinAmount(50 * multiplier);
          setResult('win');
        } else {
          finalReels = [
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)]
          ];
          while (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
            finalReels[2] = symbols[Math.floor(Math.random() * symbols.length)];
          }
          setResult('loss');
        }

        setReels(finalReels);
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg via-bg to-bg/95">
      <TopBar
        title="Слоты"
        right={
          <button onClick={() => navigate('/play')} className="btn-ghost p-2">
            <ArrowLeft size={20} />
          </button>
        }
      />

      <div className="p-4 space-y-6">
        <div className="card p-6 bg-gradient-to-br from-red-600/20 to-pink-600/20 border-red-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-500/20 rounded-xl">
              <Cherry className="text-red-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Классические слоты</h2>
              <p className="text-sm text-white/70">Собери три одинаковых символа</p>
            </div>
          </div>

          <div className="mb-4 p-4 bg-black/30 rounded-xl text-center">
            <div className="text-2xl font-bold text-red-400 mb-1">50 ⭐</div>
            <div className="text-sm text-white/70">Ставка за спин</div>
          </div>

          <div className="mb-6 p-6 bg-black/40 rounded-2xl border-2 border-yellow-500/30">
            <div className="flex justify-center gap-4">
              {reels.map((symbol, index) => (
                <div
                  key={index}
                  className={`w-24 h-24 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl flex items-center justify-center text-5xl border-2 border-yellow-500/50 ${
                    isSpinning ? 'animate-pulse' : ''
                  }`}
                >
                  {symbol}
                </div>
              ))}
            </div>
          </div>

          {!isSpinning && !result && (
            <button
              onClick={spin}
              className="btn bg-red-500 hover:bg-red-600 text-white font-semibold w-full py-4 rounded-xl transition-all"
            >
              Крутить слоты
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
                  <div className="text-2xl mb-4">+{winAmount} ⭐</div>
                  <button
                    onClick={() => setResult(null)}
                    className="btn bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-xl"
                  >
                    Крутить еще
                  </button>
                </>
              ) : (
                <>
                  <div className="text-3xl font-bold text-red-400 mb-2">Проигрыш</div>
                  <div className="text-sm text-white/70 mb-4">Попробуй еще раз!</div>
                  <button
                    onClick={() => setResult(null)}
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
          <h3 className="text-lg font-bold mb-4">Таблица выплат</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="text-2xl">7️⃣ 7️⃣ 7️⃣</span>
              </div>
              <div className="text-yellow-400 font-bold">x10</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💎 💎 💎</span>
              </div>
              <div className="text-blue-400 font-bold">x7</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐ ⭐ ⭐</span>
              </div>
              <div className="text-yellow-400 font-bold">x5</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🍒 🍋 🍊 🍇</span>
              </div>
              <div className="text-green-400 font-bold">x2</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
