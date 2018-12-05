import { AppActionTypes, IAppAction, IAppState } from "./types";
import { ActivePanel } from "./types/view";

const initialState: IAppState = {
  amazonOrderItems: [],
  isDrawerOpen: true,
  activePanel: ActivePanel.Home,
  numMonthsToShow: 4,
  focusedMonthlyReportMonth: null
};

export default function rootReducer(
  state: IAppState = initialState,
  action: IAppAction
): IAppState {
  switch (action.type) {
    case AppActionTypes.UPDATE_ITEMS:
      return Object.assign({}, state, { items: action.items });
    default:
      return state;
  }
}
