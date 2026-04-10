import type { ReactElement } from "react";
import type { PaginationProps } from "../types/pagination";

function Pagination({
  currentPage,
  totalPages,
  total,
  skip,
  currentCount,
  hasNextPage,
  hasPrevPage,
  onNextPage,
  onPrevPage,
}: PaginationProps): ReactElement {
  return (
    <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-gray-600">
        Mostrando {skip + 1} - {Math.min(skip + currentCount, total)} de {total} produtos
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={!hasPrevPage}
          onClick={onPrevPage}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 hover:bg-gray-100 transition"
        >
          Anterior
        </button>
        <span className="text-sm text-gray-700 min-w-20 text-center">
          Pagina {currentPage} de {totalPages}
        </span>
        <button
          type="button"
          disabled={!hasNextPage}
          onClick={onNextPage}
          className="px-4 py-2 rounded-lg bg-blue-900 text-white disabled:opacity-50 hover:bg-blue-800 transition"
        >
          Proxima
        </button>
      </div>
    </div>
  );
}

export default Pagination;
