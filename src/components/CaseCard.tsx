export default function CaseCard({
  label = "Бесплатно",
  tone = "blue",
}: { label?: string; tone?: "blue" | "gold" | "emerald" }) {

  const toneClass =
    tone === "gold" ? "from-gold/25 to-orange/20 border-gold/40" :
    tone === "emerald" ? "from-emerald/25 to-gold/20 border-emerald/40" :
    "from-indigo/25 to-purple/20 border-indigo/40";

  return (
    <div className={`rounded-2xl h-28 flex items-center justify-center border bg-gradient-to-br ${toneClass}`}>
      <span className={tone === "gold" ? "badge-gold" : "badge-blue"}>{label}</span>
    </div>
  )
}
