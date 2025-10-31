export type ThemeName = "gold" | "indigo" | "neon" | "cosmo";

export const themes: Record<ThemeName, any> = {
  gold: {
    name: "Gold",
    gradient: "from-gold/30 to-orange/30",
    accent: "#FFD166",
    background: "#0b0d10",
    stars: false
  },
  indigo: {
    name: "Indigo",
    gradient: "from-indigo/25 to-purple/25",
    accent: "#6b8cff",
    background: "#0a0b11",
    stars: false
  },
  neon: {
    name: "Neon",
    gradient: "from-emerald/30 to-purple/30",
    accent: "#37D29B",
    background: "#000005",
    stars: false
  },
  cosmo: {
    name: "Cosmo",
    gradient: "from-blue-800/30 to-indigo-800/30",
    accent: "#8cc7ff",
    background: "#040816",
    stars: true
  }
};
