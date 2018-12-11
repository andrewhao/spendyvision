import { IAmazonOrderItem, MonthKey } from "./types/data";
import { AppActionTypes, IAppAction } from "./rootTypes";
import { Nullable } from "typescript-nullable";

export function updateAmazonOrderItems(items: IAmazonOrderItem[]): IAppAction {
  return { type: AppActionTypes.UPDATE_ITEMS, items };
}

export function resetAmazonOrderItems(): IAppAction {
  return { type: AppActionTypes.RESET_ITEMS };
}

export function toggleMenu(): IAppAction {
  return { type: AppActionTypes.TOGGLE_MENU };
}

export function changeFocusedMonth(newMonth: Nullable<MonthKey>): IAppAction {
  return { type: AppActionTypes.UPDATE_FOCUSED_MONTH, month: newMonth };
}
