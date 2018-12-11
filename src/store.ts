import { createStore } from "redux";
import rootReducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";

export default function configureStore() {
  return createStore(rootReducer, composeWithDevTools());
}
