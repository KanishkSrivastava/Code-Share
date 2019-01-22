import { createStore } from "redux";

import rootReducer from "../rootReducer";

export const storeFactory = initalState => {
  return createStore(rootReducer, initalState);
};

export const findByTestAttribute = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};
