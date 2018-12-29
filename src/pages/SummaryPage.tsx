import * as React from "react";
import * as R from "ramda";
import PurchaseSummary from "../components/PurchaseSummary";
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
    <div className="page page--summary">
      <Grid item={true} xs={12}>
        <PurchaseSummary items={items} groups={R.dropLast(1, groups)} />
      </Grid>
      <Grid item={true} xs={12}>
        <PurchaseGraph height={500} groups={groups} showLegend={false} />
      </Grid>
    </div>
  );
}
