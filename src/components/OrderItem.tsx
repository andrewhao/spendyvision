import * as React from "react";
import { IAmazonOrderItem } from "../types/IAmazonOrderItem";
import { DateTime } from "luxon";

export default function OrderItem({
  title,
  price,
  order_date,
  unspsc_code,
  category
}: IAmazonOrderItem) {
  const formattedOrderDate = DateTime.fromJSDate(order_date).toFormat("LLL d");
  return (
    <tr className="order-item">
      <td className="order-item__title">
        <strong>{title}</strong>
      </td>
      <td className="order-item__price">{price}</td>
      <td className="order-item__unspsc-code">{unspsc_code}</td>
      <td className="order-item__category">{category}</td>
      <td className="order-item__date">{formattedOrderDate}</td>
    </tr>
  );
}
