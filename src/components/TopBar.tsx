import { Gift, Languages, Headphones, Ticket } from "lucide-react";

export default function TopBar({ title = "RocketGifts🚀", right }: { title?: string; right?: React.ReactNode }) {
  return (
    <div className="sticky top-0 z-20 bg-bg/80 blur-panel px-4 pt-3 pb-2 flex items-center justify-between border-b border-line">
      <div className="text-lg font-semibold">{title}</div>
      <div className="flex items-center gap-2">
        <button className="btn-ghost p-2"><Headphones size={18}/></button>
        <button className="btn-ghost p-2"><Languages size={18}/></button>
        <button className="btn-ghost p-2"><Ticket size={18}/></button>
        {right}
      </div>
    </div>
  )
}
