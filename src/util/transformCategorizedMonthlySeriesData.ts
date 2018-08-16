import {
  IMonthlyCategorizedSeries,
  IMonthlyGroup,
  ICategoryGroup
} from "../types/data";
import groupItemsByCategory from "./groupItemsByCategory";
import computeTotalPrice from "./computeTotalPrice";
import { DateTime } from "luxon";
import { snakeCase } from "lodash";

// Given a set of MonthlyGroups (JAN: [<item>, <item>])
export default function transformCategorizedMonthlySeriesData(
  groups: IMonthlyGroup[]
): IMonthlyCategorizedSeries[] {
  return groups.map(group => {
    const month = DateTime.fromISO(group.monthKey).toFormat("yyyy LLL");
    const categorizedItems = groupItemsByCategory(group.items).reduce(
      (acc: object, g: ICategoryGroup) => {
        acc[snakeCase(g.groupKey)] = computeTotalPrice(g);
        return acc;
      },
      {}
    );
    return {
      month,
      y: computeTotalPrice(group),
      ...categorizedItems
    } as IMonthlyCategorizedSeries;
  });
}
