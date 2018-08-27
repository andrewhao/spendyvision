import * as React from "react";
import { Grid, Paper, withStyles, Typography } from "@material-ui/core";
import CsvFileUpload from "../CsvFileUpload";
import { IAmazonOrderItem } from "../types/data";
import * as R from "ramda";
import { isoDateToFriendlyDisplay } from "../util/DateUtils";

export interface IHomePageProps {
  classes: any;
  items: IAmazonOrderItem[];
  handleCsvUpload(results: any[]): void;
}
const styles: any = {
  paper: {
    padding: "1rem",
    marginBottom: "1rem"
  }
};
function HomePage({ handleCsvUpload, classes, items }: IHomePageProps) {
  const sortedItems = R.compose(
    R.sort(R.ascend(R.identity)),
    R.map(R.prop("order_date"))
  )(items) as string[];

  const loadedItemMsg = (its: string[]): JSX.Element => {
    if (its === undefined || its === []) {
      return <span />;
    }

    const earliestDate = isoDateToFriendlyDisplay(R.head(its) || "");
    const latestDate = isoDateToFriendlyDisplay(R.last(its) || "");

    return (
      <Paper className={classes.paper}>
        <Typography variant="headline" gutterBottom={true}>
          You've already loaded some data.
        </Typography>
        <p>
          We already have records of an existing loaded order report, from{" "}
          <strong>{earliestDate}</strong> to <strong>{latestDate}</strong>.
          Click a report to view on the left, or you can proceed below to upload
          a fresh order report.
        </p>
      </Paper>
    );
  };

  return (
    <div>
      <Grid item={true} xs={12}>
        {loadedItemMsg(sortedItems)}
        <Paper className={classes.paper}>
          <label htmlFor="csv-file-upload__input">
            <Typography variant="headline" gutterBottom={true}>
              Upload a recent order report
            </Typography>
          </label>

          <CsvFileUpload handleCsvUpload={handleCsvUpload} />
        </Paper>
      </Grid>
      <Grid item={true} xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="headline" gutterBottom={true}>
            How to download your Amazon Order Report
          </Typography>
          <Typography variant="title" gutterBottom={true}>
            1. Visit the Amazon.com Order History Report page
          </Typography>
          <p>
            Visit the{" "}
            <a href="https://www.amazon.com/gp/b2b/reports">
              Order History Report Page
            </a>
          </p>
          <Typography variant="title" gutterBottom={true}>
            2. Download an "Items" Order Report to your computer.
          </Typography>

          <p>
            <img
              src="/images/amazon-download-report.gif"
              width="90%"
              alt="Screencast of report download"
            />
          </p>
          <p>
            Choose which dates you want to import in your report, then click
            "Request Report". The file should download to your computer.
          </p>
          <p>
            <strong>Important:</strong> Make sure that the "Report Type" you
            download is <strong>"Items"</strong>
          </p>

          <Typography variant="title" gutterBottom={true}>
            3. Click the "Upload Amazon Order Report" and select your report.
          </Typography>
          <p>
            Spendyvision will automatically load the data in this application.
          </p>
        </Paper>
      </Grid>
    </div>
  );
}
export default withStyles(styles)(HomePage);
