import Image from 'next/image'
import MainBtn from '../MainBtn'
import { useState } from 'react'
import useLocalStorage from '@/app/hooks/useLocalStorage'

const NavBarActions = () => {
  const [editMode, setEditMode] = useState(false)
  const [, setNewTaskMode] = useLocalStorage('newTaskMode', false)

  return (
    <div className="flex items-center gap-4 justify-between">
      <MainBtn
        text="Add Task"
        actionFn={() => {
          setNewTaskMode(true)
        }}
      />
      <div className="relative">
        <button
          onClick={() => setEditMode(!editMode)}
          className="flex cursor-pointer justify-center"
        >
          <Image
            className="w-[5px] h-fit"
            alt="More Actions"
            width={10}
            height={5}
            onClick={() => {}}
            src="/assets/icon-vertical-ellipsis.svg"
          />
        </button>
        {editMode && (
          <div className="absolute z-20 [&>button]:w-full [&>button]:text-left top-16 min-w-[10rem] right-0 whitespace-nowrap flex flex-col items-start rounded-[10px] p-[1rem] bg-white dark:bg-bgDark w-fit h-fit">
            <button onClick={() => {}} className="opacity-[0.5] mb-[10px]">
              Edit Board
            </button>
            <button onClick={() => {}} className="text-[#ea5555]">
              Delete Board
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBarActions
