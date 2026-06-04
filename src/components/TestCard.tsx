import { useNavigate } from "react-router";
import type { Test } from "../types";
import { StatusBadge, DropdownMenu } from "./ui";
import type { DropdownItem } from "./ui";
import { getSubjectName, formatDate } from "../utils";

interface Props {
  test: Test;
  index: number;
  onDelete: (id: string, name: string) => void;
}

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M9.5 2.5l2 2-7 7H2.5v-2l7-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 7s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="7" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 3.5h10M5.5 3.5V2.5h3v1M11 3.5L10.25 12H3.75L3 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TestCard({ test, index, onDelete }: Props) {
  const navigate = useNavigate();

  const menuItems: DropdownItem[] = [
    { label: "Edit", icon: <EditIcon />, onClick: () => navigate(`/tests/${test.id}/edit`) },
    { label: "View", icon: <EyeIcon />, onClick: () => navigate(`/tests/${test.id}/preview`) },
    { label: "Delete", icon: <TrashIcon />, danger: true, onClick: () => onDelete(test.id, test.name) },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-400">#{index}</span>
          <StatusBadge status={test.status} />
        </div>
        <DropdownMenu items={menuItems} />
      </div>

      {/* Name */}
      <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2">
        {test.name}
      </h3>

      {/* Pills */}
      <div className="flex flex-wrap gap-2">
        {getSubjectName(test.subject) !== "—" && (
          <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full">
            {getSubjectName(test.subject)}
          </span>
        )}
        {test.difficulty && (
          <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full capitalize">
            {test.difficulty}
          </span>
        )}
        {test.total_questions != null && (
          <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full">
            {test.total_questions} Qs
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">{formatDate(test.created_at)}</span>
      </div>
    </div>
  );
}
