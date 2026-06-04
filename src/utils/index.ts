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

export function getPageNumbers(
  current: number,
  total: number,
): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3)
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}
