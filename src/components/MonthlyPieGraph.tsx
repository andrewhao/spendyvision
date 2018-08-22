import * as React from "react";
import { IMonthlyGroup, ColorMapping } from "../types/data";
import {
  PieChart,
  Pie,
  Legend,
  ResponsiveContainer,
  Cell,
  Tooltip
} from "recharts";
import computeCategoryCostSeries from "../util/computeCategoryCostSeries";
import * as R from "ramda";

export interface IMonthlyPieGraphProps {
  monthlyGroup: IMonthlyGroup;
  height?: number;
  colorMapping: ColorMapping;
}

export default function MonthlyPieGraph({
  monthlyGroup,
  colorMapping,
  height = 400
}: IMonthlyPieGraphProps) {
  const chartData = R.pipe(
    computeCategoryCostSeries,
    R.toPairs,
    R.map(([categoryKey, amount]) => ({
      name: categoryKey,
      value: amount
    }))
  )(monthlyGroup);

  return (
    <div className="monthly-pie-graph">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie data={chartData} dataKey={"value"} fill="#FF0000">
            {chartData.map((data, i) => {
              return <Cell fill={colorMapping[data.name]} key={i} />;
            })}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
