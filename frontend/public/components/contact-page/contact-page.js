import { ContactForm } from "./contact-form.js";
import { BaseComponent } from "../BaseComponent.js";

export class ContactPage extends BaseComponent {
  static fileUrl = import.meta.url;
  constructor() {
    super(ContactPage.fileUrl);
  }
  onReady() {
    this.log("OnReady called");
  }
}

customElements.define("contact-page", ContactPage);
