"use client";
import { CSSProperties, ReactNode, useMemo, useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

export type SortDirection = "asc" | "desc";

export type SortValue = number | string | null | undefined;

export type SortableTableColumn<T> = {
  key: string;
  header: ReactNode;
  render: (row: T, index: number) => ReactNode;
  /** Valor usado para ordenar. Sem ele, a coluna não é ordenável. */
  getSortValue?: (row: T) => SortValue;
  align?: "center" | "left" | "right";
  className?: string;
  headerClassName?: string;
};

export type SortableTableSort = { key: string; direction: SortDirection };

type Props<T> = {
  caption?: ReactNode;
  className?: string;
  columns: SortableTableColumn<T>[];
  getRowKey: (row: T, index: number) => string;
  /** Linhas sempre exibidas no fim, independente da ordenação (ex.: omissos). */
  isPinnedBottom?: (row: T) => boolean;
  initialSort?: SortableTableSort;
  rows: T[];
  style?: CSSProperties;
};

const ALIGN = {
  center: "text-center",
  left: "text-left",
  right: "text-right",
};

export default function SortableTable<T>({
  caption,
  className,
  columns,
  getRowKey,
  initialSort,
  isPinnedBottom,
  rows,
  style,
}: Props<T>) {
  const [sort, setSort] = useState<SortableTableSort | undefined>(initialSort);

  const sortedRows = useMemo(() => {
    const column = columns.find((c) => c.key === sort?.key);
    if (!sort || !column?.getSortValue) return rows;

    const fixed = isPinnedBottom ? rows.filter(isPinnedBottom) : [];
    const sortable = isPinnedBottom
      ? rows.filter((row) => !isPinnedBottom(row))
      : [...rows];
    const factor = sort.direction === "asc" ? 1 : -1;

    sortable.sort((a, b) => {
      const va = column.getSortValue!(a);
      const vb = column.getSortValue!(b);
      // nulos sempre no fim
      if (va === null || va === undefined) return 1;
      if (vb === null || vb === undefined) return -1;
      if (typeof va === "number" && typeof vb === "number") {
        return (va - vb) * factor;
      }
      return String(va).localeCompare(String(vb), "pt-BR") * factor;
    });
    return [...sortable, ...fixed];
  }, [columns, isPinnedBottom, rows, sort]);

  function onSort(column: SortableTableColumn<T>) {
    if (!column.getSortValue) return;
    setSort((current) =>
      current?.key === column.key
        ? { key: column.key, direction: current.direction === "asc" ? "desc" : "asc" }
        : { key: column.key, direction: "asc" }
    );
  }

  return (
    <div className={twMerge("overflow-auto", className)} style={style}>
      <table className="w-full text-sm border-collapse">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="bg-gray-header sticky top-0 z-[1]">
          <tr>
            {columns.map((column) => {
              const active = sort?.key === column.key;
              const align = ALIGN[column.align ?? "left"];
              return (
                <th
                  key={column.key}
                  aria-sort={
                    active
                      ? sort!.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : undefined
                  }
                  className={twMerge(
                    "border-b font-semibold px-2 py-1 whitespace-nowrap",
                    align,
                    column.headerClassName
                  )}
                  scope="col"
                >
                  {column.getSortValue ? (
                    <button
                      className="inline-flex gap-1 items-center"
                      onClick={() => onSort(column)}
                      type="button"
                    >
                      {column.header}
                      <SortIcon active={active} direction={sort?.direction} />
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, index) => (
            <tr
              key={getRowKey(row, index)}
              className="border-b hover:bg-gray-header"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={twMerge(
                    "px-2 py-1",
                    ALIGN[column.align ?? "left"],
                    column.className
                  )}
                >
                  {column.render(row, index)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SortIcon({
  active,
  direction,
}: {
  active: boolean;
  direction?: SortDirection;
}) {
  if (!active) return <FaSort aria-hidden className="opacity-40 text-xs" />;
  return direction === "asc" ? (
    <FaSortUp aria-hidden className="text-xs" />
  ) : (
    <FaSortDown aria-hidden className="text-xs" />
  );
}
