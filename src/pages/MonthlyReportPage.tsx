import * as React from "react";
import {
  IMonthlyGroup,
  MonthKey,
  CategoryKey,
  IRollingAverageResult,
  ICategoryGroup,
  Price,
  ColorMapping,
  ICategorizedCurrentVsAverageSeries
} from "../types/data";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import {
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core";
import { DateTime } from "luxon";
import * as R from "ramda";
import CategoryComparisonChart from "../components/CategoryComparisonChart";
import { rollingAverage } from "../util/SpendingComputation";
import Dinero from "dinero.js";
import groupItemsByCategory from "../util/groupItemsByCategory";
import computeTotalPrice from "../util/computeTotalPrice";
import MonthlyPieGraph from "../components/MonthlyPieGraph";

export interface IMonthlyReportPageProps {
  monthlyGroups: IMonthlyGroup[];
  classes: any;
  focusedMonth: MonthKey;
  globalColorMapping: ColorMapping;
  handleMonthlyReportMonthChange(evt: any): void;
}

const theme = createMuiTheme();

const styles: any = {
  root: {
    flexGrow: 1
  },
  form: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
};

function MonthlyReportPage({
  globalColorMapping,
  monthlyGroups,
  classes,
  handleMonthlyReportMonthChange,
  focusedMonth
}: IMonthlyReportPageProps) {
  const menuItems = R.pipe(
    R.map((monthlyGroup: IMonthlyGroup) => monthlyGroup.monthKey),
    R.map((monthKey: MonthKey) => (
      <MenuItem value={monthKey} key={monthKey}>
        {DateTime.fromISO(monthKey).toFormat("yyyy LLLL")}
      </MenuItem>
    ))
  )(monthlyGroups);

  const rollingAverageForCategory = (
    category: CategoryKey
  ): IRollingAverageResult => {
    return rollingAverage(
      monthlyGroups,
      3,
      DateTime.fromISO(focusedMonth),
      category
    );
  };

  const currentMonthGroupIndex = R.findIndex(
    R.propEq("monthKey", focusedMonth),
    monthlyGroups
  );

  const currentMonthGroup = monthlyGroups[currentMonthGroupIndex];

  const monthSpendingByCategory = groupItemsByCategory(currentMonthGroup.items);
  const categorySpending = (categoryKey: CategoryKey): Price => {
    const categoryGroup = monthSpendingByCategory.find(
      group => group.groupKey === categoryKey
    );

    if (categoryGroup === undefined) {
      return 0;
    }
    return computeTotalPrice(categoryGroup);
  };

  const categoryComparisonData = monthSpendingByCategory.map(
    ({ groupKey }: ICategoryGroup) => {
      return {
        category: groupKey,
        currentSpending: Dinero({
          amount: categorySpending(groupKey)
        }).toRoundedUnit(2),
        averageSpending: Dinero({
          amount: rollingAverageForCategory(groupKey).spending
        }).toRoundedUnit(2)
      } as ICategorizedCurrentVsAverageSeries;
    }
  );

  return (
    <div className={classes.root}>
      <h1>Monthly Report</h1>
      <Grid item={true} xs={12}>
        <form className={classes.form}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="month-control">Month</InputLabel>
            <Select
              value={focusedMonth}
              onChange={handleMonthlyReportMonthChange}
              inputProps={{ id: "month-control" }}
            >
              {menuItems}
            </Select>
          </FormControl>
        </form>
      </Grid>
      <Grid item={true} xs={12}>
        <MonthlyPieGraph
          monthlyGroup={currentMonthGroup}
          colorMapping={globalColorMapping}
        />
      </Grid>
      <Grid item={true} xs={12}>
        <CategoryComparisonChart data={categoryComparisonData} />
      </Grid>
    </div>
  );
}

export default withStyles(styles)(MonthlyReportPage);
