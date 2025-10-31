import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import CaseCard from "../components/CaseCard";
import Section from "../components/Section";

export default function Play(){
  return (
    <div className="pb-24">
      <TopBar title="StarCase" />
      <div className="p-4 space-y-4">

        <Section title="Кейсы" to="#">
          <div className="grid grid-cols-2 gap-3">
            <CaseCard label="Бесплатно" tone="emerald"/>
            <CaseCard label="0.12 💎 / 29 ⭐" tone="gold"/>
            <CaseCard label="Скоро" />
            <CaseCard label="Скоро" />
          </div>
        </Section>

        <Section title="Улучшения" to="#">
          <p className="sub mb-3">Выбери текущий подарок и желаемый приз — попробуй повысить шанс.</p>
          <div className="flex items-center gap-3">
            <div className="h-20 flex-1 rounded-2xl bg-white/5 border border-line flex items-center justify-center sub">Ваш подарок</div>
            <div className="h-20 flex-1 rounded-2xl bg-white/5 border border-line flex items-center justify-center sub">Желаемый</div>
          </div>
          <button className="btn-emerald w-full mt-3">Улучшить подарок</button>
        </Section>

        <Section title="Битва рулеток">
          <div className="rounded-2xl border border-line bg-gradient-to-r from-emerald/20 to-indigo/20 p-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/10 h-24"></div>
            <div className="rounded-xl bg-white/10 h-24"></div>
          </div>
        </Section>

        <div className="card p-4 flex items-center justify-between">
          <div>
            <div className="h2">Бесплатный кейс</div>
            <div className="sub">Заходи каждый день и забирай награду</div>
          </div>
          <button className="btn-primary">Открыть</button>
        </div>

        <div className="card p-4">
          <div className="h2 mb-2">Игры</div>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/game/double" className="rounded-2xl border border-indigo/40 bg-gradient-to-br from-indigo/20 to-purple/20 p-4">
              <div className="text-sm font-medium">Double</div>
              <div className="sub">x2 / x14 • Живая лента</div>
            </Link>
            <div className="rounded-2xl border border-line bg-white/5 p-4 opacity-60">
              <div className="text-sm font-medium">Slots</div>
              <div className="sub">Скоро</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
