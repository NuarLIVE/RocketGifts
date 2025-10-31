import TopBar from "../components/TopBar";

export default function Friends(){
  return (
    <div className="pb-24">
      <TopBar title="Друзья" />
      <div className="p-4 space-y-4">
        <div className="card p-4">
          <div className="text-sm text-white/70 mb-2">Пригласи друзей и получай бонусы</div>
          <div className="flex gap-2">
            <input className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2" value="https://t.me/CasesStarBot?start=xxxx" readOnly/>
            <button className="btn">Скопировать</button>
          </div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-white/70">Пока нет друзей</div>
          <div className="text-xs text-white/50">Ссылку можно отправить в Telegram, Discord и т.д.</div>
        </div>
      </div>
    </div>
  )
}