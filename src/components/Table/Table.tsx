import React from "react";

export type Column<T> = {
  key: keyof T;
  label: string;
  format?: (value: any, row: T) => React.ReactNode;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
};

function Table<T extends object>({ data, columns }: TableProps<T>) {
  return (
    <div className="overflow-x-auto max-h-96 overflow-y-auto">
      <table className="min-w-full">
        <thead className="bg-gray-200">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-4 py-2 text-left font-semibold text-gray-700"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, i) => (
              <tr key={i} className="border-t">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-2">
                    {col.format
                      ? col.format(row[col.key], row)
                      : String(row[col.key] ?? "-")}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-gray-500">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
