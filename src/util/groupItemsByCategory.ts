import { IAmazonOrderItem, ICategoryGroup, CategoryKey } from "../types/data";
import * as R from "ramda";

export default function groupItemsByCategory(
  items: IAmazonOrderItem[]
): ICategoryGroup[] {
  const doGrouping = R.groupBy(
    (item: IAmazonOrderItem): CategoryKey => {
      return item.category_key || "not_available";
    }
  );

  const composeGroup = R.mapObjIndexed(
    (value: IAmazonOrderItem[], key: CategoryKey) => {
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
