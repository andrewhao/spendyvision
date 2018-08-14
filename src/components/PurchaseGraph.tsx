import * as React from "react";
import { IMonthlyGroup } from "../types/data";
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
  Legend
} from "recharts";

interface IProps {
  groups: IMonthlyGroup[];
  height?: number;
  color?: string;
}

export default function PurchaseGraph({ groups, height = 700, color }: IProps) {
  const data = transformCategorizedMonthlySeriesData(groups);
  const categories = R.pipe(
    R.chain(
      (group: IMonthlyGroup): string[] => {
        return group.items.map(item => item.category_key || "na");
      }
    ),
    R.uniq
  )(groups);
  const colorScale: string[] = chroma
    .scale("Paired")
    .mode("lrgb")
    .colors(categories.length);
  const defaultColorScale = R.times(R.always(color), categories.length);
  const zipped = R.zip(
    categories,
    color === undefined ? colorScale : defaultColorScale
  );

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
        <ResponsiveContainer width="100%" height={height}>
          <ComposedChart
            margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {lines}
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
