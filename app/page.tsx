import DesktopSideBar from "./components/aside/DesktopSideBar";
import Nav from "./components/nav/Nav";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <header className="flex-shrink-0">
        <Nav />
      </header>

      <div className="relative flex flex-grow overflow-hidden">
        <DesktopSideBar />

        <main className="flex-grow overflow-scroll hide-scrollbar ">
          <div className="h-[200vh] "></div>
        </main>
      </div>
    </div>
  );
}
