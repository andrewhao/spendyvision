export interface IAmazonOrderItem {
  title: string;
  price: string;
  price_cents: number;
  order_date: string;
  unspsc_code?: string;
  category?: string;
  category_key?: string;
}

export interface IAmazonOrderItemGroup {
  items: IAmazonOrderItem[];
  groupKey: string;
}

export interface IMonthlyCategorizedSeries {
  month: string;
  y: number;
}

export type Category = string;