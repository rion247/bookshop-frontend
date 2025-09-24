import type { ReactNode } from "react";
import type { TRoutes } from "../types";

type TPaths = { path: string; element: ReactNode };

const routesGenerator = (routes: TRoutes[]) => {
  const path = routes.reduce((acc: TPaths[], item) => {
    if (item.name && item.element) {
      acc.push({ path: item.path!, element: item.element });
    }

    if (item.children) {
      item.children.forEach((child) => {
        acc.push({ path: child.path!, element: child.element });
      });
    }

    return acc;
  }, []);
  return path;
};

export default routesGenerator;
