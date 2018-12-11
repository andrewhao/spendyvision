import { IAmazonOrderItem, MonthKey, IMonthlyGroup } from "./types/data";
import { ActivePanel } from "./types/view";
import { Nullable } from "typescript-nullable";

export interface IAppStore {
  amazonOrderItems: IAmazonOrderItem[];
  isDrawerOpen: boolean;
  activePanel: ActivePanel;
  numMonthsToShow: number;
  focusedMonthlyReportMonth: Nullable<MonthKey>;
  monthlyGroups: IMonthlyGroup[];
}
export interface IAppAction {
  type: AppActionTypes;
  [propName: string]: any;
}

export const enum AppActionTypes {
  UPDATE_ITEMS = "@@app/UPDATE_ITEMS",
  RESET_ITEMS = "@@app/RESET_ITEMS",
  TOGGLE_MENU = "@@app/TOGGLE_MENU",
  UPDATE_FOCUSED_MONTH = "@@app/UPDATE_FOCUSED_MONTH"
}
