import * as React from "react";
import { Grid } from "@material-ui/core";
import { IAmazonOrderItemGroup } from "../types/data";
import MonthlyOrderTable from "../components/MonthlyOrderTable";

interface IDetailedTransactionPageProps {
  groups: IAmazonOrderItemGroup[];
}

export default function DetailedTransactionPage({
  groups
}: IDetailedTransactionPageProps) {
  return (
    <Grid item={true} xs={12}>
      {renderAmazonOrderItems(groups)}
    </Grid>
  );
}

function renderAmazonOrderItems(groups: IAmazonOrderItemGroup[]) {
  return groups.map((month: IAmazonOrderItemGroup, monthKey) => (
    <MonthlyOrderTable month={month} key={monthKey} />
  ));
}
