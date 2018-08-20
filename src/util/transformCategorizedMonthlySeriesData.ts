import {
  IMonthlyCategorizedSeries,
  IMonthlyGroup,
  ICategoryGroup
} from "../types/data";
import groupItemsByCategory from "./groupItemsByCategory";
import computeTotalPrice from "./computeTotalPrice";
import { DateTime } from "luxon";
import { snakeCase } from "lodash";
import Dinero from "dinero.js";

// Given a set of MonthlyGroups (JAN: [<item>, <item>])
export default function transformCategorizedMonthlySeriesData(
  groups: IMonthlyGroup[]
): IMonthlyCategorizedSeries[] {
  return groups.map(group => {
    const month = DateTime.fromISO(group.monthKey).toFormat("yyyy LLL");
    const categorizedItems = groupItemsByCategory(group.items).reduce(
      (acc: object, g: ICategoryGroup) => {
        acc[snakeCase(g.groupKey)] = Dinero({
          amount: computeTotalPrice(g)
        }).toRoundedUnit(2);
        return acc;
      },
      {}
    );
    return {
      month,
      y: Dinero({ amount: computeTotalPrice(group) }).toRoundedUnit(2),
      ...categorizedItems
    } as IMonthlyCategorizedSeries;
  });
}
