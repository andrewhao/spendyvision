import * as React from "react";
import {
  Grid,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Chip
} from "@material-ui/core";
// import { Redirect } from "react-router-dom";
import { IAmazonOrderItem, MonthKey, CategoryKey } from "../types/data";
import OrderItem from "../components/OrderItem";
import * as R from "ramda";
import { DateTime } from "luxon";

interface IDetailedTransactionPageProps {
  items: IAmazonOrderItem[];
  match: { params: { date: string } };
}
interface IDetailedTransactionPageState {
  filteredMonth: MonthKey | undefined;
  filteredCategory: CategoryKey | undefined;
}

export default class DetailedTransactionPage extends React.Component<
  IDetailedTransactionPageProps,
  IDetailedTransactionPageState
> {
  public constructor(props: IDetailedTransactionPageProps) {
    super(props);
    const {
      match: { params }
    } = this.props;
    this.state = {
      filteredMonth: params.date
        ? DateTime.fromISO(params.date)
            .startOf("month")
            .toISO()
        : undefined,
      filteredCategory: undefined
    };
  }

  public render() {
    console.log(this.state);
    const { items } = this.props;
    const filteredMonthDate =
      this.state.filteredMonth && DateTime.fromISO(this.state.filteredMonth);

    const filterMonth = (its: IAmazonOrderItem[]): IAmazonOrderItem[] => {
      return its.filter((item: IAmazonOrderItem) => {
        if (filteredMonthDate === undefined || filteredMonthDate === "") {
          return true;
        }
        return (
          DateTime.fromISO(item.order_date).get("month") ===
            filteredMonthDate.get("month") &&
          DateTime.fromISO(item.order_date).get("year") ===
            filteredMonthDate.get("year")
        );
      });
    };

    const filteredItems = R.pipe(
      R.sort(R.descend(R.prop("order_date"))),
      filterMonth
    )(items) as IAmazonOrderItem[];
    const orderItems = filteredItems.map((item, i) => (
      <OrderItem key={i} {...item} />
    ));

    const chips = R.pipe(
      R.reject(R.isNil),
      R.map(filterValue => <Chip label={filterValue} key={filterValue} />)
    )([this.state.filteredMonth, this.state.filteredCategory]);

    return (
      <Grid item={true} xs={12}>
        <h1>Detailed Transactions</h1>
        {chips}
        <Table className="amazon-order-items">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>UNSPSC Code</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{orderItems}</TableBody>
        </Table>
      </Grid>
    );
  }
}
