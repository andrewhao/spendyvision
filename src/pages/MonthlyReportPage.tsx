import * as React from "react";
import {
  IMonthlyGroup,
  MonthKey,
  CategoryKey,
  IRollingAverageResult,
  Price
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
import CategoryReportTable from "../components/CategoryReportTable";
import { rollingAverage } from "../util/SpendingComputation";
import Dinero from "dinero.js";
import groupItemsByCategory from "../util/groupItemsByCategory";
import computeTotalPrice from "../util/computeTotalPrice";
import MonthlyPieGraph from "../components/MonthlyPieGraph";

export interface IMonthlyReportPageProps {
  monthlyGroups: IMonthlyGroup[];
  classes: any;
  focusedMonth: MonthKey;
  handleMonthlyReportMonthChange(evt: any): void;
}

const theme = createMuiTheme();

const styles: any = {
  root: {
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

  const monthlyGroupsToShow = R.pipe(
    R.slice(currentMonthGroupIndex - 1, currentMonthGroupIndex + 1)
  )(monthlyGroups) as IMonthlyGroup[];

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

  const categoryAnnotation = (category: CategoryKey): JSX.Element => {
    const rollingAverageSpending = rollingAverageForCategory(category).spending;
    const thisMonth = DateTime.fromISO(focusedMonth).toFormat("LLLL");
    const deltaSpending = categorySpending(category) - rollingAverageSpending;
    const signifier = deltaSpending > 0 ? "over" : "under";
    return (
      <React.Fragment>
        <div>
          Your 3-month average for <span>{category}</span> was:{" "}
          {Dinero({
            amount: rollingAverageSpending
          }).toFormat("$0,0.00")}
          .
        </div>
        <div>
          In {thisMonth}, you spent{" "}
          {Dinero({ amount: deltaSpending }).toFormat("$0,0.00")} {signifier}{" "}
          your typical amount
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className="monthly-report-page">
      <h1>Monthly Report</h1>
      <Grid item={true} xs={12}>
        <form className={classes.root}>
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
        <MonthlyPieGraph monthlyGroup={currentMonthGroup} />
      </Grid>
      <Grid item={true} xs={12}>
        <CategoryReportTable
          monthlyGroupsToShow={monthlyGroupsToShow}
          categoryAnnotation={categoryAnnotation}
        />
      </Grid>
    </div>
  );
}

export default withStyles(styles)(MonthlyReportPage);
