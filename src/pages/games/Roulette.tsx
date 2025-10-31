import { useState } from "react";
import { ArrowLeft, Disc } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";

type BetType = 'even' | 'odd' | 'zero' | null;

export default function Roulette() {
  const navigate = useNavigate();
  const [selectedBet, setSelectedBet] = useState<BetType>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [outcome, setOutcome] = useState<'win' | 'loss' | null>(null);

  const spin = () => {
    if (!selectedBet) return;

    setIsSpinning(true);
    setResult(null);
    setOutcome(null);

    setTimeout(() => {
      const winningNumber = Math.floor(Math.random() * 37);
      setResult(winningNumber);

      let isWin = false;
      if (selectedBet === 'zero' && winningNumber === 0) {
        isWin = true;
      } else if (selectedBet === 'even' && winningNumber !== 0 && winningNumber % 2 === 0) {
        isWin = true;
      } else if (selectedBet === 'odd' && winningNumber % 2 === 1) {
        isWin = true;
      }

      setOutcome(isWin ? 'win' : 'loss');
      setIsSpinning(false);
    }, 3000);
  };

  const getBetLabel = (bet: BetType) => {
    if (bet === 'even') return 'Четное';
    if (bet === 'odd') return 'Нечетное';
    if (bet === 'zero') return 'Ноль';
    return '';
  };

  const getWinAmount = () => {
    if (selectedBet === 'zero') return 1750;
    return 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg via-bg to-bg/95">
      <TopBar
        title="Рулетка"
        right={
          <button onClick={() => navigate('/play')} className="btn-ghost p-2">
            <ArrowLeft size={20} />
          </button>
        }
      />

      <div className="p-4 space-y-6">
        <div className="card p-6 bg-gradient-to-br from-purple-600/20 to-fuchsia-600/20 border-purple-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Disc className="text-purple-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Классическая рулетка</h2>
              <p className="text-sm text-white/70">Выбери ставку и испытай удачу</p>
            </div>
          </div>

          <div className="mb-6 p-8 bg-black/40 rounded-2xl border-2 border-purple-500/30">
            <div className="relative w-48 h-48 mx-auto">
              <div className={`absolute inset-0 rounded-full border-8 border-purple-500 ${isSpinning ? 'animate-spin' : ''}`}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  {result !== null ? (
                    <>
                      <div className="text-5xl font-bold text-purple-400">{result}</div>
                      <div className="text-sm text-white/70 mt-1">
                        {result === 0 ? 'Ноль' : result % 2 === 0 ? 'Четное' : 'Нечетное'}
                      </div>
                    </>
                  ) : (
                    <Disc className="text-purple-400" size={48} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3 text-white/70">Выбери ставку (50 ⭐)</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setSelectedBet('even')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedBet === 'even'
                    ? 'bg-blue-500/30 border-blue-400'
                    : 'bg-white/5 border-white/10 hover:border-blue-400/50'
                }`}
                disabled={isSpinning}
              >
                <div className="text-lg font-bold">Четное</div>
                <div className="text-xs text-white/60 mt-1">x2</div>
              </button>

              <button
                onClick={() => setSelectedBet('odd')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedBet === 'odd'
                    ? 'bg-red-500/30 border-red-400'
                    : 'bg-white/5 border-white/10 hover:border-red-400/50'
                }`}
                disabled={isSpinning}
              >
                <div className="text-lg font-bold">Нечетное</div>
                <div className="text-xs text-white/60 mt-1">x2</div>
              </button>

              <button
                onClick={() => setSelectedBet('zero')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedBet === 'zero'
                    ? 'bg-green-500/30 border-green-400'
                    : 'bg-white/5 border-white/10 hover:border-green-400/50'
                }`}
                disabled={isSpinning}
              >
                <div className="text-lg font-bold">Ноль</div>
                <div className="text-xs text-white/60 mt-1">x35</div>
              </button>
            </div>
          </div>

          {!isSpinning && !outcome && (
            <button
              onClick={spin}
              disabled={!selectedBet}
              className={`w-full py-4 rounded-xl font-semibold transition-all ${
                selectedBet
                  ? 'btn bg-purple-500 hover:bg-purple-600 text-white'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {selectedBet ? `Крутить (${getBetLabel(selectedBet)})` : 'Выбери ставку'}
            </button>
          )}

          {isSpinning && (
            <div className="py-4 text-center">
              <div className="text-lg font-semibold">Крутим рулетку...</div>
            </div>
          )}

          {outcome && (
            <div className="py-4 text-center">
              {outcome === 'win' ? (
                <>
                  <div className="text-3xl font-bold text-green-400 mb-2">Выигрыш!</div>
                  <div className="text-2xl mb-4">+{getWinAmount()} ⭐</div>
                  <button
                    onClick={() => { setOutcome(null); setResult(null); setSelectedBet(null); }}
                    className="btn bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-xl"
                  >
                    Играть еще
                  </button>
                </>
              ) : (
                <>
                  <div className="text-3xl font-bold text-red-400 mb-2">Проигрыш</div>
                  <div className="text-sm text-white/70 mb-4">Выпало {result}. Попробуй снова!</div>
                  <button
                    onClick={() => { setOutcome(null); setResult(null); setSelectedBet(null); }}
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
          <h3 className="text-lg font-bold mb-3">Правила игры</h3>
          <div className="space-y-2 text-sm text-white/70">
            <p>• Четное/Нечетное - множитель x2 (исключая 0)</p>
            <p>• Ноль - множитель x35</p>
            <p>• Числа от 0 до 36</p>
            <p>• Ставка: 50 звезд</p>
          </div>
        </div>
      </div>
    </div>
  );
}
