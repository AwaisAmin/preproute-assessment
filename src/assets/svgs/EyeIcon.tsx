export default function EyeIcon({
  color = "currentColor",
  size = 14,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 7s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="7" cy="7" r="1.5" stroke={color} strokeWidth="1.2" />
    </svg>
  );
}
