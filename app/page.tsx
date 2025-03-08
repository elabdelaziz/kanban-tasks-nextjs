import DesktopSideBar from "./components/aside/DesktopSideBar";
import Nav from "./components/nav/Nav";

export default async function Home() {
  const data = await fetch("http://localhost:3000/api/userData").then((res) =>
    res.json()
  );

  return (
    <div className="h-screen dark:bg-bgDark dark:text-white flex flex-col">
      <header className="flex-shrink-0">
        <Nav boards={data.boards} />
      </header>

      <div className="relative flex flex-grow overflow-hidden">
        <DesktopSideBar boards={data.boards} />

        <main className="dark:bg-mainDark bg-bgWhite flex-grow overflow-scroll hide-scrollbar ">
          <section className="h-[200vh] "></section>
        </main>
      </div>
    </div>
  );
}
