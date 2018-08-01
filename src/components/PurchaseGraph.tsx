import * as React from "react";
import { IAmazonOrderItemGroup } from "../types/IAmazonOrderItemGroup";
import { IAmazonOrderItem } from "../types/IAmazonOrderItem";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalBarSeries
} from "react-vis";
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
  x: number;
  y: number;
}

const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;

const seriesData = (groups: IAmazonOrderItemGroup[]): ISeriesData[] => {
  return groups.map(group => {
    const x = new Date(group.groupKey).getTime();
    return {
      x: x + ONE_MONTH,
      x0: x,
      y: groupMoney(group)
    } as ISeriesData;
  });
};

const startOfYear = DateTime.fromJSDate(new Date())
  .startOf("year")
  .toJSDate()
  .getTime();
const endOfYear = DateTime.fromJSDate(new Date())
  .endOf("year")
  .toJSDate()
  .getTime();
const xDomain = [startOfYear, endOfYear];
const handleMouseOver = (d: any) => {
  return `${DateTime.fromISO(d.x).toISODate()}: $${d.y.toFixed(2)}`;
};

export default function PurchaseGraph({ groups }: IProps) {
  const data = seriesData(groups);
  const tickValues = groups.map(group => new Date(group.groupKey).getTime());

  return (
    <div className="purchase-graph">
      <XYPlot width={800} height={500}>
        <HorizontalGridLines />
        <VerticalBarSeries
          xDomain={xDomain}
          xType={"time"}
          data={data}
          onValueMouseOver={handleMouseOver}
        />
        <XAxis tickValues={tickValues} />
        <YAxis />
      </XYPlot>
    </div>
  );
}
