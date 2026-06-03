interface Props {
  status: "live" | null;
}

export default function StatusBadge({ status }: Props) {
  return status === "live" ? (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
      Live
    </span>
  ) : (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">
      Draft
    </span>
  );
}
