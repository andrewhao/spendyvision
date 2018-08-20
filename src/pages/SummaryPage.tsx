import * as React from "react";
import PurchaseSummary from "../components/PurchaseSummary";
import PurchaseGraph from "../components/PurchaseGraph";
import { Grid } from "@material-ui/core";
import { IAmazonOrderItem, IMonthlyGroup } from "../types/data";

interface ISummaryPageProps {
  items: IAmazonOrderItem[];
  groups: IMonthlyGroup[];
}

export default function SummaryPage({ groups, items }: ISummaryPageProps) {
  return (
    <React.Fragment>
      <Grid item={true} xs={12}>
        <PurchaseSummary items={items} groups={groups} />
      </Grid>
      <Grid item={true} xs={12}>
        <PurchaseGraph groups={groups} />
      </Grid>
    </React.Fragment>
  );
}
