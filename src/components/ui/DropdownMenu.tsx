import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { DotsVerticalIcon } from "../../assets/svgs";

export interface DropdownItem {
  label: string;
  icon?: ReactNode;
  danger?: boolean;
  onClick: () => void;
}

interface Props {
  items: DropdownItem[];
}

export default function DropdownMenu({ items }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((p) => !p);
        }}
        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer outline-none border-0"
      >
        <DotsVerticalIcon color={open ? "#384EC7" : "#6B7280"} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-44 bg-white rounded-xl border border-gray-100 shadow-lg py-1 z-20">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                item.onClick();
              }}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors cursor-pointer outline-none border-0 ${
                item.danger
                  ? "text-red-500 hover:bg-red-50"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
