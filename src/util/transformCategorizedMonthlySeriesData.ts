import { IMonthlyCategorizedSeries, IMonthlyGroup } from "../types/data";
import computeTotalPrice from "./computeTotalPrice";
import computeCategoryCostSeries from "./computeCategoryCostSeries";
import { DateTime } from "luxon";
const Dinero = require("dinero.js");
import { snakeCase } from "lodash";
import * as R from "ramda";

// Given a set of MonthlyGroups (JAN: [<item>, <item>])
export default function transformCategorizedMonthlySeriesData(
  groups: IMonthlyGroup[]
): IMonthlyCategorizedSeries[] {
  return groups.map(group => {
    const month = DateTime.fromISO(group.monthKey).toFormat("yyyy LLL");
    const categorizedItems = R.pipe(
      R.toPairs,
      R.reduce((acc: object, [k, v]) => {
        acc[snakeCase(k)] = v;
        return acc;
      }, {})
    )(computeCategoryCostSeries(group));

    return {
      month,
      y: Dinero({ amount: computeTotalPrice(group) }).toRoundedUnit(2),
      ...categorizedItems
    } as IMonthlyCategorizedSeries;
  });
}
