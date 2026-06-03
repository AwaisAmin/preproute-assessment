import type { ReactNode } from "react";
import UnauthorizedPage from "../pages/UnauthorizedPage";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("token");
  return token ? <>{children}</> : <UnauthorizedPage />;
}
