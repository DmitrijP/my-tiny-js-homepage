export { AboutPage };

class AboutPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log("OnConnectedCallback: about-page");
    var template = document.getElementById("about-template");
    var content = template.content.cloneNode(true);
    this.render(content);
  }

  async render(content) {
    console.log("Rendering about-page content");
    this.appendChild(content);
  }
}

customElements.define("about-page", AboutPage);
