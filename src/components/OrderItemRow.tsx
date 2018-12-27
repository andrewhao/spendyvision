import * as React from "react";
import { IAmazonOrderItem } from "../types/data";
import { DateTime } from "luxon";
import { TableRow, TableCell } from "@material-ui/core";

export default function OrderItemRow({
  asin,
  order_id,
  title,
  price,
  order_date,
  category
}: IAmazonOrderItem) {
  const formattedOrderDate = DateTime.fromISO(order_date).toFormat("LLL d");
  const productUrl = `https://www.amazon.com/gp/product/${asin}`;
  const orderUrl = `https://www.amazon.com/gp/your-account/order-details?orderID=${order_id}`;
  const imgSrc = `http://images.amazon.com/images/P/${asin}.01._PE30_PI_SCMZZZZZZZ_.jpg`;

  const imgStyle = {
    maxHeight: "50px",
    maxWidth: "50px"
  };

  return (
    <TableRow className="order-item">
      <TableCell className="order-item__image">
        <img src={imgSrc} style={imgStyle} />
      </TableCell>
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
      <TableCell className="order-item__category">{category}</TableCell>
      <TableCell className="order-item__date">{formattedOrderDate}</TableCell>
    </TableRow>
  );
}
