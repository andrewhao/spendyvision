import { IAmazonOrderItem, MonthKey } from "./types/data";
import { ActivePanel } from "./types/view";
import { Nullable } from "typescript-nullable";

export interface IAppState {
  amazonOrderItems: IAmazonOrderItem[];
  isDrawerOpen: boolean;
  activePanel: ActivePanel;
  numMonthsToShow: number;
  focusedMonthlyReportMonth: Nullable<MonthKey>;
}
export interface IAppAction {
  type: AppActionTypes;
  [propName: string]: any;
}

export const enum AppActionTypes {
  UPDATE_ITEMS = "@@app/UPDATE_ITEMS",
  RESET_ITEMS = "@@app/RESET_ITEMS"
}
