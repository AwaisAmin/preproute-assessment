import type { ReactNode } from "react";
import UnauthorizedPage from "../pages/UnauthorizedPage";

const DEV_BYPASS = true;

export default function PrivateRoute({ children }: { children: ReactNode }) {
  if (DEV_BYPASS) return <>{children}</>;
  const token = localStorage.getItem("token");
  return token ? <>{children}</> : <UnauthorizedPage />;
}
