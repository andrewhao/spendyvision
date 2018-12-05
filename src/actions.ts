import { IAmazonOrderItem } from "./types/data";
import { AppActionTypes } from "./types";

export function updateAmazonOrderItems(items: IAmazonOrderItem[]) {
  return { type: AppActionTypes.UPDATE_ITEMS, items };
}

export function resetAmazonOrderItems() {
  return { type: AppActionTypes.RESET_ITEMS };
}
