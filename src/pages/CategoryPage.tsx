import { Grid, withStyles } from "@material-ui/core";
import chroma from "chroma-js";
import { shuffle } from "lodash";
import { DateTime } from "luxon";
import * as R from "ramda";
import * as React from "react";
import CategoryReportTable from "../components/CategoryReportTable";
import PurchaseGraph from "../components/PurchaseGraph";
import { CategoryKey, IAmazonOrderItem, IMonthlyGroup } from "../types/data";

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
  const focusedMonthlyGroups = R.takeLast(numMonthsToShow, monthlyItems);

  const allCategories = R.pipe(
    R.chain(R.prop("items")),
    R.map(R.prop("category")),
    R.reject(R.isNil),
    R.reject(R.isEmpty),
    R.uniq
  )(focusedMonthlyGroups) as CategoryKey[];

  const focusedDates = R.takeLast(
    numMonthsToShow,
    R.pipe(
      R.map((item: IMonthlyGroup) => DateTime.fromISO(item.monthKey)),
      R.uniq,
      R.sort(R.ascend(R.identity))
    )(monthlyItems)
  );

  const colorScale = shuffle(
    chroma
      .scale("Paired")
      .mode("lrgb")
      .colors(allCategories.length)
  );
  const interpolateEmptyMonthlyGroups = (
    dates: DateTime[],
    existingMonthlyGroups: IMonthlyGroup[]
  ): IMonthlyGroup[] => {
    return dates
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

  const categoryGraphs = allCategories.map(
    (categoryKey: CategoryKey, i: number) => {
      const groupsWithEmpties = R.pipe(
        interpolateEmptyMonthlyGroups,
        R.map((monthlyGroup: IMonthlyGroup) => {
          const categoryItems = monthlyGroup.items.filter(
            R.propEq("category", categoryKey)
          );
          return Object.assign({}, monthlyGroup, { items: categoryItems });
        })
      )(focusedDates, focusedMonthlyGroups);

      return (
        <div key={i}>
          <h3>{categoryKey}</h3>
          <PurchaseGraph
            groups={groupsWithEmpties}
            height={250}
            color={colorScale[i]}
            yAxisMax={1000}
          />
          <CategoryReportTable
            monthlyGroupsToShow={focusedMonthlyGroups}
            focusedCategory={categoryKey}
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
        {categoryGraphs}
      </Grid>
    </div>
  );
}

export default withStyles(styles)(CategoryPage);
