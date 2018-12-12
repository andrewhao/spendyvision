import * as React from "react";
import { IAmazonOrderItem } from "../types/data";
import { DateTime } from "luxon";
import { TableRow, TableCell } from "@material-ui/core";

export default function OrderItem({
  asin,
  order_id,
  title,
  price,
  order_date,
  unspsc_code,
  category
}: IAmazonOrderItem) {
  const formattedOrderDate = DateTime.fromISO(order_date).toFormat("LLL d");
  const productUrl = `https://www.amazon.com/gp/product/${asin}`;
  const orderUrl = `https://www.amazon.com/gp/your-account/order-details?orderID=${order_id}`;
  return (
    <TableRow className="order-item">
      <TableCell className="order-item__title">
        <a href={productUrl} target="_blank">
          <strong>{title}</strong>
        </a>
      </TableCell>
      <TableCell className="order-item__order-link">
        <a
          href={orderUrl}
          title={`View details of Order ${order_id}`}
          target="_blank"
        >
          Details
        </a>
      </TableCell>
      <TableCell className="order-item__price">{price}</TableCell>
      <TableCell className="order-item__unspsc-code">{unspsc_code}</TableCell>
      <TableCell className="order-item__category">{category}</TableCell>
      <TableCell className="order-item__date">{formattedOrderDate}</TableCell>
    </TableRow>
  );
}
