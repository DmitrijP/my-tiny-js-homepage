import { BaseComponent } from "../BaseComponent.js";

export { AboutPage };

class AboutPage extends BaseComponent {
  constructor() {
    super(import.meta.url);
  }

  onReady() {
    this.log("OnReady called");
  }
}

customElements.define("about-page", AboutPage);
