import DesktopSideBar from './components/aside/DesktopSideBar'
import Columns from './components/columns/Columns'
import Nav from './components/nav/Nav'
import OverlayModalRenderer from './components/overlays/OverlayModalRenderer'
import PageContent from './components/PageContent'

export default async function Home() {
  const data = await fetch('http://localhost:3000/api/userData').then((res) =>
    res.json(),
  )

  return (
    <PageContent data={data} />
  )
}
