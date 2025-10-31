import TopBar from "../components/TopBar";

export default function Market(){
  return (
    <div className="pb-24">
      <TopBar title="Portals Market" />
      <div className="p-4 space-y-4">

        <div className="card p-5 relative overflow-hidden">
          <div className="text-center">
            <div className="h1">Season #1</div>
            <div className="sub">Зарабатывай очки и поднимайся в таблице лидеров</div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="card p-4">
              <div className="sub">Мои очки</div>
              <div className="text-2xl font-semibold mt-1">1 479 ⭐</div>
              <div className="mt-3 text-sm text-white/80 space-y-1">
                <div className="flex justify-between"><span>Покупки</span><span>1 / 279</span></div>
                <div className="flex justify-between"><span>Продажи</span><span>2 / 600</span></div>
                <div className="flex justify-between"><span>Рефералы</span><span>0 / 0</span></div>
                <div className="flex justify-between"><span>Задания</span><span>4 / 600</span></div>
              </div>
            </div>

            <div className="card p-4 flex flex-col justify-center items-center">
              <div className="sub mb-2">Лидерборд</div>
              <div className="h-20 w-full rounded-xl bg-gradient-to-br from-gold/25 to-orange/20 border border-gold/40 flex items-center justify-center text-white/90">
                Награды для Top-250
              </div>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="h2 mb-2">Задания</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-20 rounded-xl bg-gradient-to-br from-indigo/20 to-purple/20 border border-indigo/40 p-3">
              <div className="text-sm font-medium">Подтверди почту</div>
              <div className="sub">+50 ⭐</div>
            </div>
            <div className="h-20 rounded-xl bg-gradient-to-br from-emerald/20 to-gold/20 border border-emerald/40 p-3">
              <div className="text-sm font-medium">Привяжи кошелёк</div>
              <div className="sub">+100 ⭐</div>
            </div>
            <div className="h-20 rounded-xl bg-white/5 border border-line p-3">
              <div className="text-sm font-medium">Сделай покупку</div>
              <div className="sub">+200 ⭐</div>
            </div>
            <div className="h-20 rounded-xl bg-white/5 border border-line p-3">
              <div className="text-sm font-medium">Пригласи друга</div>
              <div className="sub">+150 ⭐</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
