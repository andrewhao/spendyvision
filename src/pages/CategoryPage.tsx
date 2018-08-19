import * as React from "react";
import { Grid, withStyles } from "@material-ui/core";
import { IAmazonOrderItem, CategoryKey, IMonthlyGroup } from "../types/data";
import * as R from "ramda";
import { DateTime } from "luxon";
import CategoryReportTable from "../components/CategoryReportTable";
import groupItemsByMonth from "../util/groupItemsByMonth";
import PurchaseGraph from "../components/PurchaseGraph";
import chroma from "chroma-js";
import { shuffle } from "lodash";

interface ICategoryPageProps {
  classes: any;
  items: IAmazonOrderItem[];
  monthlyItems: IMonthlyGroup[];
  numMonthsToShow: number;
  handleNumMonthsToShowChange(evt: any): void;
}

const styles: any = {
  root: {
    overflowX: "auto"
  }
};

function CategoryPage({
  items,
  monthlyItems,
  classes,
  numMonthsToShow,
  handleNumMonthsToShowChange
}: ICategoryPageProps) {
  const allCategories = R.pipe(
    R.map((item: IAmazonOrderItem) => item.category),
    R.reject(R.isNil),
    R.uniq
  )(items) as CategoryKey[];

  const filteredDates = R.takeLast(
    numMonthsToShow,
    R.pipe(
      R.map((item: IMonthlyGroup) => DateTime.fromISO(item.monthKey)),
      R.uniq,
      R.sort(R.ascend(R.identity))
    )(monthlyItems)
  );
  const filteredMonthlyGroups = R.takeLast(numMonthsToShow, monthlyItems);

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
        return filteredDates
          .map(monthDateTime => ({
            monthKey: monthDateTime.toISO(),
            items: []
          }))
          .map(monthly => {
            return (
              R.find(
                R.propEq("monthKey", monthly.monthKey),
                existingMonthlyGroups
              ) || monthly
            );
          });
      };
      const groups = R.pipe(groupItemsByMonth)(categoryItems);
      const groupsWithEmpties = interpolateEmptyMonthlyGroups(
        filteredDates,
        groups
      );

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
      <label htmlFor="show-the-last">Show the last months</label>
      <input
        type="number"
        id="show-the-last"
        value={numMonthsToShow}
        onChange={handleNumMonthsToShowChange}
      />
      <Grid item={true} xs={12}>
        <CategoryReportTable monthlyGroupsToShow={filteredMonthlyGroups} />
      </Grid>
      <Grid item={true} xs={12}>
        {categoryGraphs}
      </Grid>
    </div>
  );
}

export default withStyles(styles)(CategoryPage);
