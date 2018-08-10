import { IAmazonOrderItem, ICategoryGroup } from "../types/data";
import * as R from "ramda";

export default function groupItemsByCategory(
  items: IAmazonOrderItem[]
): ICategoryGroup[] {
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
      } as ICategoryGroup;
    }
  );

  return R.pipe(
    doGrouping,
    composeGroup,
    R.values
  )(items);
}
