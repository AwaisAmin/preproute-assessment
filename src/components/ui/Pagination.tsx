import Button from "./Button";
import { getPageNumbers } from "../../utils";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
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
      <Button
        variant="secondary"
        className="w-auto!"
        style={{ padding: "6px 14px", fontSize: "16px" }}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ‹
      </Button>

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

      <Button
        variant="secondary"
        className="w-auto!"
        style={{ padding: "6px 14px", fontSize: "16px" }}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        ›
      </Button>
    </div>
  );
}
