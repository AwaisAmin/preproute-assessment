import { forwardRef, type InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className = "", ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-800">{label}</label>
      <input
        ref={ref}
        style={{ padding: "12px 16px" }}
        className={`w-full rounded-lg border ${
          error ? "border-red-400" : "border-gray-300"
        } bg-white text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-blue-500 transition-colors ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  ),
);

InputField.displayName = "InputField";
export default InputField;
