import * as React from "react";
import { IMonthlyGroup } from "../types/data";
import OrderItemRow from "./OrderItemRow";
import { DateTime } from "luxon";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

interface IProps {
  month: IMonthlyGroup;
  key: number;
}

export default function MonthlyOrderTable({ month, key }: IProps) {
  const items = month.items.map((item, i) => (
    <OrderItemRow key={i} {...item} />
  ));

  const monthGroupKey = DateTime.fromISO(month.monthKey).toFormat("yyyy LLLL");

  return (
    <div className="amazon-order-item-group" key={key}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          {monthGroupKey}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
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
            <TableBody>{items}</TableBody>
          </Table>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
