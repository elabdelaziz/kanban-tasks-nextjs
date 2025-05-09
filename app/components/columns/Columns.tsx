import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import NewColumn from './NewColumnButton'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
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
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import Task from './Task'

const Column = dynamic(() => import('./Column'), { ssr: false })

interface ColProps {
  boardData: Board
  setBoardData: React.Dispatch<React.SetStateAction<Board>>
}

const Columns = ({ boardData, setBoardData }: ColProps) => {
  const [activeTaskId, setActiveTaskId] = useState<UniqueIdentifier | null>(
    null,
  )
  const [activeColumnId, setActiveColumnId] = useState<UniqueIdentifier | null>(
    null,
  )

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'task') {
      setActiveTaskId(event.active.id)
    }
    if (event.active.data.current?.type === 'container') {
      setActiveColumnId(event.active.id)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTaskId(null)
    const { active, over } = event
    if (!over || active.id === over.id) return

    setBoardData((prevBoardData) => {
      const newBoardData = structuredClone(prevBoardData)

      // Handle task reordering within the same column
      if (
        active.data.current?.type === 'task' &&
        over.data.current?.type === 'task' &&
        active.data.current?.columnId === over.data.current?.columnId
      ) {
        const column = newBoardData.columns.find(
          (col) => col.id === active.data.current?.columnId,
        )
        if (!column) return prevBoardData

        const fromIndex = column.tasks.findIndex(
          (task) => task.id === active.id,
        )
        const toIndex = column.tasks.findIndex((task) => task.id === over.id)

        if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
          return prevBoardData
        }

        const [movedTask] = column.tasks.splice(fromIndex, 1)
        column.tasks.splice(toIndex, 0, movedTask)
        return newBoardData
      }

      // Handle task moving between columns
      else if (
        active.data.current?.type === 'task' &&
        over.data.current?.type === 'task' &&
        active.data.current?.columnId !== over.data.current?.columnId
      ) {
        const fromColumn = newBoardData.columns.find((col) =>
          col.tasks.some((task) => task.id === active.id),
        )
        const toColumn = newBoardData.columns.find(
          (col) => col.id === over.data.current?.columnId,
        )

        if (!fromColumn || !toColumn) return prevBoardData

        const fromIndex = fromColumn.tasks.findIndex(
          (task) => task.id === active.id,
        )
        const toIndex = toColumn.tasks.findIndex((task) => task.id === over.id)

        if (fromIndex === -1 || toIndex === -1) return prevBoardData

        const [movedTask] = fromColumn.tasks.splice(fromIndex, 1)
        toColumn.tasks.splice(toIndex, 0, movedTask)
        return newBoardData
      }
      // Handle column reordering
      else if (
        active.data.current?.type === 'container' &&
        over.data.current?.type === 'container'
      ) {
        const fromIndex = newBoardData.columns.findIndex(
          (column) => column.id === active.id,
        )
        const toIndex = newBoardData.columns.findIndex(
          (column) => column.id === over.id,
        )

        if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
          return prevBoardData
        }

        const [movedColumn] = newBoardData.columns.splice(fromIndex, 1)
        newBoardData.columns.splice(toIndex, 0, movedColumn)
        return newBoardData
      }

      return prevBoardData
    })
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
      onDragEnd={handleDragEnd}
      collisionDetection={rectIntersection}
    >
      <div className="flex h-full p-4 gap-8">
        <SortableContext
          items={boardData.columns.map((col) => col.id)}
          strategy={rectSortingStrategy}
        >
          {boardData.columns.map((column) => (
            <div
              className="min-w-72 touch-none max-w-72 h-full"
              key={column.id}
            >
              <Column column={column} id={column.id} />
            </div>
          ))}
        </SortableContext>
        <NewColumn />
      </div>
      <DragOverlay>
        {activeTaskId ? (
          <Task
            task={
              boardData.columns
                .flatMap((col) => col.tasks)
                .find((task) => task.id === activeTaskId)!
            }
            columnId={
              boardData.columns.find((col) =>
                col.tasks.some((task) => task.id === activeTaskId),
              )?.id!
            }
          />
        ) : activeColumnId ? (
          (() => {
            const column = boardData.columns.find(
              (col) => String(col.id) === String(activeColumnId),
            )
            return column ? (
              <Column column={column} id={activeColumnId} />
            ) : null
          })()
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default Columns
