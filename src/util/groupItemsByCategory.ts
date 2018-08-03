import { IAmazonOrderItem, IAmazonOrderItemGroup } from "../types/data";
import * as R from "ramda";

export default function groupItemsByMonth(
  items: IAmazonOrderItem[]
): IAmazonOrderItemGroup[] {
  const doGrouping = R.groupBy(
    (item: IAmazonOrderItem): string => {
      return item.category || "N/A";
    }
  );

  const composeGroup = R.mapObjIndexed(
    (value: IAmazonOrderItem[], key: string) => {
      return {
        items: value,
        groupKey: key
      } as IAmazonOrderItemGroup;
    }
  );

  return R.pipe(
    doGrouping,
    composeGroup,
    R.values
  )(items);
}
