export interface IAmazonOrderItem {
  title: string;
  price: string;
  price_cents: number;
  order_date: Date;
  unspsc_code?: string;
  category?: string;
}
