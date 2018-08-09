import * as React from "react";
import { Grid, TableCell } from "@material-ui/core";
import {
  IAmazonOrderItem,
  IAmazonOrderItemGroup,
  Category
} from "../types/data";
import * as R from "ramda";
import { DateTime } from "luxon";
import groupCategoryItemsByMonth from "../util/groupCategoryItemsByMonth";
import Dinero from "dinero.js";
import CategoryReportTable from "../components/CategoryReportTable";

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
    R.uniq,
    R.reject(R.isNil)
  )(items) as Category[];
  const allDates = R.pipe(
    R.map((item: IAmazonOrderItemGroup) => DateTime.fromISO(item.groupKey)),
    R.uniq,
    R.sort(R.ascend(R.identity))
  )(monthlyItems);

  const monthlyCells = (category: Category) => {
    return groupCategoryItemsByMonth(category, monthlyItems, allDates).map(
      ({ monthKey, monthValue }) => {
        const dateString = monthKey.toFormat("yyyy LLL");
        const valueString = Dinero({ amount: monthValue }).toFormat("$0,0.00");
        return <TableCell key={dateString}>{valueString}</TableCell>;
      }
    );
  };

  return (
    <Grid item={true} xs={12}>
      <CategoryReportTable
        allDates={allDates}
        allCategories={allCategories}
        monthlyCells={monthlyCells}
      />
    </Grid>
  );
}
