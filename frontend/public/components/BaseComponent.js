export class BaseComponent extends HTMLElement {
  constructor(childUrl) {
    super();
    this.attachShadow({ mode: "open" });

    const url = new URL("./", childUrl);
    this.log(url);
    this._componentDir = url;

    const name = this.constructor.name;
    this.load(name);
  }

  async load(name) {
    const baseURL = import.meta.url.replace(/[^\/]+$/, "");
    const kebabName = this.toKebabCase(name);
    const htmlURL = new URL(`./${kebabName}.html`, this._componentDir);
    this.log(htmlURL);
    const cssURL = new URL(`./${kebabName}.css`, this._componentDir);
    this.log(cssURL);
    const [html, css] = await Promise.all([
      fetch(htmlURL).then((r) => r.text()),
      fetch(cssURL).then((r) => r.text()),
    ]);
    this.log("template files fetched");
    const styleEl = document.createElement("style");
    styleEl.textContent = css;
    this.shadowRoot.appendChild(styleEl);

    const template = document.createElement("template");
    template.innerHTML = html;
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.onReady?.();
  }

  log(message, ...args) {
    const name = this.constructor.name || "BaseComponent";
    const time = new Date().toLocaleTimeString();
    console.log(`[${time} - ${name}] ${message}`, ...args);
  }

  toKebabCase(str) {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
}
