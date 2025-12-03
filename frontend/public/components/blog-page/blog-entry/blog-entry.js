import { BaseComponent } from "../../BaseComponent.js";

export class BlogEntry extends BaseComponent {
  constructor() {
    super(import.meta.url);
    this._data = null;
  }

  set data(dto) {
    this.log("BlogEntry: set data");
    this._data = dto;
  }

  onReady() {
    this.log("BlogEntry: render");
    if (!this._data) return;
    this.shadowRoot.querySelector("h3.title").textContent = this._data.title;
    this.shadowRoot.querySelector("p.content").textContent = this._data.body;
    this.shadowRoot.querySelector("img").src = this._data.thumbnail;
    this.shadowRoot.querySelector("a").href = `/blog/${this._data.id}`;
    this.shadowRoot.querySelector("ul").textContent = "";
    for (let tag of this._data.tags) {
      const li = document.createElement("li");
      li.textContent = "";
      li.textContent = tag;
      this.shadowRoot.querySelector("ul").appendChild(li);
    }

    this.shadowRoot.querySelector("h3").textContent = "";
    this.shadowRoot.querySelector("h3").textContent = this._data.title;
  }
}

customElements.define("blog-entry", BlogEntry);
