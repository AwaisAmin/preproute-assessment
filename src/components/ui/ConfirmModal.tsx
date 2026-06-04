import { useEffect } from "react";
import Button from "./Button";

interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
  loading = false,
}: Props) {
  useEffect(() => {
    if (!isOpen) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 flex flex-col gap-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"
              stroke="#EF4444"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="text-center">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500 mt-1">{message}</p>
        </div>

        <div className="flex gap-3 mt-2">
          <Button
            variant="secondary"
            className="flex-1!"
            style={{ padding: "10px 16px" }}
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer outline-none border-0"
          >
            {loading ? "Deleting…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
