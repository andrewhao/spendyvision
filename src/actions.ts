import { IAmazonOrderItem, MonthKey } from "./types/data";
import { AppActionTypes, IAppAction } from "./rootTypes";
import { Nullable } from "typescript-nullable";
import parseAmazonCsv from "./util/parseAmazonCsv";

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

export function uploadCsv(results: any[]) {
  const items = parseAmazonCsv(results);
  return { type: AppActionTypes.UPDATE_ITEMS, items };
}
