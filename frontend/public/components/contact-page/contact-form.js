import { createStateController } from "../../services/hook.js";
import { BaseComponent } from "../BaseComponent.js";
import { log } from "../../services/Logger.js";

export class ContactForm extends BaseComponent {
  constructor() {
    super(import.meta.url);
    this._renderCount = 0;
    this.log = log.bind(this);
  }

  render() {
    this._renderCount++;
    this.log(`ContactForm render called #${this._renderCount}`);

    // Don't render if controller isn't ready
    if (!this._controller) {
      this.log("Controller not ready, skipping render");
      return;
    }

    const { useState } = this._controller;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [text, setText] = useState("");

    if (!this._elements) {
      this.log("Creating form elements");
      this._elements = {
        nameInput: this.shadowRoot.querySelector('input[type="text"]'),
        emailInput: this.shadowRoot.querySelector('input[type="email"]'),
        messageTextarea: this.shadowRoot.querySelector("textarea"),

        nameLabel: this.shadowRoot.querySelector(".name-entered"),
        emailLabel: this.shadowRoot.querySelector(".email-entered"),
        msgLabel: this.shadowRoot.querySelector(".msg-entered"),
      };

      this._elements.nameInput.oninput = (e) => setName(e.target.value);
      this._elements.emailInput.oninput = (e) => setEmail(e.target.value);
      this._elements.messageTextarea.oninput = (e) => setText(e.target.value);
    }

    this._elements.nameInput.value = name;
    this._elements.emailInput.value = email;
    this._elements.messageTextarea.value = text;

    this._elements.nameLabel.textContent = `Name: ${
      name || "Please enter your name"
    }`;
    this._elements.emailLabel.textContent = `Email: ${
      email || "Please enter your email"
    }`;
    this._elements.msgLabel.textContent = `Message: ${
      text ? `(${text.length} chars)` : "Please enter a message"
    }`;
  }

  async onReady() {
    this.log("ContactForm onReady called");
    this._controller = createStateController(this, () => this.render());
    this._controller.update();
  }
}

customElements.define("contact-form", ContactForm);
