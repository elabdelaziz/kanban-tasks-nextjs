'use client'

import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
import clsx from 'clsx'
import { UniqueIdentifier } from '@dnd-kit/core'

const Task = ({ task, columnId }: { task: Task; columnId: UniqueIdentifier }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'task',
      columnId: columnId,
    },
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 'auto',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        'dark:bg-bgDark touch-none shadow-[0_4px_6px_#364e7e1a]',
        'font-bold text-[.9375rem] bg-white',
        'rounded-[10px] p-[1rem]',
        isDragging && 'opacity-50 shadow-lg',
      )}
      {...attributes}
      {...listeners}
    >
      {task.title}
    </div>
  )
}

export default Task
