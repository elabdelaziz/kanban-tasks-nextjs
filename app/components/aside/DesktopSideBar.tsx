'use client'

import React from 'react'
import DarkModeSwitch from '../darkMode/DarkModeSwitch'
import useLocalStorage from '@/app/hooks/useLocalStorage'
import Image from 'next/image'
import BoardButton from '../BoardButton'

const DesktopSideBar = ({ boards }: { boards: Board[] }) => {
  const [SideBarHidden, setSideBarHidden] = useLocalStorage(
    'sidebarHidden',
    true,
  )

  if (SideBarHidden) {
    return (
      <button
        className="fixed cursor-pointer flex items-center justify-center left-0 bottom-[2rem] w-[3.5rem] h-[3rem] bg-[#635FC7] rounded-[0_25px_25px_0]"
        onClick={() => setSideBarHidden(false)}
      >
        <Image
          className="cursor-pointer w-[16px] h-[11px]"
          alt="Show Sidebar"
          width={16}
          height={11}
          src="/assets/icon-show-sidebar.svg"
        />
      </button>
    )
  }
  return (
    <aside className="flex flex-col items-start justify-between pt-6 min-w-[301px] border-r border-r-mainBorder dark:border-r-darkBorder">
      <div className="flex items-start flex-col gap-4">
        {boards.map((board, index) => (
          <BoardButton
            key={index}
            title={board.title}
            isActive={board.isActive}
            boardIndex={index}
          />
        ))}
      </div>
      <div className="flex px-8 flex-col w-full">
        <DarkModeSwitch />
        <div
          onClick={() => setSideBarHidden(true)}
          className="opacity-[0.5] pl-[2rem] mb-4 cursor-pointer flex items-center before:content-[''] before:mr-[10px] before:bg-no-repeat before:bg-center before:bg-contain before:bg-[url('/assets/icon-hide-sidebar.svg')] before:block before:w-[16px] before:h-[16px]"
        >
          Hide Sidebar
        </div>
      </div>
    </aside>
  )
}

export default DesktopSideBar
