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
}

export default function CategoryReportTable({
  monthlyGroupsToShow
}: ICategoryReportTableProps) {
  const allCategories = R.pipe(
    R.chain((monthGroup: IMonthlyGroup) => monthGroup.items),
    R.map((item: IAmazonOrderItem) => item.category),
    R.uniq,
    R.reject(R.isNil)
  )(monthlyGroupsToShow) as CategoryKey[];

  const allMonths = R.pipe(
    R.map((month: IMonthlyGroup) => month.monthKey),
    R.map((monthKey: MonthKey) => DateTime.fromISO(monthKey))
  )(monthlyGroupsToShow);

  const headerCells = R.pipe(
    R.map((date: DateTime) => {
      return (
        <TableCell key={date.toString()}>{date.toFormat("yyyy LLL")}</TableCell>
      );
    }),
    R.prepend(<TableCell key="name">Name</TableCell>)
  )(allMonths);

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

  const categoryResults = allCategories.map((category: string, i: number) => {
    return (
      <TableRow key={i}>
        <TableCell>{category}</TableCell>
        {cellsForMonth(category, monthlyGroupsToShow, allMonths)}
      </TableRow>
    );
  });

  return (
    <div className="category-report-table">
      <Table>
        <TableHead>
          <TableRow>{headerCells}</TableRow>
        </TableHead>
        <TableBody>{categoryResults}</TableBody>
      </Table>
    </div>
  );
}
