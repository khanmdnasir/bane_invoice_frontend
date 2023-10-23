import React, { useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <input
      className="border border-solid p-1 md:w-96 rounded text-base placeholder:text-sm mb-6 h-10 focus:outline-none text-gray-500 text-sm"
      type="text"
      placeholder="Search..."
      value={filter || ""}
      onChange={(e) => {
        setFilter(e.target.value);
      }}
    />
  );
};

function Table({ data, columns, isSearchable }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    nextPage,
    previousPage,
    pageOptions,
    canNextPage,
    canPreviousPage,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      // initialState: { pageSize: pageSize || 10 },
    },

    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      {isSearchable && (
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      )}
      <table {...getTableProps()} className="w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="pr-2 md:pr-0 text-left py-4 text-gray-500 text-sm"
                >
                  {column.render("Header")}

                  <span className="absolute">
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " ↓"
                        : " ↑"
                      : "↓↑"}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="py-3 text-gray-500 text-sm"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="md:flex md:justify-between md:items-center mt-8">
        <div>
          <span className="mr-8">
            <span className="text-sm text-gray-500">Show per page</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="rounded ml-2 w-16 h-8 text-sm pl-1 font-medium focus:outline-none text-strong_blue"
            >
              {[10, 20, 50].map((pageSize) => (
                <option
                  key={pageSize}
                  value={pageSize}
                  className="p-2 border-none text-strong_blue"
                >
                  {pageSize}
                </option>
              ))}
            </select>
          </span>
        </div>

        <div className="pt-4 md:pt-0">
          <button
            className="cursor-pointer"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <FontAwesomeIcon
              className={`${
                canPreviousPage ? "text-strong_blue" : "text-gray-400"
              } text-sm`}
              icon={faChevronLeft}
            />
          </button>

          <span
            className={`p-6 text-sm font-medium ${
              pageOptions.length > 1 ? "text-strong_blue" : "text-gray-400"
            }`}
          >
            Page {pageIndex + 1} of {pageOptions.length}
          </span>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="cursor-pointer"
          >
            <FontAwesomeIcon
              className={`${
                canNextPage ? "text-strong_blue" : "text-gray-400"
              } text-sm`}
              icon={faChevronRight}
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default Table;
