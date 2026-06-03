export default function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <mask
        id="mask_chevron_down"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="white" />
      </mask>
      <g mask="url(#mask_chevron_down)">
        <path d="M12 15L7 10H17L12 15Z" fill="#374151" />
      </g>
    </svg>
  );
}
