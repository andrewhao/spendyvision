import * as React from "react";
import { IAmazonOrderItem } from "../types/data";

interface IProps {
  items: IAmazonOrderItem[];
}

export default function PurchaseSummary({ items }: IProps) {
  return <div className="purchase-summary">{aggregateData(items)}</div>;
}

function aggregateData(items: IAmazonOrderItem[]) {
  return (
    "$" +
    items
      .reduce((accumulator, item) => {
        return accumulator + item.price_cents;
      }, 0)
      .toFixed(2)
  );
}
