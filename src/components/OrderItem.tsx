import * as React from "react";
import { IAmazonOrderItem } from "../types/IAmazonOrderItem";

export default function OrderItem({ title, price }: IAmazonOrderItem) {
  return (
    <tr>
      <td className="amazon-order-item__title">
        <strong>{title}</strong>
      </td>
      <td className="amazon-order-item__price">{price}</td>
    </tr>
  );
}
