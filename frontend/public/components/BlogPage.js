import { BlogClient } from "../services/BlogClient.js";

export class BlogPage extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    console.log("BLOGPAGE: connectedCallback");
    let blog = await BlogClient.getBlog();
    this.render(blog);
  }

  async render(blog) {
    console.log("BLOGPAGE: Rendering");
    const template = document.getElementById("blog-template");
    const node = template.content.cloneNode(true);

    const container = node.querySelector(".blog-entries-container ul");
    container.textContent = "";
    blog.forEach((entry) => {
      console.log(`BLOGPAGE: Entry`);
      console.log(entry);
      const item = document.createElement("blog-entry");
      item.data = entry;
      const li = document.createElement("li");
      li.appendChild(item);
      container.appendChild(li);
    });

    this.appendChild(node);
  }
}

customElements.define("blog-page", BlogPage);
