export class BlogEntry extends HTMLElement {
  constructor() {
    super();
    this._data = null;
  }

  set data(dto) {
    console.log("BlogEntry: set data");
    this._data = dto;
    this.render();
  }

  connectedCallback() {
    console.log("BlogEntry: connectedCallback");
    if (this._data) this.render();
  }

  async render() {
    console.log("BlogEntry: render");
    if (!this._data) return;
    this.innerHTML = "";

    const template = document.getElementById("blog-entry-template");
    const node = template.content.cloneNode(true);

    node.querySelector("h3").textContent = this._data.title;

    let end = 100;
    if (this._data.body.length < end) {
      end = this._data.body.length;
    }
    node.querySelector("p").textContent = this._data.body.slice(0, end);

    node.querySelector("img").src = this._data.thumbnail;
    node.querySelector("a").href = `/api/blog?id=${this._data.id}`;

    let ul = node.querySelector("ul");
    ul.textContent = "";
    for (let tag of this._data.tags) {
      const li = document.createElement("li");
      li.textContent = tag;
      ul.appendChild(li);
    }
    this.appendChild(node);
  }
}

customElements.define("blog-entry", BlogEntry);
