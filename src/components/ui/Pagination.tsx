interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3)
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-1 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors cursor-pointer outline-none"
      >
        ‹
      </button>

      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2 text-sm text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`w-9 h-9 text-sm rounded-lg transition-colors cursor-pointer outline-none border-0 ${
              currentPage === page
                ? "bg-[#384EC7] text-white font-semibold"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors cursor-pointer outline-none"
      >
        ›
      </button>
    </div>
  );
}
