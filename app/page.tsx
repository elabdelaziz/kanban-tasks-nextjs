import DesktopSideBar from './components/aside/DesktopSideBar'
import Columns from './components/columns/Columns'
import Nav from './components/nav/Nav'
import OverlayModalRenderer from './components/overlays/OverlayModalRenderer'

export default async function Home() {
  const data = await fetch('http://localhost:3000/api/userData').then((res) =>
    res.json(),
  )

  return (
    <div className="h-screen dark:bg-bgDark dark:text-white flex flex-col">
      <header className="flex-shrink-0">
        <Nav boards={data.boards} />
      </header>

      <div className="relative flex flex-grow overflow-hidden">
        <DesktopSideBar boards={data.boards} />

        <main className="dark:bg-mainDark bg-bgWhite flex-grow overflow-scroll">
          <Columns data={data} />
        </main>
      </div>
      <OverlayModalRenderer />
    </div>
  )
}
