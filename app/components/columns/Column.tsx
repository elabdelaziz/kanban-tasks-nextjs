import React from 'react'

const Column = ({ column }: { column: Column }) => {
  console.log(column)
  return (
    <div className="flex flex-col gap-2">
      <div className="uppercase flex items-center">
        <span className="w-4 h-4 rounded-full mr-2 bg-red-600" />
        {column.title}
      </div>
      <div>TODO: Cards</div>
    </div>
  )
}

export default Column