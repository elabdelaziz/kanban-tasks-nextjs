'use client'

import React from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import Column from './Column'

interface ColProps {
  data: BoardData
}

const Columns = ({ data }: ColProps) => {
  const [activeBoardIndex] = useLocalStorage('activeBoardIndex', 0)
  const activeBoard = data.boards.find(
    (board, index) => index === activeBoardIndex,
  )

  console.log(activeBoard)

  return (
    <div className="flex gap-8">
      {activeBoard?.columns.map((column, index) => (
        <div className='min-w-72' key={index}>
          <Column column={column} />
        </div>
      ))}
    </div>
  )
}

export default Columns
