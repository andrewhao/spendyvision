import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import { DateTime } from "luxon";
import * as R from "ramda";
import * as React from "react";
import {
  CategoryKey,
  MonthKey,
  IMonthlyGroup,
  IAmazonOrderItem
} from "../types/data";
import groupCategoryItemsByMonth from "../util/groupCategoryItemsByMonth";
import Dinero from "dinero.js";

interface ICategoryReportTableProps {
  monthlyGroupsToShow: IMonthlyGroup[];
  focusedCategory?: CategoryKey;
  categoryAnnotation?(category: CategoryKey): JSX.Element;
}

export default function CategoryReportTable({
  monthlyGroupsToShow,
  categoryAnnotation,
  focusedCategory
}: ICategoryReportTableProps) {
  const isFocusedCategory = (categoryKey: CategoryKey): boolean => {
    return focusedCategory ? focusedCategory === categoryKey : true;
  };

  const allCategories = (R.pipe(
    R.chain((monthGroup: IMonthlyGroup) => monthGroup.items),
    R.map(
      (item: IAmazonOrderItem): CategoryKey => item.category_key as CategoryKey
    ),
    R.uniq,
    R.reject(R.isNil)
  )(monthlyGroupsToShow) as CategoryKey[]).filter(isFocusedCategory);

  const allMonths = R.pipe(
    R.map((month: IMonthlyGroup) => month.monthKey),
    R.map((monthKey: MonthKey) => DateTime.fromISO(monthKey))
  )(monthlyGroupsToShow) as DateTime[];

  const headerCells = R.map((date: DateTime) => {
    return (
      <TableCell key={date.toString()}>{date.toFormat("yyyy LLL")}</TableCell>
    ) as JSX.Element;
  }, allMonths);

  const cellsForMonth = (
    category: CategoryKey,
    monthlyItems: IMonthlyGroup[],
    allDates: DateTime[]
  ) => {
    return groupCategoryItemsByMonth(category, monthlyItems, allDates).map(
      ({ monthKey, monthValue }) => {
        const dateString = monthKey.toFormat("yyyy LLL");
        const valueString = Dinero({ amount: monthValue }).toFormat("$0,0.00");
        return <TableCell key={dateString}>{valueString}</TableCell>;
      }
    );
  };

  const categoryResults = allCategories.map(
    (category: CategoryKey, i: number) => {
      return (
        <React.Fragment key={i}>
          <TableRow>
            <TableCell>{category}</TableCell>
            {cellsForMonth(category, monthlyGroupsToShow, allMonths)}
          </TableRow>
          {categoryAnnotation && (
            <TableRow>
              <TableCell colSpan={3}>{categoryAnnotation(category)}</TableCell>
            </TableRow>
          )}
        </React.Fragment>
      );
    }
  );

  return (
    <div className="category-report-table">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell key="name">Name</TableCell>
            {headerCells}
          </TableRow>
        </TableHead>
        <TableBody>{categoryResults}</TableBody>
      </Table>
    </div>
  );
}
