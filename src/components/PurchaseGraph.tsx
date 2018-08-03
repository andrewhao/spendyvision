import * as React from "react";
import { IAmazonOrderItemGroup } from "../types/data";
import chroma from "chroma-js";
import * as R from "ramda";

import transformCategorizedMonthlySeriesData from "../util/transformCategorizedMonthlySeriesData";

import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar
} from "recharts";

interface IProps {
  groups: IAmazonOrderItemGroup[];
}

export default function PurchaseGraph({ groups }: IProps) {
  const data = transformCategorizedMonthlySeriesData(groups);
  const categories = R.pipe(
    R.chain(
      (group: IAmazonOrderItemGroup): string[] => {
        return group.items.map(item => item.category_key || "n-a");
      }
    ),
    R.uniq
  )(groups);
  const colorScale: string[] = chroma.scale("RdYlBu").colors(categories.length);
  const zipped = R.zip(categories, colorScale);
  const bars = zipped.map(([categoryKey, hexColor]) => {
    return (
      <Bar
        key={categoryKey}
        stackId="thisBar"
        dataKey={categoryKey}
        fill={hexColor}
      />
    );
  });

  return (
    <div className="purchase-graph">
      {groups.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis dataKey="y" />
            <Tooltip />
            {bars}
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
