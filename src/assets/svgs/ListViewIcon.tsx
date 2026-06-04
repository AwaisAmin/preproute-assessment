export default function ListViewIcon({
  color = "currentColor",
}: {
  color?: string;
}) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="3" cy="4.5" r="1.5" fill={color} />
      <circle cx="3" cy="9" r="1.5" fill={color} />
      <circle cx="3" cy="13.5" r="1.5" fill={color} />
      <path
        d="M7 4.5H17M7 9H17M7 13.5H17"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
