import * as React from "react";
import { Grid, TableCell, withStyles } from "@material-ui/core";
import {
  IAmazonOrderItem,
  IAmazonOrderItemGroup,
  CategoryKey,
  IMonthlyGroup
} from "../types/data";
import * as R from "ramda";
import { DateTime } from "luxon";
import groupCategoryItemsByMonth from "../util/groupCategoryItemsByMonth";
import Dinero from "dinero.js";
import CategoryReportTable from "../components/CategoryReportTable";
import groupItemsByMonth from "../util/groupItemsByMonth";
import PurchaseGraph from "../components/PurchaseGraph";
import chroma from "chroma-js";
import { shuffle } from "lodash";

interface IByCategoryPageProps {
  classes: any;
  items: IAmazonOrderItem[];
  monthlyItems: IMonthlyGroup[];
}

const styles: any = {
  root: {
    overflowX: "auto"
  }
};

function ByCategoryPage({
  items,
  monthlyItems,
  classes
}: IByCategoryPageProps) {
  const allCategories = R.pipe(
    R.map((item: IAmazonOrderItem) => item.category),
    R.uniq,
    R.reject(R.isNil)
  )(items) as CategoryKey[];

  const allDates = R.pipe(
    R.map((item: IAmazonOrderItemGroup) => DateTime.fromISO(item.groupKey)),
    R.uniq,
    R.sort(R.ascend(R.identity))
  )(monthlyItems);

  const monthlyCells = (category: CategoryKey) => {
    return groupCategoryItemsByMonth(category, monthlyItems, allDates).map(
      ({ monthKey, monthValue }) => {
        const dateString = monthKey.toFormat("yyyy LLL");
        const valueString = Dinero({ amount: monthValue }).toFormat("$0,0.00");
        return <TableCell key={dateString}>{valueString}</TableCell>;
      }
    );
  };

  const colorScale = shuffle(
    chroma
      .scale("Paired")
      .mode("lrgb")
      .colors(allCategories.length)
  );

  const categoryGraphs = allCategories.map(
    (categoryKey: CategoryKey, i: number) => {
      const categoryItems = R.filter(
        (item: IAmazonOrderItem) => item.category === categoryKey
      )(items) as IAmazonOrderItem[];

      const interpolateEmptyMonthlyGroups = (
        dates: DateTime[],
        existingMonthlyGroups: IMonthlyGroup[]
      ): IMonthlyGroup[] => {
        return allDates
          .map(monthDateTime => ({
            groupKey: monthDateTime.toISO(),
            items: []
          }))
          .map(monthly => {
            return (
              R.find(
                R.propEq("groupKey", monthly.groupKey),
                existingMonthlyGroups
              ) || monthly
            );
          });
      };
      const groups = R.pipe(groupItemsByMonth)(categoryItems);
      const groupsWithEmpties = interpolateEmptyMonthlyGroups(allDates, groups);

      return (
        <div key={i}>
          <h3>{categoryKey}</h3>
          <PurchaseGraph
            groups={groupsWithEmpties}
            height={250}
            color={colorScale[i]}
            yAxisMax={1000}
          />
        </div>
      );
    }
  );

  return (
    <div className={classes.root}>
      <Grid item={true} xs={12}>
        <CategoryReportTable
          allDates={allDates}
          allCategories={allCategories}
          monthlyCells={monthlyCells}
        />
      </Grid>
      <Grid item={true} xs={12}>
        {categoryGraphs}
      </Grid>
    </div>
  );
}

export default withStyles(styles)(ByCategoryPage);
