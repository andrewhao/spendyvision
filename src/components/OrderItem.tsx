import * as React from "react";
import { IAmazonOrderItem } from "../types/data";
import { DateTime } from "luxon";
import { TableRow, TableCell } from "@material-ui/core";

export default function OrderItem({
  title,
  price,
  order_date,
  unspsc_code,
  category
}: IAmazonOrderItem) {
  const formattedOrderDate = DateTime.fromISO(order_date).toFormat("LLL d");
  return (
    <TableRow className="order-item">
      <TableCell className="order-item__title">
        <strong>{title}</strong>
      </TableCell>
      <TableCell className="order-item__price">{price}</TableCell>
      <TableCell className="order-item__unspsc-code">{unspsc_code}</TableCell>
      <TableCell className="order-item__category">{category}</TableCell>
      <TableCell className="order-item__date">{formattedOrderDate}</TableCell>
    </TableRow>
  );
}
