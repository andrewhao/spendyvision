import * as React from "react";
import { IAmazonOrderItemGroup } from "../types/data";
import OrderItem from "./OrderItem";
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
  month: IAmazonOrderItemGroup;
  key: number;
}

export default function MonthlyOrderTable({ month, key }: IProps) {
  const items = month.items.map((item, i) => <OrderItem key={i} {...item} />);

  const monthGroupKey = DateTime.fromISO(month.groupKey).toFormat("yyyy LLLL");

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
