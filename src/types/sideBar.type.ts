import type { ReactNode } from "react";

export type TSideBarItem =
  | { key: string; label: ReactNode; children?: TSideBarItem[] }
  | undefined;

export type TRoutes = {
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: TRoutes[];
};
