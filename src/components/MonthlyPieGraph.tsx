import * as React from "react";
import { IMonthlyGroup } from "../types/data";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts";
import computeCategoryCostSeries from "../util/computeCategoryCostSeries";
import * as R from "ramda";
import { shuffle } from "lodash";
import chroma from "chroma-js";

export interface IMonthlyPieGraphProps {
  monthlyGroup: IMonthlyGroup;
  height?: number;
}

export default function MonthlyPieGraph({
  monthlyGroup,
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

  const colorScale = shuffle(
    chroma
      .scale("Paired")
      .mode("lrgb")
      .colors(chartData.length)
  );
  return (
    <div className="monthly-pie-graph">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey={"value"}
            outerRadius={200}
            innerRadius={10}
            fill="#FF0000"
          >
            {chartData.map((_, i) => {
              return <Cell fill={colorScale[i]} key={i} />;
            })}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
