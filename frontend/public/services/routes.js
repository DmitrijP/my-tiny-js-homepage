import { HomePage } from "../components/home-page/home-page.js";
import { AboutPage } from "../components/about-page/about-page.js";
import { BlogPage } from "../components/blog-page/blog-page.js";
import { AppComponent } from "../components/AppComponent.js";

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
