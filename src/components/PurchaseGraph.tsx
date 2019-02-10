import * as React from "react";
import { IMonthlyGroup, ColorMapping } from "../types/data";
import * as R from "ramda";
import { DateTime } from "luxon";
import Dinero from "dinero.js";
import { connect } from "react-redux";

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
import { IAppStore } from "src/rootTypes";

interface IProps {
  groups: IMonthlyGroup[];
  height?: number;
  color?: string;
  style?: string;
  yAxisMax?: any;
  showLegend?: boolean;
  globalColorMapping: ColorMapping;
}

class PurchaseGraph extends React.PureComponent<IProps> {
  public render() {
    const {
      groups,
      height = 700,
      style = "bar",
      showLegend = true,
      globalColorMapping
    } = this.props;
    if (groups.length === 0) {
      return <div />;
    }
    const data = transformCategorizedMonthlySeriesData(groups);

    const lines = R.pipe(
      R.toPairs,
      R.map(([categoryKey, hexColor]) => {
        return style === "area" ? (
          <Area
            key={categoryKey}
            dataKey={categoryKey}
            fill={hexColor}
            stroke={hexColor}
            stackId="this"
            type="step"
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
      })
    )(globalColorMapping);

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
              <YAxis allowDecimals={false} />
              <Tooltip />
              <ReferenceLine
                y={dineroAverageSpending.toRoundedUnit(2)}
                stroke="green"
                isFront={true}
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

function mapStateToProps(state: IAppStore) {
  return {
    globalColorMapping: state.globalColorMapping
  };
}

export default connect(
  mapStateToProps,
  null
)(PurchaseGraph);
