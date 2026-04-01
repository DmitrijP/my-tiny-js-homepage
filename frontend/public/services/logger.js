export function log(message, ...args) {
  const name = this.constructor.name || "BaseComponent";
  const time = new Date().toLocaleTimeString();
  console.log(`[${time} - ${name}] ${message}`, ...args);
}
