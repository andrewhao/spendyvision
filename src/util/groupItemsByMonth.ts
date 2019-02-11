import { IAmazonOrderItem, IMonthlyGroup } from "../types/data";
import { DateTime } from "luxon";
import * as R from "ramda";

export default function groupItemsByMonth(
  items: IAmazonOrderItem[]
): IMonthlyGroup[] {
  const doGrouping = R.groupBy((item: IAmazonOrderItem) => {
    return DateTime.fromISO(item.order_date)
      .startOf("month")
      .toString();
  });

  const composeGroup = R.mapObjIndexed(
    (value: IAmazonOrderItem[], key: string) => {
      return {
        items: value,
        monthKey: DateTime.fromISO(key).toISO()
      } as IMonthlyGroup;
    }
  );

  return R.pipe(
    doGrouping,
    composeGroup,
    R.values
  )(items);
}
