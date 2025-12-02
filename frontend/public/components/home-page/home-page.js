import { BaseComponent } from "../BaseComponent.js";

export class HomePage extends BaseComponent {
  constructor() {
    super(import.meta.url);
  }
  onReady() {
    this.log("OnReady called");
  }
}

customElements.define("home-page", HomePage);
