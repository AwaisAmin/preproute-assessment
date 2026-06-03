import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { BellIcon, ChevronDownIcon } from "../assets/svgs";
import { BORDER_COLOR } from "../constants";
import Sidebar from "./Sidebar";

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
        <header
          className="flex items-end justify-end gap-4 px-6 py-5 bg-white shrink-0"
          style={{ borderBottom: `1px solid ${BORDER_COLOR}` }}
        >
          <button className="cursor-pointer outline-none border-none bg-transparent">
            <BellIcon className="w-8 h-8" />
          </button>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-[#384EC7] flex items-center justify-center text-white text-sm font-semibold">
              {initial}
            </div>
            <div className="flex flex-col leading-tight">
              <div className="flex items-center gap-4">
                <span className="text-md font-semibold text-[#374151]">
                  {user?.name ?? "User"}
                </span>
                <ChevronDownIcon />
              </div>
              <span className="text-[10px] text-normal text-[#374151] capitalize">
                {user?.role ?? "Admin"}
              </span>
            </div>
          </div>
        </header>
        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
