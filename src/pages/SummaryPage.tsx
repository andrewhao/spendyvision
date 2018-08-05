import * as React from "react";
import PurchaseSummary from "../components/PurchaseSummary";
import { Grid } from "@material-ui/core";
import { IAmazonOrderItem } from "../types/data";

interface ISummaryPageProps {
  items: IAmazonOrderItem[];
}

export default function SummaryPage({ items }: ISummaryPageProps) {
  return (
    <Grid item={true} xs={12}>
      <PurchaseSummary items={items} />
    </Grid>
  );
}
