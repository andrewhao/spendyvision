import * as React from "react";
import { IAmazonOrderItemGroup } from "../types/data";
import chroma from "chroma-js";
import * as R from "ramda";

import transformCategorizedMonthlySeriesData from "../util/transformCategorizedMonthlySeriesData";

import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Legend,
  Brush
} from "recharts";

interface IProps {
  groups: IAmazonOrderItemGroup[];
}

export default function PurchaseGraph({ groups }: IProps) {
  const data = transformCategorizedMonthlySeriesData(groups);
  const categories = R.pipe(
    R.chain(
      (group: IAmazonOrderItemGroup): string[] => {
        return group.items.map(item => item.category_key || "na");
      }
    ),
    R.uniq
  )(groups);
  const colorScale: string[] = chroma
    .scale("Paired")
    .mode("lrgb")
    .colors(categories.length);
  const zipped = R.zip(categories, colorScale);

  const lines = zipped.map(([categoryKey, hexColor]) => {
    return (
      <Area
        key={categoryKey}
        dataKey={categoryKey}
        fill={hexColor}
        stroke={hexColor}
        type="monotoneX"
        stackId="this"
      />
    );
  });

  return (
    <div className="purchase-graph">
      {groups.length > 0 && (
        <ResponsiveContainer width="100%" height={700}>
          <ComposedChart
            margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Brush dataKey="name" height={30} stroke="#8884d8" />
            {lines}
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
