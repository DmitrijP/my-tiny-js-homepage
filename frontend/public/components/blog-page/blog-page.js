import { BlogClient } from "../../services/BlogClient.js";
import { BaseComponent } from "../BaseComponent.js";
import { BlogEntry } from "./blog-entry/blog-entry.js";

export class BlogPage extends BaseComponent {
  constructor() {
    super(import.meta.url);
  }

  async onReady() {
    this.log("OnReady called");
    let blog = await BlogClient.getBlog();
    let container = this.shadowRoot.querySelector(".blog-entries-container ul");
    container.textContent = "";
    blog.forEach((entry) => {
      this.log(`BLOGPAGE: Entry`);
      const item = document.createElement("blog-entry");
      item.data = entry;
      const li = document.createElement("li");
      li.appendChild(item);
      container.appendChild(li);
    });
  }
}

customElements.define("blog-page", BlogPage);
