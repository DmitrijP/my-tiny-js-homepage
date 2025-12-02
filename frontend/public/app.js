import { Router } from "./services/Router.js";
window.app = {
  Router,
};

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM content loaded, will do something here!");
  app.Router.init();
});
