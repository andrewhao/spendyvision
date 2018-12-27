import { AppActionTypes, IAppAction, IAppStore } from "./rootTypes";
import groupItemsByMonth from "./util/groupItemsByMonth";
import deriveCurrentMonth from "./util/deriveCurrentMonth";

const initialState: IAppStore = {
  amazonOrderItems: [],
  monthlyGroups: [],
  isDrawerOpen: false,
  numMonthsToShow: 4,
  focusedMonthlyReportMonth: null
};

export default function rootReducer(
  state: IAppStore = initialState,
  action: IAppAction
): IAppStore {
  switch (action.type) {
    case AppActionTypes.UPDATE_ITEMS:
      return Object.assign({}, state, {
        focusedMonthlyReportMonth: deriveCurrentMonth(action.items),
        amazonOrderItems: action.items,
        monthlyGroups: groupItemsByMonth(action.items)
      });
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
