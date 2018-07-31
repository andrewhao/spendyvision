import { IAmazonOrderItem } from "../types/IAmazonOrderItem";

interface IAmazonOrderItemGroup {
  items: IAmazonOrderItem[];
  groupKey: Date;
}

export default function groupItemsByMonth(
  items: IAmazonOrderItem[]
): IAmazonOrderItemGroup[] {
  return {
    items: items,
    groupKey: new Date()
  };
}
