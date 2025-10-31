import TopBar from "../components/TopBar";
import ProfileCard from "../components/ProfileCard";

export default function Profile(){
  return (
    <div className="pb-24">
      <TopBar title="Профиль" />
      <div className="p-4 space-y-4">
        <ProfileCard />
        <div className="card p-4">
          <div className="flex gap-2 mb-3">
            <button className="btn">Мои подарки</button>
            <button className="btn">История</button>
          </div>
          <div className="text-center sub">У вас пока нет подарков — но это поправимо 😉</div>
        </div>
      </div>
    </div>
  )
}
