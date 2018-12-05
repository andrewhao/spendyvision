import { createStore } from "redux";
import rootReducer from "./reducer";
import { IAppState } from "./types/data";

export default function configureStore() {
  return createStore<IAppState>(rootReducer);
}
