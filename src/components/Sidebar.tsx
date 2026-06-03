import { useLocation, useNavigate } from "react-router";
import { PreprouteLogo } from "../assets/svgs";
import { PRIMARY_COLOR, INACTIVE_COLOR, NAV_ITEMS } from "../constants";
import { isNavActive } from "../utils";

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="w-55 min-h-screen flex flex-col shrink-0 bg-white border-r border-gray-200">
      <div className="pt-6 pb-10 pl-6.5">
        <PreprouteLogo />
      </div>
      <nav className="flex flex-col gap-1 px-3">
        {NAV_ITEMS.map(({ label, path, Icon }) => {
          const active = isNavActive(path, pathname);
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex items-center gap-3 w-full text-left text-sm rounded-lg cursor-pointer transition-colors outline-none focus:outline-none border-0 py-3 px-3.5 ${
                active
                  ? "bg-[#F8FAFF] text-[#384EC7] font-semibold shadow-[inset_4px_0_0_#384EC7]"
                  : "bg-transparent text-[#6B7180] font-medium hover:bg-gray-50"
              }`}
            >
              <Icon color={active ? PRIMARY_COLOR : INACTIVE_COLOR} />
              {label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
