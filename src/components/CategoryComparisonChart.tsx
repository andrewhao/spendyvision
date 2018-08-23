import * as React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell
} from "recharts";
import { ICategorizedCurrentVsAverageSeries } from "../types/data";
import chroma from "chroma-js";
interface ICategoryComparisonChartProps {
  data: ICategorizedCurrentVsAverageSeries[];
}
const colorScale = chroma
  .scale("RdYlGn")
  .domain([0, 2])
  .classes(2)
  .padding(0.15);

export default function CategoryComparisonChart({
  data
}: ICategoryComparisonChartProps) {
  const height = data.length * 70;
  return (
    <ResponsiveContainer minHeight={height} width="100%">
      <BarChart
        margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
        data={data}
        layout={"vertical"}
        barCategoryGap={"20%"}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="category" type="category" />
        <Tooltip />
        <Bar dataKey="averageSpending" fill="#AAAAAA" />
        <Bar dataKey="currentSpending" fill={colorScale(0)}>
          {data.map((datum, i) => {
            const proportion = datum.averageSpending / datum.currentSpending;
            return <Cell fill={colorScale(proportion).hex()} key={i} />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
