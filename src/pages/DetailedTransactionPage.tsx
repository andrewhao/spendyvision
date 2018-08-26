import * as React from "react";
import {
  Grid,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  TableFooter,
  TablePagination,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";

import {
  IAmazonOrderItem,
  MonthKey,
  IMonthlyGroup,
  CategoryKey
} from "../types/data";
import OrderItem from "../components/OrderItem";
import * as R from "ramda";
import { DateTime } from "luxon";

interface IDetailedTransactionPageProps {
  items: IAmazonOrderItem[];
  monthlyGroups: IMonthlyGroup[];
  match: { params: { date: string; page?: number } };
}
interface IDetailedTransactionPageState {
  filteredMonth: MonthKey | undefined;
  filteredCategory: CategoryKey | undefined;
  rowsPerPage: number;
  page: number;
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
      filteredCategory: undefined,
      rowsPerPage: 50,
      page: params.page || 0
    };
  }

  public render() {
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

    const startItemIdx = this.state.page * this.state.rowsPerPage;
    const orderItems = R.compose(
      R.map((item: IAmazonOrderItem) => (
        <OrderItem key={item.order_date} {...item} />
      )),
      R.slice(startItemIdx, startItemIdx + this.state.rowsPerPage)
    )(filteredItems);

    const chips = R.pipe(
      R.reject(R.isNil),
      R.map(filterValue => <Chip label={filterValue} key={filterValue} />)
    )([this.state.filteredMonth, this.state.filteredCategory]);

    const handleChangePage = (event: any, page: number) => {
      this.setState({ page });
    };
    const handleChangeRowsPerPage = ({ target: { value } }: any) => {
      this.setState({ rowsPerPage: value });
    };

    const pagination = (
      <TablePagination
        colSpan={5}
        count={filteredItems.length}
        rowsPerPage={this.state.rowsPerPage}
        page={this.state.page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        rowsPerPageOptions={[25, 50, 100, 1000]}
      />
    );
    const menuItems = R.pipe(
      R.map((monthlyGroup: IMonthlyGroup) => monthlyGroup.monthKey),
      R.sort(R.descend(R.identity)),
      R.map((monthKey: MonthKey) => (
        <MenuItem value={monthKey} key={monthKey}>
          {DateTime.fromISO(monthKey).toFormat("yyyy LLLL")}
        </MenuItem>
      ))
    )(this.props.monthlyGroups);

    const handleMonthlyReportMonthChange = (event: any): void => {
      this.setState({ filteredMonth: event.target.value });
    };

    const monthSelectFilter = (
      <FormControl>
        <InputLabel htmlFor="month-control">Month</InputLabel>
        <Select
          value={this.state.filteredMonth}
          onChange={handleMonthlyReportMonthChange}
          inputProps={{ id: "month-control" }}
        >
          {menuItems}
        </Select>
      </FormControl>
    );

    return (
      <Grid item={true} xs={12}>
        <h1>Detailed Transactions</h1>
        {chips}
        <Table className="amazon-order-items">
          <TableHead>
            <TableRow>
              <TableCell>{monthSelectFilter}</TableCell>
              <TablePagination
                colSpan={3}
                count={filteredItems.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                rowsPerPageOptions={[25, 50, 100, 1000]}
              />
            </TableRow>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>UNSPSC Code</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{orderItems}</TableBody>
          <TableFooter>
            <TableRow>{pagination}</TableRow>
          </TableFooter>
        </Table>
      </Grid>
    );
  }
}
