export interface IAmazonOrderItem {
  asin: string;
  order_id: string;
  title: string;
  price: string;
  price_cents: Price;
  order_date: string;
  unspsc_code?: string;
  category: CategoryName;
  category_key: CategoryKey;
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

export interface ICategorizedCurrentVsAverageSeries {
  category: CategoryKey;
  currentSpending: SpendingCost;
  averageSpending: SpendingCost;
}

export type NoCategory = "not_available";

// https://github.com/Microsoft/TypeScript/issues/202#issuecomment-429578149
// @ts-ignore: 'infer' declarations are only permitted in the 'extends' clause of a conditional type.
type Brand<T, B> = infer _ extends B ? T : never;
export type CategoryKey = Brand<string, "categoryKey">;
export type CategoryName = Brand<string, "categoryName">;

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
export type ColorMapping = object;
