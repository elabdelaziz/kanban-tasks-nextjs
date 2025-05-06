'use client'

import React, { useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import dynamic from 'next/dynamic'

import NewColumn from './NewColumnButton'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'

const Column = dynamic(() => import('./Column'), { ssr: false })
interface ColProps {
  data: BoardData
}

const Columns = ({ data }: ColProps) => {
  const [activeBoardIndex] = useLocalStorage('activeBoardIndex', 0)
  const activeBoard = data.boards[activeBoardIndex]
  const [boardData, setBoardData] = useState(activeBoard)
  const [activeTaskId, setActiveTaskId] = useState<UniqueIdentifier | null>(
    null,
  )

  // check when drag is started
  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.id !== activeTaskId) {
      setActiveTaskId(event.active.id)
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    // Skip if not dragging a task
    if (active.data.current?.type !== 'task') return

    // Skip if dragging within the same column
    if (active.data.current?.columnId === over.data.current?.columnId) return

    const sourceColumnId = active.data.current?.columnId
    const targetColumnId =
      over.data.current?.type === 'task' ? over.data.current?.columnId : over.id

    if (sourceColumnId === targetColumnId) return // No change in column

    const sourceColumnIndex = boardData.columns.findIndex(
      (col) => col.id === sourceColumnId,
    )
    const targetColumnIndex = boardData.columns.findIndex(
      (col) => col.id === targetColumnId,
    )

    if (sourceColumnIndex === -1 || targetColumnIndex === -1) return

    const newBoardData = structuredClone(boardData)
    const sourceColumn = newBoardData.columns[sourceColumnIndex]
    const targetColumn = newBoardData.columns[targetColumnIndex]

    const taskIndex = sourceColumn.tasks.findIndex(
      (task) => task.id === active.id,
    )
    if (taskIndex === -1) return

    const [movedTask] = sourceColumn.tasks.splice(taskIndex, 1)

    if (over.data.current?.type === 'task') {
      const overIndex = targetColumn.tasks.findIndex(
        (task) => task.id === over.id,
      )
      targetColumn.tasks.splice(overIndex, 0, movedTask)
    } else {
      targetColumn.tasks.push(movedTask)
    }

    // Only update state if boardData has actually changed
    if (!deepEqual(boardData, newBoardData)) {
      setBoardData(newBoardData)
    }
  }

  // Helper function for deep comparison
  const deepEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b)

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTaskId(null)
    const { active, over } = event
    if (!over || active.id === over.id) return

    if (
      active.data.current?.type === 'task' &&
      over.data.current?.type === 'task' &&
      active.data.current?.columnId === over.data.current?.columnId
    ) {
      const column = boardData.columns.find(
        (col) => col.id === active.data.current?.columnId,
      )
      if (!column) return

      const fromIndex = column.tasks.findIndex((task) => task.id === active.id)
      const toIndex = column.tasks.findIndex((task) => task.id === over.id)

      if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return

      const newBoardData = structuredClone(boardData)
      const targetColumn = newBoardData.columns.find(
        (col) => col.id === column.id,
      )
      if (!targetColumn) return

      const [movedTask] = targetColumn.tasks.splice(fromIndex, 1)
      targetColumn.tasks.splice(toIndex, 0, movedTask)

      setBoardData(newBoardData)
    } else if (
      active.data.current?.type === 'container' &&
      over.data.current?.type === 'container'
    ) {
      const fromIndex = boardData.columns.findIndex(
        (column) => column.id === active.id,
      )
      const toIndex = boardData.columns.findIndex(
        (column) => column.id === over.id,
      )

      if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return

      const newBoardData = structuredClone(boardData)
      const [movedColumn] = newBoardData.columns.splice(fromIndex, 1)
      newBoardData.columns.splice(toIndex, 0, movedColumn)

      setBoardData(newBoardData)
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={rectIntersection}
    >
      <div className="flex h-full p-4 gap-8">
        <SortableContext
          items={boardData?.columns.map((col) => col.id)}
          strategy={horizontalListSortingStrategy}
        >
          {boardData?.columns.map((column) => (
            <div
              className="min-w-72 touch-none max-w-72 h-full"
              key={column.id}
            >
              <Column
                column={column}
                id={column.id}
                activeTaskId={activeTaskId}
              />
            </div>
          ))}
        </SortableContext>
        <NewColumn />
      </div>
    </DndContext>
  )
}

export default Columns
