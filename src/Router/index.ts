import type { Router } from "@lightningjs/sdk";
import Home from "../Pages/Home";
import Bookmarks from "../Pages/Bookmarks";

export const routes: Router.Config = {
  root: "home",
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
  ],
};

export default routes;
