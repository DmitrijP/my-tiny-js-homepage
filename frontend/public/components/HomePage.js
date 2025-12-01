export { HomePage };

class HomePage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log("OnConnectedCallback: home-page");
    var template = document.getElementById("home-template");
    var content = template.content.cloneNode(true);
    this.render(content);
  }

  async render(content) {
    console.log("Rendering home-page content");
    this.appendChild(content);
  }
}

customElements.define("home-page", HomePage);
