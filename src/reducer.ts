import { AppActionTypes, IAppAction, IAppState } from "./rootTypes";
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
      return Object.assign({}, state, { amazonOrderItems: action.items });
    case AppActionTypes.TOGGLE_MENU:
      return Object.assign({}, state, { isDrawerOpen: !state.isDrawerOpen });
    case AppActionTypes.UPDATE_FOCUSED_MONTH:
      return Object.assign({}, state, {
        focusedMonthlyReportMonth: action.month
      });
    case AppActionTypes.RESET_ITEMS:
      return Object.assign({}, state, {
        amazonOrderItems: []
      });

    default:
      return state;
  }
}
