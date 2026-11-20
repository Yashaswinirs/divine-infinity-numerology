import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  searchFilter?: (item: T, query: string) => boolean;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  searchPlaceholder = 'Search records...',
  searchFilter,
}: DataTableProps<T>) {
  const [query, setQuery] = useState('');

  const filtered = query && searchFilter
    ? data.filter((item) => searchFilter(item, query))
    : data;

  return (
    <div className="space-y-4">
      {searchFilter && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#ffd8a2]/50" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/30 focus:border-[#ffd8a2] focus:outline-none transition-colors"
          />
        </div>
      )}

      <div className="rounded-2xl border border-[#ffd8a2]/15 bg-[#120b22] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#ffd8a2]/5 border-b border-[#ffd8a2]/10 text-[#ffd8a2]/80 uppercase tracking-wider font-semibold">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-6 py-3.5">
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[#fff0db]/90">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-8 text-center text-[#ffd8a2]/50">
                    No matching records found.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    {columns.map((col) => (
                      <td key={col.key} className="px-6 py-4">
                        {col.render ? col.render(item) : (item as any)[col.key]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
