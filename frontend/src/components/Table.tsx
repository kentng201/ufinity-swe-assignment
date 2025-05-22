import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';
import React, { useMemo } from 'react';

export function Table<Data>({
  data,
  columns,
}: {
  data: Data[];
  columns: ColumnDef<Data>[];
}) {
  const [sorting, setSorting] = React.useState([]);

  const config = useMemo(() => ({
    data: data,
    columns,
    state: {
      sorting: sorting,
    },
    onSortingChange: (updater: any) => {
      setSorting((old) => {
        if (typeof updater === 'function') {
          return updater(old);
        }
        return updater;
      });
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  }), [data, sorting]);
  const table = useReactTable(config);

  return (
    <div className="h-full overflow-x-auto">
      <div className="max-h-full overflow-y-auto">
        <table className="min-w-full table-fixed border-collapse">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  const isSortable = header.column.getCanSort();
                  return (
                    <th
                      key={header.id}
                      className={`px-4 py-4 text-left sticky top-0 bg-gray-100 z-10 ${isSortable ? 'cursor-pointer select-none' : ''
                        }`}
                      onClick={isSortable ? header.column.getToggleSortingHandler() : undefined}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === 'asc' && ' 🔼'}
                      {header.column.getIsSorted() === 'desc' && ' 🔽'}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
