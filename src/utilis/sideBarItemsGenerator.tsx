import { NavLink } from "react-router-dom";
import type { TRoutes, TSideBarItem } from "../types";

const sideBarItemsGenerator = (routes: TRoutes[], role: string) => {
  const sideBarItems = routes.reduce((acc: TSideBarItem[], item) => {
    if (item.name && item.element) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children) {
      acc.push({
        key: item.name as string,
        label: item.name,
        children: item.children.map((child) => {
          if (child.name) {
            return {
              key: child.name,
              label: (
                <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
              ),
            };
          }
        }),
      });
    }

    return acc;
  }, []);

  return sideBarItems;
};

export default sideBarItemsGenerator;
