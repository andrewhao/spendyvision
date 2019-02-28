import * as React from "react";
import { parse } from "query-string";

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
  MenuItem,
  Typography
} from "@material-ui/core";

import {
  IAmazonOrderItem,
  MonthKey,
  IMonthlyGroup,
  CategoryKey
} from "../types/data";
import OrderItemRow from "../components/OrderItemRow";
import * as R from "ramda";
import { DateTime } from "luxon";
import { Nullable } from "typescript-nullable";

interface IDetailedTransactionPageProps {
  items: IAmazonOrderItem[];
  monthlyGroups: IMonthlyGroup[];
  match: { params: { date: string; page?: number } };
  location: { search: string };
}
interface IDetailedTransactionPageState {
  filteredMonth: Nullable<MonthKey>;
  filteredCategory: Nullable<CategoryKey>;
  rowsPerPage: number;
  page: number;
}
const ALL = "all";

interface IQueryParams {
  date?: string;
  page?: string;
  category?: CategoryKey;
}

export default class DetailedTransactionPage extends React.Component<
  IDetailedTransactionPageProps,
  IDetailedTransactionPageState
> {
  public constructor(props: IDetailedTransactionPageProps) {
    super(props);
    const queryParams: IQueryParams = parse(location.search);
    const date: Nullable<string> = queryParams.date;
    const category: Nullable<string> = queryParams.category;
    const page: Nullable<string> = queryParams.page;

    this.state = {
      filteredMonth: date
        ? DateTime.fromISO(date)
            .startOf("month")
            .toISO()
        : undefined,
      filteredCategory: category as Nullable<CategoryKey>,
      rowsPerPage: 50,
      page: parseInt(Nullable.withDefault("0")(page), 10)
    };
  }

  public render() {
    const { items } = this.props;
    const filteredMonthDate = Nullable.map(
      fm => DateTime.fromISO(fm),
      this.state.filteredMonth
    );

    const filterMonth = (its: IAmazonOrderItem[]): IAmazonOrderItem[] => {
      return its.filter((item: IAmazonOrderItem) => {
        if (Nullable.isNone(filteredMonthDate)) {
          return true;
        }
        return (
          DateTime.fromISO(item.order_date).get("month") ===
            Nullable.map((d: DateTime) => d.get("month"), filteredMonthDate) &&
          DateTime.fromISO(item.order_date).get("year") ===
            Nullable.map((d: DateTime) => d.get("year"), filteredMonthDate)
        );
      });
    };

    const filteredItems = R.pipe(
      R.sort(R.descend(R.prop("order_date"))),
      filterMonth
    )(items) as IAmazonOrderItem[];

    const startItemIdx = this.state.page * this.state.rowsPerPage;
    const orderItems = R.compose(
      R.slice(startItemIdx, startItemIdx + this.state.rowsPerPage),
      R.map((item: IAmazonOrderItem) => (
        <OrderItemRow key={`${item.order_id}.${item.asin}`} {...item} />
      ))
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
        colSpan={6}
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
    menuItems.unshift(
      <MenuItem value={ALL} key="all">
        All Months
      </MenuItem>
    );

    const handleMonthlyReportMonthChange = (event: any): void => {
      this.setState({ filteredMonth: event.target.value });
    };

    const monthSelectFilter = (
      <FormControl>
        <InputLabel htmlFor="month-control">Month</InputLabel>
        <Select
          value={Nullable.withDefault(ALL, this.state.filteredMonth)}
          onChange={handleMonthlyReportMonthChange}
          inputProps={{ id: "month-control" }}
        >
          {menuItems}
        </Select>
      </FormControl>
    );
    if (items.length === 0) {
      return <Typography>Please upload an order report first.</Typography>;
    }

    return (
      <Grid item={true} xs={12}>
        <Typography variant="h2">Detailed Transactions</Typography>
        {chips}
        <Table className="amazon-order-items">
          <TableHead>
            <TableRow>
              <TableCell>{monthSelectFilter}</TableCell>
              <TablePagination
                colSpan={6}
                count={filteredItems.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                rowsPerPageOptions={[25, 50, 100, 1000]}
              />
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell>Title</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Price</TableCell>
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
