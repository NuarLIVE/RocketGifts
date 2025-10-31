import { useEffect, useRef, useState } from "react";

type Props = {
  durationMs?: number;      // длительность прогресса
  onDone?: () => void;      // коллбек по завершении
  soundSrc?: string;        // путь к звуку
  volume?: number;          // громкость 0..1
};

export default function LoaderScreen({
  durationMs = 3600,
  onDone,
  soundSrc = "/launch.mp3",
  volume = 0.6,
}: Props) {
  const [progress, setProgress] = useState(0);
  const [soundReady, setSoundReady] = useState(false);
  const [soundFailed, setSoundFailed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // Инициализация и попытка автоплея
  useEffect(() => {
    const a = new Audio(soundSrc);
    a.volume = volume;
    audioRef.current = a;

    // попытка автозапуска (в Telegram WebView иногда работает)
    a.play()
      .then(() => setSoundReady(true))
      .catch(() => {
        setSoundFailed(false); // покажем кнопку "Включить звук"
      });

    return () => {
      a.pause();
      a.src = "";
      audioRef.current = null;
    };
  }, [soundSrc, volume]);

  // Равномерный прогресс по времени (3–4 сек)
  useEffect(() => {
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(100, (elapsed / durationMs) * 100);
      setProgress(p);

      if (p >= 100) {
        if (onDone) onDone();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [durationMs, onDone]);

  const handleEnableSound = async () => {
    try {
      if (!audioRef.current) return;
      await audioRef.current.play();
      setSoundReady(true);
      setSoundFailed(false);
    } catch {
      // если даже по клику не вышло — просто не тревожим юзера
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-bg z-50">
      {/* ТВОЙ GIF (положи в public/loader.gif) */}
      <img
        src="/loader.gif"
        alt="loading..."
        className="w-32 h-32 mb-6 rounded-xl shadow-lg object-contain"
      />

      <div className="w-64 bg-white/10 rounded-full h-3 overflow-hidden mb-3 border border-white/10">
        <div
          className="bg-gradient-to-r from-emerald-400 to-indigo-400 h-3 transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-lg font-semibold text-white">Rocket Gifts</p>

      {soundFailed && (
        <button
          onClick={handleEnableSound}
          className="mt-3 rounded-lg px-3 py-1.5 text-sm bg-white/10 hover:bg-white/15 border border-white/10"
        >
          Включить звук
        </button>
      )}
    </div>
  );
}
