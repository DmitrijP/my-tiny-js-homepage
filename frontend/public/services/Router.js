import { Routes } from "./routes.js";

export const Router = {
  init: () => {
    window.addEventListener("popstate", () => {
      console.log("ROUTER -> OnPopstate: " + location.pathname);
      Router.goTo(location.pathname);
    });

    Router.goTo(location.pathname);
  },

  // api/route/whatever?id=1&x=2
  goTo: (route) => {
    var path = "";
    var query = "";
    if (route.includes("?")) {
      var parts = route.split("?");
      path = parts[0];
      query = parts[1];
    } else {
      path = route;
    }
    var page = null;
    for (let r of Routes) {
      if (typeof r.path === "string" && r.path === path) {
        console.log("ROUTER -> goTo: " + path);
        page = new r.component();
        break;
      }
    }

    if (page) {
      document.querySelector("app-component").innerHTML = "";
      document.querySelector("app-component").appendChild(page);
    }
  },
};
