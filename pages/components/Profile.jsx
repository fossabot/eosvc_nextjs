import ShowProfile from "../../components/user/ShowProfile";
function ProfileComponent() {
  return (
    <main className="w-full h-full">
      <div className="flex justify-center items-center">
        <h1 className="text-4xl font-bold">Nastavení profilu uživatele</h1>
      </div>
      <ShowProfile />
    </main>
  );
}

export default ProfileComponent;
