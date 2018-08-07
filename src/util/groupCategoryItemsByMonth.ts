import { DateTime } from "luxon";
import * as R from "ramda";
import { IAmazonOrderItemGroup, IAmazonOrderItem } from "../types/data";
import groupItemsByCategory from "./groupItemsByCategory";

interface IMonthlyValueMapping {
  monthKey: DateTime;
  monthValue: number;
}

export default function groupCategoryItemsByMonth(
  category: string,
  monthlyItems: IAmazonOrderItemGroup[],
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
  monthlyItems: IAmazonOrderItemGroup[],
  category: string
): number => {
  const monthGroup = R.find(
    month => DateTime.fromISO(month.groupKey).equals(date),
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
