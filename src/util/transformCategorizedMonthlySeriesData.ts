import {
  IAmazonOrderItemGroup,
  IMonthlyCategorizedSeries
} from "../types/data";
import groupItemsByCategory from "./groupItemsByCategory";
import groupMoney from "./groupMoney";
import { DateTime } from "luxon";
import { snakeCase } from "lodash";

export default function transformCategorizedMonthlySeriesData(
  groups: IAmazonOrderItemGroup[]
): IMonthlyCategorizedSeries[] {
  return groups.map(group => {
    const month = DateTime.fromISO(group.groupKey).toFormat("yyyy LLL");
    const categorizedItems = groupItemsByCategory(group.items).reduce(
      (acc: object, g: IAmazonOrderItemGroup) => {
        acc[snakeCase(g.groupKey)] = groupMoney(g);
        return acc;
      },
      {}
    );
    return {
      month,
      y: groupMoney(group),
      ...categorizedItems
    } as IMonthlyCategorizedSeries;
  });
}
