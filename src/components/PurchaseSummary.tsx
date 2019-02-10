import * as React from "react";
import { IAmazonOrderItem, IMonthlyGroup } from "../types/data";
import Dinero from "dinero.js";
import computeTotalPrice from "../util/computeTotalPrice";
import { Typography, Paper, Grid } from "@material-ui/core";

interface IProps {
  items: IAmazonOrderItem[];
  groups: IMonthlyGroup[];
}

export default class PurchaseSummary extends React.PureComponent<IProps> {
  public render() {
    const { items, groups } = this.props;

    const numMonths = groups.length;
    const totalPrice = computeTotalPrice({ items });
    const totalPriceFmt = Dinero({
      amount: totalPrice
    }).toFormat();

    const monthlyPrice =
      numMonths <= 0 ? 0 : Math.floor(totalPrice / numMonths);
    const monthlySpending = Dinero({ amount: monthlyPrice }).toFormat();

    return (
      <Grid className="purchase-summary" xs={12} container={true}>
        <Grid xs={6} className="purchase-summary__item">
          <Paper>
            <Typography variant="display2">
              Over the past <strong>{numMonths} months</strong>, you have spent
              a total of <strong>{totalPriceFmt}</strong>.
            </Typography>
          </Paper>
        </Grid>
        <Grid xs={6} className="purchase-summary__item">
          <Paper>
            <Typography variant="display2">
              On average, you spend <strong>{monthlySpending}</strong> per month
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
