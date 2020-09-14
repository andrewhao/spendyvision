import { AppActionTypes, IAppAction, IAppStore } from "./rootTypes";
import groupItemsByMonth from "./util/groupItemsByMonth";
import deriveCurrentMonth from "./util/deriveCurrentMonth";
import { CategoryKey, IAmazonOrderItem, ColorMapping } from "./types/data";
import * as R from "ramda";
import { colorScaleMapping } from "./util/ColorUtils";

const initialState: IAppStore = {
  amazonOrderItems: [],
  monthlyGroups: [],
  isDrawerOpen: false,
  numMonthsToShow: 4,
  focusedMonthlyReportMonth: null,
  globalColorMapping: {},
  savedToRepository: false,
};

export default function rootReducer(
  state: IAppStore = initialState,
  action: IAppAction
): IAppStore {
  switch (action.type) {
    case AppActionTypes.UPDATE_ITEMS:
    case AppActionTypes.LOAD_FROM_LOCAL_STORAGE:
      if (action.items.length === 0) {
        return Object.assign({}, state);
      }
      return Object.assign({}, state, {
        focusedMonthlyReportMonth: deriveCurrentMonth(action.items),
        amazonOrderItems: action.items,
        monthlyGroups: groupItemsByMonth(action.items),
        globalColorMapping: globalColorMapping(action.items),
      });
    case AppActionTypes.TOGGLE_MENU:
      return Object.assign({}, state, { isDrawerOpen: !state.isDrawerOpen });
    case AppActionTypes.UPDATE_FOCUSED_MONTH:
      return Object.assign({}, state, {
        focusedMonthlyReportMonth: action.month,
      });
    case AppActionTypes.RESET_ITEMS:
      return Object.assign({}, state, {
        amazonOrderItems: [],
        globalColorMapping: {},
        monthlyGroups: [],
        focusedMonthlyReportMonth: null,
      });

    case AppActionTypes.SAVE_TO_REPOSITORY:
      return Object.assign({}, state, {
        savedToRepository: true,
      });

    default:
      return state;
  }
}

const globalColorMapping = (items: IAmazonOrderItem[]): ColorMapping => {
  const allCategories: CategoryKey[] = R.pipe(
    R.map(R.prop("category_key")),
    R.reject(R.isNil),
    R.reject(R.isEmpty),
    R.uniq
  )(items);

  return colorScaleMapping(allCategories);
};
