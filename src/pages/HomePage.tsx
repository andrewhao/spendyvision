import * as React from "react";
import { Grid } from "@material-ui/core";
import CsvFileUpload from "../CsvFileUpload";

export interface IHomePageProps {
  handleCsvUpload(results: any[]): void;
}
export default function HomePage({ handleCsvUpload }: IHomePageProps) {
  return (
    <Grid item={true} xs={12}>
      <label htmlFor="csv-file-upload__input">
        <h2>Go on, upload an order report</h2>
      </label>

      <CsvFileUpload handleCsvUpload={handleCsvUpload} />
    </Grid>
  );
}
