import * as R from "ramda";
import * as React from "react";
import { DateTime } from "luxon";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { Category } from "../types/data";

interface ICategoryReportTableProps {
  allDates: DateTime[];
  allCategories: Category[];
  monthlyCells(category: string): JSX.Element[];
}

export default function CategoryReportTable({
  allDates,
  allCategories,
  monthlyCells
}: ICategoryReportTableProps) {
  const headerCells = R.pipe(
    R.map((date: DateTime) => {
      return (
        <TableCell key={date.toString()}>{date.toFormat("yyyy LLL")}</TableCell>
      );
    }),
    R.prepend(<TableCell key="name">Name</TableCell>)
  )(allDates);

  const categoryResults = allCategories.map((category: string, i: number) => {
    return (
      <TableRow key={i}>
        <TableCell>{category}</TableCell>
        {monthlyCells(category)}
      </TableRow>
    );
  });

  return (
    <Table>
      <TableHead>
        <TableRow>{headerCells}</TableRow>
      </TableHead>
      <TableBody>{categoryResults}</TableBody>
    </Table>
  );
}
