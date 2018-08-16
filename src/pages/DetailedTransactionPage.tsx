import * as React from "react";
import { Grid } from "@material-ui/core";
import { IMonthlyGroup } from "../types/data";
import MonthlyOrderTable from "../components/MonthlyOrderTable";

interface IDetailedTransactionPageProps {
  groups: IMonthlyGroup[];
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

function renderAmazonOrderItems(groups: IMonthlyGroup[]) {
  return groups.map((month: IMonthlyGroup, monthKey) => (
    <MonthlyOrderTable month={month} key={monthKey} />
  ));
}
