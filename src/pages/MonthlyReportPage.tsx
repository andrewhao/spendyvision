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
import {
  withStyles,
  Theme,
  WithStyles,
  createStyles
} from "@material-ui/core/styles";
import {
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
  Paper
} from "@material-ui/core";
import { DateTime } from "luxon";
import * as R from "ramda";
import CategoryComparisonChart from "../components/CategoryComparisonChart";
import { rollingAverage } from "../util/SpendingComputation";
import Dinero from "dinero.js";
import groupItemsByCategory from "../util/groupItemsByCategory";
import computeTotalPrice from "../util/computeTotalPrice";
import MonthlyPieGraph from "../components/MonthlyPieGraph";
import { Link } from "react-router-dom";
import { isoDateToFriendlyDisplay } from "../util/DateUtils";
import { Nullable } from "typescript-nullable";

import { IAppStore, IAppAction } from "../rootTypes";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { changeFocusedMonth } from "../actions";

export interface IMonthlyReportPageProps extends WithStyles<typeof styles> {
  monthlyGroups: IMonthlyGroup[];
  focusedMonth: Nullable<MonthKey>;
  globalColorMapping: ColorMapping;
  handleMonthlyReportMonthChange(evt: any): IAppAction;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    header: {
      justifyContent: "space-between",
      display: "flex",
      alignItems: "center"
    },
    paper: {
      padding: "1rem",
      margin: "1rem 0"
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
  });

function MonthlyReportPage({
  globalColorMapping,
  monthlyGroups,
  classes,
  handleMonthlyReportMonthChange,
  focusedMonth
}: IMonthlyReportPageProps) {
  if (Nullable.isNone(focusedMonth)) {
    return <Typography>Please upload an order report first.</Typography>;
  }
  const menuItems = R.pipe(
    R.map((monthlyGroup: IMonthlyGroup) => monthlyGroup.monthKey),
    R.sort(R.descend(R.identity)),
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
      DateTime.fromISO(
        Nullable.withDefault(new Date().toISOString(), focusedMonth)
      ),
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
      <Typography variant="h2">Monthly Report</Typography>
      <Grid container={true} xs={12} className={classes.header}>
        <form className={classes.form}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="month-control">Month</InputLabel>
            <Select
              value={Nullable.withDefault(
                new Date().toISOString(),
                focusedMonth
              )}
              onChange={handleMonthlyReportMonthChange}
              inputProps={{ id: "month-control" }}
            >
              {menuItems}
            </Select>
          </FormControl>
        </form>

        <Link to={"/transactions/date/" + focusedMonth}>
          View detailed transactions for{" "}
          {isoDateToFriendlyDisplay(
            Nullable.withDefault(new Date().toISOString(), focusedMonth)
          )}
        </Link>
      </Grid>
      <Grid item={true} xs={12}>
        <Paper className={classes.paper} square={true} elevation={2}>
          <h2>Monthly Category Breakdown</h2>
          <p>Your spending this month, by category:</p>

          <MonthlyPieGraph
            monthlyGroup={currentMonthGroup}
            colorMapping={globalColorMapping}
          />
        </Paper>
      </Grid>
      <Grid item={true} xs={12}>
        <Paper className={classes.paper} square={true} elevation={2}>
          <h2>Category Comparison Spending</h2>
          <p>
            Your spending this month compared with your prior 3-month average
          </p>
          <CategoryComparisonChart data={categoryComparisonData} />
        </Paper>
      </Grid>
    </div>
  );
}

function mapStateToProps(state: IAppStore) {
  return {
    focusedMonth: state.focusedMonthlyReportMonth,
    globalColorMapping: state.globalColorMapping
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    handleMonthlyReportMonthChange: (e: any) =>
      dispatch(changeFocusedMonth(e.target.value))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MonthlyReportPage));
