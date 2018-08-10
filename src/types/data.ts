export interface IAmazonOrderItem {
  title: string;
  price: string;
  price_cents: number;
  order_date: string;
  unspsc_code?: string;
  category?: string;
  category_key?: string;
}

// Generic container - deprecated
export interface IAmazonOrderItemGroup {
  items: IAmazonOrderItem[];
  groupKey: string;
}

export interface IMonthlyGroup {
  items: IAmazonOrderItem[];
  groupKey: MonthKey;
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
