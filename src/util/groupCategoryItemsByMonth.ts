import { DateTime } from "luxon";
import * as R from "ramda";
import { IMonthlyGroup, IAmazonOrderItem, CategoryKey } from "../types/data";
import groupItemsByCategory from "./groupItemsByCategory";

interface IMonthlyValueMapping {
  monthKey: DateTime;
  monthValue: number;
}

export default function groupCategoryItemsByMonth(
  category: CategoryKey,
  monthlyItems: IMonthlyGroup[],
  allDates: DateTime[]
): IMonthlyValueMapping[] {
  return R.pipe(
    R.map((date: DateTime) => ({
      monthKey: date,
      monthValue: valueForMonth(date, monthlyItems, category)
    }))
  )(allDates);
}

const valueForMonth = (
  date: DateTime,
  monthlyItems: IMonthlyGroup[],
  category: CategoryKey
): number => {
  const monthGroup = R.find(
    month => DateTime.fromISO(month.monthKey).equals(date),
    monthlyItems
  );
  if (monthGroup === undefined) {
    return 0;
  }

  const categoryGroup = R.find(
    group => group.groupKey === category,
    groupItemsByCategory(monthGroup.items)
  );

  if (categoryGroup === undefined) {
    return 0;
  }
  return R.pipe(
    R.map((item: IAmazonOrderItem) => item.price_cents),
    R.sum
  )(categoryGroup.items);
};
