import type { NavItem } from "../types";
import {
  DashboardIcon,
  TestCreationIcon,
  TestTrackingIcon,
} from "../assets/svgs";

// Brand colors
export const PRIMARY_COLOR = "#384EC7";
export const INACTIVE_COLOR = "#6B7180";
export const NAV_ACTIVE_BG = "#F8FAFF";
export const BORDER_COLOR = "#E5E7EB";
export const BRAND_BG = "#EEF4FF";

// Dashboard
export const DASHBOARD_PAGE_SIZE = 9;

// Navigation
export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", Icon: DashboardIcon },
  { label: "Test Creation", path: "/tests/create", Icon: TestCreationIcon },
  { label: "Test Tracking", path: "/test-tracking", Icon: TestTrackingIcon },
];
