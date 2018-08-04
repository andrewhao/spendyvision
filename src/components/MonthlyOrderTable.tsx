import * as React from "react";
import { IAmazonOrderItemGroup } from "../types/data";
import OrderItem from "./OrderItem";
import { DateTime } from "luxon";

interface IProps {
  month: IAmazonOrderItemGroup;
  key: number;
}

export default function MonthlyOrderTable({ month, key }: IProps) {
  const items = month.items.map((item, i) => <OrderItem key={i} {...item} />);

  const monthGroupKey = DateTime.fromISO(month.groupKey).toFormat("yyyy LLLL");

  return (
    <div className="amazon-order-item-group" key={key}>
      <details>
        <summary>
          <h1>{monthGroupKey}</h1>
        </summary>
        <table className="amazon-order-items">{items}</table>
      </details>
    </div>
  );
}
