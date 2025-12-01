export { AppComponent };

class AppComponent extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    console.log(
      "We initialize the AppComponent. This is the start of the App and we use it as the container for our components."
    );
  }
}

customElements.define("app-component", AppComponent);
