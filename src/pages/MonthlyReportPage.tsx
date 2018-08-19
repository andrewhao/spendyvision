import * as React from "react";
import { IMonthlyGroup, MonthKey } from "../types/data";
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

  const monthlyGroupsToShow = R.pipe(
    R.slice(currentMonthGroup - 1, currentMonthGroup + 1),
    R.tap(v => console.log(v))
  )(groups) as IMonthlyGroup[];

  // const allCategories = R.pipe(
  //   R.chain((monthGroup: IMonthlyGroup) => monthGroup.items),
  //   R.map((item: IAmazonOrderItem) => item.category),
  //   R.uniq,
  //   R.reject(R.isNil)
  // )(monthlyGroupsToShow) as CategoryKey[];

  // const allMonths = R.pipe(
  //   R.map((month: IMonthlyGroup) => month.monthKey),
  //   R.map((monthKey: MonthKey) => DateTime.fromISO(monthKey))
  // )(monthlyGroupsToShow);

  // const monthlyCells = (
  //   category: CategoryKey,
  //   monthlyItems: IMonthlyGroup[],
  //   allDates: DateTime[]
  // ) => {
  //   return groupCategoryItemsByMonth(category, monthlyItems, allDates).map(
  //     ({ monthKey, monthValue }) => {
  //       const dateString = monthKey.toFormat("yyyy LLL");
  //       const valueString = Dinero({ amount: monthValue }).toFormat("$0,0.00");
  //       return <TableCell key={dateString}>{valueString}</TableCell>;
  //     }
  //   );
  // };

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
            monthlyGroupsToShow={monthlyGroupsToShow}
            // monthlyCells={monthlyCells}
            // allDates={allMonths}
            // allCategories={allCategories}
          />
        </p>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(MonthlyReportPage);
