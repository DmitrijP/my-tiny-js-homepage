import { log } from "./Logger.js";

export function createStateController(component, renderFn) {
  const stateStore = [];
  let hookIndex = 0;

  const boundLog = log.bind(component);
  const controller = {
    useState(initialValue) {
      const index = hookIndex;

      if (stateStore[index] === undefined) {
        boundLog("setting initial value to: " + initialValue);
        stateStore[index] = initialValue;
      }

      const setState = (newValue) => {
        stateStore[index] = newValue;
        boundLog("updating value to: " + newValue);
        controller.update();
      };

      hookIndex++;
      return [stateStore[index], setState];
    },

    update() {
      hookIndex = 0;
      renderFn();
    },
  };

  return controller;
}
