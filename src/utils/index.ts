import type { Test } from "../types";

export function isNavActive(path: string, pathname: string): boolean {
  if (path === "/dashboard") return pathname === "/dashboard";
  if (path.startsWith("/tests")) return pathname.startsWith("/tests");
  return pathname === path;
}

export function getSubjectName(subject: Test["subject"]): string {
  if (!subject) return "—";
  return typeof subject === "object" ? subject.name : subject;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
