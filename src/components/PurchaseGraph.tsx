import * as React from "react";
import { IAmazonOrderItemGroup } from "../types/IAmazonOrderItemGroup";
import { IAmazonOrderItem } from "../types/IAmazonOrderItem";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar
} from "recharts";

import { DateTime } from "luxon";

interface IProps {
  groups: IAmazonOrderItemGroup[];
}

const groupMoney = (group: IAmazonOrderItemGroup): number => {
  const totalCents = group.items.reduce(
    (acc: number, item: IAmazonOrderItem): number => {
      return acc + item.price_cents;
    },
    0
  );
  return totalCents / 100;
};

interface ISeriesData {
  x: string;
  y: number;
}

const seriesData = (groups: IAmazonOrderItemGroup[]): ISeriesData[] => {
  return groups.map(group => {
    const x = DateTime.fromISO(group.groupKey).toFormat("yyyy LLL");
    return {
      x,
      y: groupMoney(group)
    } as ISeriesData;
  });
};

export default function PurchaseGraph({ groups }: IProps) {
  const data = seriesData(groups);

  return (
    <div className="purchase-graph">
      {groups.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis dataKey="y" />
            <Tooltip />
            <Bar dataKey="y" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
