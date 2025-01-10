import { ScrollArea } from '@radix-ui/themes'
import React from 'react'

const TableWithScroll = () => {
  const rows = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    value: Math.floor(Math.random() * 100),
  }))

  return (
    <ScrollArea className="w-full max-w-[400px] h-[300px] overflow-hidden border rounded-md">
      <table className="w-full border-collapse table-fixed">
        {/* Table header */}
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Value</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="odd:bg-gray-900 even:bg-gray-800 hover:bg-gray-700 text-gray-300"
            >
              <td className="py-2 px-4">{row.id}</td>
              <td className="py-2 px-4">{row.name}</td>
              <td className="py-2 px-4">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Scrollbar (optional customization) */}
      <ScrollArea.Scrollbar orientation="vertical" className="bg-gray-700">
        <ScrollArea.Thumb className="bg-gray-500 rounded-full" />
      </ScrollArea.Scrollbar>
    </ScrollArea>
  )
}

export default TableWithScroll
