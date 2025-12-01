import { HomePage } from "../components/HomePage.js";
import { AboutPage } from "../components/AboutPage.js";
import { BlogPage } from "../components/BlogPage.js";
import { BlogEntry } from "../components/BlogEntiry.js";

export const Routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/about",
    component: AboutPage,
  },
  {
    path: "/blog",
    component: BlogPage,
  },
];
