import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function ActionBtn({
  children,
  className = "",
  ...props
}: Props) {
  return (
    <button
      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer outline-none border-0 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
