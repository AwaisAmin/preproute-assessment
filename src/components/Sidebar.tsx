import { useLocation, useNavigate } from "react-router";
import {
  PreprouteLogo,
  DashboardIcon,
  TestCreationIcon,
  TestTrackingIcon,
} from "../assets/svgs";

const ACTIVE_COLOR = "#384EC7";
const INACTIVE_COLOR = "#6B7180";

const NAV_ITEMS = [
  { label: "Dashboard", path: "/dashboard", Icon: DashboardIcon },
  { label: "Test Creation", path: "/tests/create", Icon: TestCreationIcon },
  { label: "Test Tracking", path: "/test-tracking", Icon: TestTrackingIcon },
];

function isActive(path: string, pathname: string) {
  if (path === "/dashboard") return pathname === "/dashboard";
  if (path.startsWith("/tests")) return pathname.startsWith("/tests");
  return pathname === path;
}

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <aside
      className="w-55 min-h-screen flex flex-col shrink-0 bg-white"
      style={{ borderRight: "1px solid #E5E7EB" }}
    >
      {/* Logo */}
      <div className="pt-6 pb-10 pl-6.5">
        <PreprouteLogo />
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 px-3">
        {NAV_ITEMS.map(({ label, path, Icon }) => {
          const active = isActive(path, pathname);
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex items-center gap-3 w-full text-left text-sm rounded-lg cursor-pointer transition-colors outline-none focus:outline-none"
              style={{
                padding: "13px 14px",
                backgroundColor: active ? "#F8FAFF" : "transparent",
                boxShadow: active ? "inset 4px 0 0 #384EC7" : "none",
                color: active ? ACTIVE_COLOR : INACTIVE_COLOR,
                fontWeight: active ? 600 : 500,
                border: "none",
              }}
            >
              <Icon color={active ? ACTIVE_COLOR : INACTIVE_COLOR} />
              {label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
