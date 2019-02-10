import {
  IMonthlyGroup,
  IRollingAverageResult,
  CategoryKey,
  Categories,
  IAmazonOrderItem
} from "../types/data";
import { DateTime } from "luxon";
import computeTotalPrice from "./computeTotalPrice";
import * as R from "ramda";

export const rollingAverage = (
  allMonthlyGroups: IMonthlyGroup[],
  rollingPeriod: number,
  focusedMonth: DateTime,
  categoryFilter: CategoryKey = Categories.AllCategory as CategoryKey
): IRollingAverageResult => {
  const pipedRollingEligible: (
    xs: IMonthlyGroup[]
  ) => IMonthlyGroup[] = R.filter(
    (monthGroup: IMonthlyGroup) => monthGroup.monthKey < focusedMonth.toISO()
  );

  const rollingPeriodGroups = R.pipe(
    R.sort(R.descend(R.prop("monthKey"))),
    pipedRollingEligible,
    R.take(rollingPeriod)
  )(allMonthlyGroups);

  const numMonths = rollingPeriodGroups.length;

  const totalSpending = rollingPeriodGroups.reduce((acc, monthlyGroup) => {
    const items = R.when(
      () =>
        R.not(R.equals(categoryFilter, Categories.AllCategory as CategoryKey)),
      R.filter(R.propEq("category", categoryFilter))
    )(monthlyGroup.items) as IAmazonOrderItem[];

    return computeTotalPrice({ items }) + acc;
  }, 0);
  const averageSpending = numMonths > 0 ? totalSpending / numMonths : 0;
  const averageSpendingRounded = Math.round(averageSpending);

  return { numMonths, spending: averageSpendingRounded };
};

export default { rollingAverage };
