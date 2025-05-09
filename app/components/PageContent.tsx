'use client'
import Nav from './nav/Nav'
import DesktopSideBar from './aside/DesktopSideBar'
import OverlayModalRenderer from './overlays/OverlayModalRenderer'
import Columns from './columns/Columns'
import useLocalStorage from '../hooks/useLocalStorage'
import { useEffect, useState } from 'react'

export default function PageContent({ data }: { data: BoardData }) {
  const [activeBoardIndex] = useLocalStorage('activeBoardIndex', 0)
  const activeBoard = data.boards[activeBoardIndex]
  const [boardData, setBoardData] = useState(activeBoard)

  useEffect(() => {
    setBoardData(data.boards[activeBoardIndex])
  }, [activeBoardIndex])
  
  return (
    <div className="h-screen dark:bg-bgDark dark:text-white flex flex-col">
      <header className="flex-shrink-0">
        <Nav boards={data.boards} />
      </header>

      <div className="relative flex flex-grow overflow-hidden">
        <DesktopSideBar boards={data.boards} />

        <main className="dark:bg-mainDark bg-bgWhite flex-grow overflow-scroll">
          <Columns boardData={boardData} setBoardData={setBoardData} />
        </main>
      </div>
      <OverlayModalRenderer />
    </div>
  )
}