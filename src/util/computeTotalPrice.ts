import { IAmazonItemCollectionKeyable, IAmazonOrderItem } from "../types/data";

export default function computeTotalPrice(
  group: IAmazonItemCollectionKeyable
): number {
  const totalCents = group.items.reduce(
    (acc: number, item: IAmazonOrderItem): number => {
      return acc + item.price_cents;
    },
    0
  );
  return totalCents / 100;
}
