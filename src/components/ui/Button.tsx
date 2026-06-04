import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "link";
  loading?: boolean;
  loadingText?: string;
}

export default function Button({
  children,
  variant = "primary",
  loading = false,
  loadingText = "Loading...",
  disabled,
  className = "",
  style,
  ...props
}: Props) {
  if (variant === "link") {
    return (
      <button
        disabled={disabled || loading}
        className={`self-start text-sm font-medium text-[#4B7BF5] hover:text-[#3B6AE0] cursor-pointer disabled:opacity-60 ${className}`}
        style={{ background: "none", border: "none", padding: 0, ...style }}
        {...props}
      >
        {loading ? loadingText : children}
      </button>
    );
  }

  const base =
    "w-full rounded-lg text-sm font-semibold transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[#4B7BF5] hover:bg-[#3B6AE0] text-white",
    secondary: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${className}`}
      style={{ padding: "14px 24px", ...style }}
      {...props}
    >
      {loading ? loadingText : children}
    </button>
  );
}
