import { useState, useEffect } from "react";
import { themes, ThemeName } from "../theme";
import { Star } from "lucide-react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeName>(
    (localStorage.getItem("theme") as ThemeName) || "gold"
  );

  useEffect(() => {
    const t = themes[theme];
    document.body.style.background = t.background;
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="fixed top-3 right-3 z-50 flex gap-2">
      {Object.keys(themes).map((key) => {
        const t = themes[key as ThemeName];
        const active = theme === key;
        return (
          <button
            key={key}
            onClick={() => setTheme(key as ThemeName)}
            className={`px-3 py-2 text-xs rounded-xl font-medium ${
              active ? "bg-white/20 text-white" : "bg-white/10 text-gray-300 hover:bg-white/15"
            }`}
          >
            {t.name}
          </button>
        );
      })}
      {themes[theme].stars && <CosmoStars />}
    </div>
  );
}

function CosmoStars() {
  const [stars, setStars] = useState<{ x: number; y: number; size: number }[]>([]);

  useEffect(() => {
    const s = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 0.5
    }));
    setStars(s);
    const animate = () => {
      setStars((prev) =>
        prev.map((star) => ({
          ...star,
          y: (star.y + 0.2) % window.innerHeight
        }))
      );
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {stars.map((star, i) => (
        <Star
          key={i}
          size={star.size * 5}
          className="absolute text-white/30"
          style={{
            left: star.x,
            top: star.y,
            opacity: Math.random() * 0.9 + 0.1
          }}
        />
      ))}
    </div>
  );
}
