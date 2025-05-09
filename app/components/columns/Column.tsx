'use client'

import React from 'react'
import Task from './Task'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'
import { UniqueIdentifier } from '@dnd-kit/core'

interface ColumnProps {
  column: Column
  id: UniqueIdentifier
}

const Column = ({ column, id }: ColumnProps) => {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: 'container',
    },
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        'shadow-2xl dark:shadow-none dark:bg-[#1f1f26] rounded-xl p-4 flex flex-col gap-2 min-w-72 max-w-72',
        isDragging && 'opacity-50',
      )}
    >
      {/* Column header with drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="flex items-center mb-2 justify-between"
      >
        <div className="uppercase text-[#828fa3] font-medium flex items-center">
          <span className="w-4 h-4 rounded-full mr-2 bg-red-600" />
          {column.title}
        </div>
        <button className="text-xs p-1">≡</button>
      </div>

      {/* Tasks container */}
      <SortableContext items={column.tasks} strategy={rectSortingStrategy}>
        <div
          className={clsx(
            'flex flex-col gap-4',
            column.tasks.length === 0 &&
              'h-full outline-[2px] outline-dashed outline-[rgba(130,143,163,.4)] rounded-[6px]',
          )}
        >
          {column.tasks.map((task) => (
            <Task key={task.id} task={task} columnId={id} />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}

export default Column
