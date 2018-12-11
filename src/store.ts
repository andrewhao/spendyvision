import { createStore } from "redux";
import rootReducer from "./reducer";

export default function configureStore() {
  return createStore(rootReducer);
}
