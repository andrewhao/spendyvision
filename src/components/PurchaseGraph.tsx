import * as React from "react";
import { IMonthlyGroup, CategoryKey } from "../types/data";
import { colorScale } from "../util/ColorUtils";
import * as R from "ramda";
import { DateTime } from "luxon";
import Dinero from "dinero.js";

import transformCategorizedMonthlySeriesData from "../util/transformCategorizedMonthlySeriesData";

import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Bar,
  Legend,
  ReferenceLine
} from "recharts";
import { rollingAverage } from "../util/SpendingComputation";

interface IProps {
  groups: IMonthlyGroup[];
  height?: number;
  color?: string;
  style?: string;
  yAxisMax?: any;
  showLegend?: boolean;
}

class PurchaseGraph extends React.PureComponent<IProps> {
  public render() {
    const {
      groups,
      height = 700,
      color,
      style = "bar",
      yAxisMax = "dataMax + 100",
      showLegend = true
    } = this.props;
    if (groups.length === 0) {
      return <div />;
    }
    const data = transformCategorizedMonthlySeriesData(groups);

    const categories = R.pipe(
      R.chain(R.prop("items")),
      R.map(R.prop("category_key")),
      R.reject(R.isNil),
      R.uniq
    )(groups) as CategoryKey[];

    const colors = colorScale(categories);
    const defaultColorScale = R.times(R.always(color), categories.length);
    const zipped = R.zip(
      categories,
      color === undefined ? colors : defaultColorScale
    );

    const lines = zipped.map(([categoryKey, hexColor]) => {
      return style === "area" ? (
        <Area
          key={categoryKey}
          dataKey={categoryKey}
          fill={hexColor}
          stroke={hexColor}
          type="monotoneX"
          stackId="this"
        />
      ) : (
        <Bar
          key={categoryKey}
          dataKey={categoryKey}
          fill={hexColor}
          stroke={hexColor}
          stackId="this"
        />
      );
    });

    const averageSpending = rollingAverage(
      groups,
      groups.length - 1,
      DateTime.fromISO(groups[groups.length - 1].monthKey)
    );
    const dineroAverageSpending = Dinero({ amount: averageSpending.spending });

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
              <YAxis
                domain={[0, yAxisMax]}
                interval={1000}
                allowDecimals={false}
              />
              <Tooltip />
              <ReferenceLine
                y={dineroAverageSpending.toRoundedUnit(2)}
                stroke="green"
                isFront={true}
                // label={"Average: " + dineroAverageSpending.toFormat()}
              />
              {showLegend && <Legend />}
              {lines}
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    );
  }
}

export default PurchaseGraph;
