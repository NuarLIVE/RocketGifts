/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#17181C",
        surface: "#1E1F24",
        card: "#242731",
        line: "rgba(255,255,255,.08)",
        textMute: "#8B92A0",

        // Акценты
        primary: "#007AFF",
        gold: "#FFD166",
        purple: "#9B5CFF",
        indigo: "#5C7CFF",
        emerald: "#37D29B",
        orange: "#FF8B4D",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.35)",
        inset: "inset 0 0 0 1px rgba(255,255,255,.04)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    },
  },
  plugins: [],
}
