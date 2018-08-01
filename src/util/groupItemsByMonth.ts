import { IAmazonOrderItem } from "../types/IAmazonOrderItem";
import { IAmazonOrderItemGroup } from "../types/IAmazonOrderItemGroup";
import { DateTime } from "luxon";
import * as R from "ramda";

export default function groupItemsByMonth(
  items: IAmazonOrderItem[]
): IAmazonOrderItemGroup[] {
  const doGrouping = R.groupBy((item: IAmazonOrderItem) => {
    return DateTime.fromJSDate(item.order_date)
      .startOf("month")
      .toString();
  });

  const composeGroup = R.mapObjIndexed(
    (value: IAmazonOrderItem[], key: string) => {
      return {
        items: value,
        groupKey: DateTime.fromISO(key).toISO()
      } as IAmazonOrderItemGroup;
    }
  );

  return R.pipe(
    doGrouping,
    composeGroup,
    R.values
  )(items);
}
