import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import Sidebar from "./Sidebar";

function BellIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 17H9m6 0a6 6 0 10-6 0m6 0v1a3 3 0 11-6 0v-1M12 3v1"
        stroke="#6B7180"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="#6B7180"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface Props {
  children: ReactNode;
}

export default function AppLayout({ children }: Props) {
  const user = useSelector((state: RootState) => state.auth.user);
  const initial = user?.name?.charAt(0).toUpperCase() ?? "U";

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header
          className="flex items-center justify-end gap-3 px-6 py-4 bg-white shrink-0"
          style={{ borderBottom: "1px solid #E5E7EB" }}
        >
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
            <BellIcon />
          </button>

          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-[#384EC7] flex items-center justify-center text-white text-sm font-semibold">
              {initial}
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-gray-900">
                {user?.name ?? "User"}
              </span>
              <span className="text-xs text-gray-500 capitalize">
                {user?.role ?? "Admin"}
              </span>
            </div>
            <ChevronDown />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
