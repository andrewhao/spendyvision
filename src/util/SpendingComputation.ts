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

const SpendingComputation = {
  rollingAverage: (
    allMonthlyGroups: IMonthlyGroup[],
    rollingPeriod: number,
    focusedMonth: DateTime,
    categoryFilter: CategoryKey = Categories.AllCategory
  ): IRollingAverageResult => {
    if (allMonthlyGroups.length === 0 || rollingPeriod === 0) {
      return { numMonths: 0, spending: 0 };
    }

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
        () => R.not(R.equals(categoryFilter, Categories.AllCategory)),
        R.filter(R.propEq("category", categoryFilter))
      )(monthlyGroup.items) as IAmazonOrderItem[];

      return computeTotalPrice({ items }) + acc;
    }, 0);
    const averageSpending = totalSpending / numMonths;
    const averageSpendingRounded = Math.round(averageSpending);

    return { numMonths, spending: averageSpendingRounded };
  }
};
export default SpendingComputation;
