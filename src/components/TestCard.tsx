import { useNavigate } from "react-router";
import type { Test } from "../types";
import { StatusBadge, DropdownMenu } from "./ui";
import type { DropdownItem } from "./ui";
import { EditIcon, EyeIcon, TrashIcon } from "../assets/svgs";
import { getSubjectName, formatDate } from "../utils";

interface Props {
  test: Test;
  index: number;
  onDelete: (id: string, name: string) => void;
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
