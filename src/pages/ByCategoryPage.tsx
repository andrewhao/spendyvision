import * as React from "react";
import {
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { IAmazonOrderItem, IAmazonOrderItemGroup } from "../types/data";
import * as R from "ramda";
import { DateTime } from "luxon";
// import groupItemsByCategory from "../util/groupItemsByCategory";
import groupCategoryItemsByMonth from "../util/groupCategoryItemsByMonth";
import Dinero from "dinero.js";

interface IByCategoryPageProps {
  items: IAmazonOrderItem[];
  monthlyItems: IAmazonOrderItemGroup[];
}

export default function ByCategoryPage({
  items,
  monthlyItems
}: IByCategoryPageProps) {
  const allCategories = R.pipe(
    R.map((item: IAmazonOrderItem) => item.category),
    R.uniq
  )(items);
  const allDates = R.pipe(
    R.map((item: IAmazonOrderItemGroup) => DateTime.fromISO(item.groupKey)),
    R.uniq,
    R.sort(R.ascend(R.identity))
  )(monthlyItems);

  const headerCells = R.pipe(
    R.map((date: DateTime) => {
      return (
        <TableCell key={date.toString()}>{date.toFormat("yyyy LLL")}</TableCell>
      );
    }),
    R.prepend(<TableCell key="name">Name</TableCell>)
  )(allDates);

  const monthlyCells = (category: string) => {
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
        {monthlyCells(category)}
      </TableRow>
    );
  });
  return (
    <Grid item={true} xs={12}>
      <Table>
        <TableHead>
          <TableRow>{headerCells}</TableRow>
        </TableHead>
        <TableBody>{categoryResults}</TableBody>
      </Table>
    </Grid>
  );
}
