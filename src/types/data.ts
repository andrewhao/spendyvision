export interface IAmazonOrderItem {
  title: string;
  price: string;
  price_cents: Price;
  order_date: string;
  unspsc_code?: string;
  category?: string;
  category_key?: string;
}

export interface IAmazonItemCollectionKeyable {
  items: IAmazonOrderItem[];
}

export interface IAmazonOrderItemGroup {
  items: IAmazonOrderItem[];
  groupKey: string;
}

export interface IMonthlyGroup {
  items: IAmazonOrderItem[];
  monthKey: MonthKey;
}

export interface ICategoryGroup {
  items: IAmazonOrderItem[];
  groupKey: CategoryKey;
}

export interface IMonthlyCategoryGroup {
  items: ICategoryGroup[];
  groupKey: MonthKey;
}

export interface IMonthlyCategorizedSeries {
  month: MonthKey;
  y: number;
}

export type CategoryKey = string;
export type MonthKey = string;

export type SpendingCost = number;

export interface IMonthlySpending {
  period: OneMonth | ThreeMonth;
  cost: SpendingCost;
}

export type OneMonth = "OneMonth";
export type ThreeMonth = "ThreeMonth";
export type Price = number;

export interface IRollingAverageResult {
  numMonths: number;
  spending: SpendingCost;
}

export enum Categories {
  AllCategory = "AllCategory"
}
