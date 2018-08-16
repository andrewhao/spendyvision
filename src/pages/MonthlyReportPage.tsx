import * as React from "react";
import {
  IMonthlyGroup,
  MonthKey,
  CategoryKey,
  IAmazonOrderItem
} from "../types/data";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import {
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TableCell
} from "@material-ui/core";
import { DateTime } from "luxon";
import * as R from "ramda";
import groupCategoryItemsByMonth from "../util/groupCategoryItemsByMonth";
import CategoryReportTable from "../components/CategoryReportTable";
import Dinero from "dinero.js";

export interface IMonthlyReportPageProps {
  groups: IMonthlyGroup[];
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
  groups,
  classes,
  handleMonthlyReportMonthChange,
  focusedMonth
}: IMonthlyReportPageProps) {
  const menuItems = R.pipe(
    R.map((monthlyGroup: IMonthlyGroup) => monthlyGroup.monthKey),
    R.map((monthKey: MonthKey) => (
      <MenuItem value={monthKey} key={monthKey}>
        {DateTime.fromISO(monthKey).toFormat("yyyy LLL")}
      </MenuItem>
    ))
  )(groups);

  const currentMonthGroup = R.findIndex(
    R.propEq("monthKey", focusedMonth),
    groups
  );

  const focusedGroups = R.pipe(
    R.slice(currentMonthGroup - 1, currentMonthGroup + 1),
    R.tap(v => console.log(v))
  )(groups) as IMonthlyGroup[];

  const allCategories = R.pipe(
    R.chain((monthGroup: IMonthlyGroup) => monthGroup.items),
    R.map((item: IAmazonOrderItem) => item.category),
    R.uniq,
    R.reject(R.isNil)
  )(focusedGroups) as CategoryKey[];

  const allMonths = R.pipe(
    R.map((month: IMonthlyGroup) => month.monthKey),
    R.map((monthKey: MonthKey) => DateTime.fromISO(monthKey))
  )(focusedGroups);

  const monthlyCells = (category: CategoryKey) => {
    return groupCategoryItemsByMonth(category, focusedGroups, allMonths).map(
      ({ monthKey, monthValue }) => {
        const dateString = monthKey.toFormat("yyyy LLL");
        const valueString = Dinero({ amount: monthValue }).toFormat("$0,0.00");
        return <TableCell key={dateString}>{valueString}</TableCell>;
      }
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
        <p>
          <CategoryReportTable
            monthlyCells={monthlyCells}
            allDates={allMonths}
            allCategories={allCategories}
          />
        </p>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(MonthlyReportPage);
