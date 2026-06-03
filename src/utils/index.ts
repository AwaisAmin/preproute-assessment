export function isNavActive(path: string, pathname: string): boolean {
  if (path === "/dashboard") return pathname === "/dashboard";
  if (path.startsWith("/tests")) return pathname.startsWith("/tests");
  return pathname === path;
}
