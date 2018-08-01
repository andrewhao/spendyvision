import { IAmazonOrderItem } from "./IAmazonOrderItem";

export interface IAmazonOrderItemGroup {
  items: IAmazonOrderItem[];
  groupKey: Date;
}
