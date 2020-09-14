import * as React from "react";
import { IAmazonOrderItem, IMonthlyGroup } from "../types/data";
import Dinero from "dinero.js";
import computeTotalPrice from "../util/computeTotalPrice";
import {
  Typography,
  Paper,
  Grid,
  withStyles,
  createStyles,
  WithStyles,
  Theme,
} from "@material-ui/core";

interface IProps extends WithStyles<typeof styles> {
  items: IAmazonOrderItem[];
  groups: IMonthlyGroup[];
}

const styles = (theme: Theme) =>
  createStyles({
    insight: {
      padding: theme.spacing.unit,
      margin: theme.spacing.unit,
    },
  });

class PurchaseInsights extends React.PureComponent<IProps> {
  public render() {
    const { items, groups, classes } = this.props;

    const numMonths = groups.length;
    const totalPrice = computeTotalPrice({ items });
    debugger;

    const totalPriceFmt = Dinero({
      amount: totalPrice,
    }).toFormat();

    const monthlyPrice =
      numMonths <= 0 ? 0 : Math.floor(totalPrice / numMonths);
    const monthlySpending = Dinero({ amount: monthlyPrice }).toFormat();

    return (
      <Grid className="purchase-summary" spacing={16} xs={12} container={true}>
        <Grid xs={6} item={true} className="purchase-summary__item">
          <Paper className={classes.insight}>
            <Typography variant="h3">
              Over the past <strong>{numMonths} months</strong>, you have spent
              a total of <strong>{totalPriceFmt}</strong>.
            </Typography>
          </Paper>
        </Grid>
        <Grid xs={6} item={true} className="purchase-summary__item">
          <Paper className={classes.insight}>
            <Typography variant="h3">
              On average, you spend <strong>{monthlySpending}</strong> per month
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(PurchaseInsights);
