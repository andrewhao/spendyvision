import { IAmazonOrderItem, MonthKey } from "./types/data";
import { AppActionTypes, IAppAction, IAppStore } from "./rootTypes";
import { Nullable } from "typescript-nullable";
import parseAmazonCsv from "./util/parseAmazonCsv";
import { ThunkAction } from "redux-thunk";
import OrdersRepository from "./repositories/orders";

const LOCAL_STORAGE_CACHE_KEY = "spendyvision.com@v0.1";

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

export function parseCsvAndStoreItems(csvResults: any[]) {
  const items = parseAmazonCsv(csvResults);

  return { type: AppActionTypes.UPDATE_ITEMS, items };
}

/**
 * Stores the results from the CSV into a repository.
 *
 * @param results
 * @param repository
 */
export function persistToDatabase(
  results: IAmazonOrderItem[],
  repository: OrdersRepository
): ThunkAction<any, IAppStore, any, IAppAction> {
  const items = parseAmazonCsv(results);

  return (dispatch) => {
    // For now, let's also store the raw JSON in localstorage
    dispatch(saveToLocalStorage(items));
    repository.load(items).then(() => {
      return dispatch({ type: AppActionTypes.SAVE_TO_REPOSITORY });
    });
  };
}

export function saveToLocalStorage(items: IAmazonOrderItem[]) {
  const returnValue = setAmazonOrderItemsToLocalStorage(items);
  return { type: AppActionTypes.SAVE_TO_LOCAL_STORAGE, returnValue };
}

export function loadFromLocalStorage() {
  const items = getAmazonOrderItemsFromLocalStorage();
  return { type: AppActionTypes.LOAD_FROM_LOCAL_STORAGE, items };
}

export function clearFromLocalStorage() {
  window.localStorage.removeItem(LOCAL_STORAGE_CACHE_KEY);
  return { type: AppActionTypes.CLEAR_FROM_LOCAL_STORAGE };
}

const getAmazonOrderItemsFromLocalStorage = (): IAmazonOrderItem[] => {
  if (window.localStorage === undefined) {
    return [];
  }
  const cachedItems = window.localStorage.getItem(LOCAL_STORAGE_CACHE_KEY);
  if (cachedItems !== null) {
    return JSON.parse(cachedItems).items;
  }
  return [];
};

const setAmazonOrderItemsToLocalStorage = (
  items: IAmazonOrderItem[]
): boolean => {
  const itemsString = JSON.stringify({ items });
  window.localStorage.setItem(LOCAL_STORAGE_CACHE_KEY, itemsString);
  return true;
};
