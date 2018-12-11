import { IAmazonOrderItem } from "./types/data";
import { AppActionTypes, IAppAction } from "./rootTypes";

export function updateAmazonOrderItems(items: IAmazonOrderItem[]): IAppAction {
  return { type: AppActionTypes.UPDATE_ITEMS, items };
}

export function resetAmazonOrderItems(): IAppAction {
  return { type: AppActionTypes.RESET_ITEMS };
}

export function toggleMenu(): IAppAction {
  return { type: AppActionTypes.TOGGLE_MENU };
}
