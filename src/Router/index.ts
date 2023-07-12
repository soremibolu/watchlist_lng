import type { Router } from "@lightningjs/sdk";
import Home from "../Pages/Home";
import Bookmarks from "../Pages/Bookmarks";
import Edit from "../Pages/Edit";

export const routes: Router.Config = {
  root: "edit",
  routes: [
    {
      path: "home",
      component: Home,
      widgets: ["menu"],
    },
    {
      path: "bookmarks",
      component: Bookmarks,
      widgets: ["menu"],
    },
    {
      path: "edit",
      component: Edit,
    },
  ],
};

export default routes;
