import {
  IAmazonOrderItem,
  MonthKey,
  IMonthlyGroup,
  ColorMapping
} from "./types/data";
import { Nullable } from "typescript-nullable";

export interface IAppStore {
  amazonOrderItems: IAmazonOrderItem[];
  isDrawerOpen: boolean;
  numMonthsToShow: number;
  focusedMonthlyReportMonth: Nullable<MonthKey>;
  monthlyGroups: IMonthlyGroup[];
  globalColorMapping: ColorMapping;
}
export interface IAppAction {
  type: AppActionTypes;
  [propName: string]: any;
}

export const enum AppActionTypes {
  UPDATE_ITEMS = "@@app/UPDATE_ITEMS",
  RESET_ITEMS = "@@app/RESET_ITEMS",
  TOGGLE_MENU = "@@app/TOGGLE_MENU",
  UPDATE_FOCUSED_MONTH = "@@app/UPDATE_FOCUSED_MONTH",
  SAVE_TO_LOCAL_STORAGE = "@@app/SAVE_TO_LOCAL_STORAGE",
  LOAD_FROM_LOCAL_STORAGE = "@@app/LOAD_FROM_LOCAL_STORAGE",
  CLEAR_FROM_LOCAL_STORAGE = "@@app/CLEAR_FROM_LOCAL_STORAGE"
}
