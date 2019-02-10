import * as React from "react";
import * as R from "ramda";
import PurchaseInsights from "../components/PurchaseInsights";
import PurchaseGraph from "../components/PurchaseGraph";
import { Grid } from "@material-ui/core";
import { IAmazonOrderItem, IMonthlyGroup } from "../types/data";
import { Typography } from "@material-ui/core";

interface ISummaryPageProps {
  items: IAmazonOrderItem[];
  groups: IMonthlyGroup[];
}

export default function SummaryPage({ groups, items }: ISummaryPageProps) {
  if (items.length === 0) {
    return <Typography>Please upload an order report first.</Typography>;
  }
  return (
    <Grid container={true} className="page page--summary">
      <Typography variant="h2" gutterBottom={true}>
        Overview
      </Typography>

      <Grid item={true} xs={12}>
        <PurchaseGraph
          height={500}
          groups={groups}
          style="area"
          showLegend={false}
        />
      </Grid>
      <Grid item={true} xs={12}>
        <Typography variant="h2" gutterBottom={true}>
          Insights
        </Typography>
        <PurchaseInsights items={items} groups={R.dropLast(1, groups)} />
      </Grid>
    </Grid>
  );
}
