import * as React from "react";
import {
  Grid,
  Paper,
  withStyles,
  createStyles,
  WithStyles,
  Typography,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import CsvFileUpload from "../CsvFileUpload";
import { IAmazonOrderItem } from "../types/data";
import * as R from "ramda";
import { isoDateToFriendlyDisplay } from "../util/DateUtils";
import Glasses from "../images/glasses.svg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export interface IHomePageProps extends WithStyles<typeof styles> {
  items: IAmazonOrderItem[];
  handleCsvUpload(results: any[]): void;
  handleClearStorage(): void;
}
const styles = createStyles({
  paper: {
    padding: "1rem",
    marginBottom: "1rem"
  }
});
const HomePage: React.SFC<IHomePageProps> = ({
  handleCsvUpload,
  classes,
  items,
  handleClearStorage
}) => {
  const sortedItems = R.compose(
    R.sort(R.ascend(R.identity)),
    R.map(R.prop("order_date"))
  )(items) as string[];

  const loadedItemMsg = (its: string[]): JSX.Element => {
    if (its === undefined || its.length === 0) {
      return <span />;
    }

    const earliestDate = isoDateToFriendlyDisplay(R.head(its) || "");
    const latestDate = isoDateToFriendlyDisplay(R.last(its) || "");

    return (
      <Paper className={classes.paper}>
        <Typography variant="headline" gutterBottom={true}>
          Order History loaded from <strong>{earliestDate}</strong> to{" "}
          <strong>{latestDate}</strong>.
        </Typography>
        <p>
          This data is stored on this browser, never on our servers. If you'd
          like to clear your data, click "Clear Report History"
        </p>
        <p>
          <Button
            onClick={handleClearStorage}
            variant="contained"
            color="secondary"
          >
            Clear Report History
          </Button>
        </p>
      </Paper>
    );
  };

  return (
    <div>
      <Grid container={true}>
        <Grid item={true} xs={12}>
          <h1
            className="hero"
            style={{
              fontFamily: "Shrikhand",
              fontSize: "3rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: "normal",
              marginBottom: 0,
              marginTop: 0,
              flexDirection: "column"
            }}
          >
            <img
              className="hero__logo"
              style={{ height: "4rem" }}
              src={Glasses}
            />
            <div className="hero__text">Spendyvision</div>
          </h1>
        </Grid>
        <Grid container={true}>
          <Grid item={true} xs={2} />
          <Grid item={true} xs={8}>
            <Typography variant="headline" gutterBottom={true} align="center">
              Spendyvision helps you get a grip on your Amazon spending by
              showing you what you're spending on and how it's changing over
              time.
            </Typography>
          </Grid>
          <Grid item={true} xs={2} />
        </Grid>
      </Grid>
      <Grid item={true} xs={12}>
        {loadedItemMsg(sortedItems)}
        <Paper className={classes.paper}>
          <Typography variant="headline">Get started</Typography>
          <label htmlFor="csv-file-upload__input">
            <Typography variant="subheading" gutterBottom={true}>
              Download your Amazon Order Report CSV and upload it here.
            </Typography>
          </label>

          <CsvFileUpload handleCsvUpload={handleCsvUpload} />
          <Typography variant="body1">
            (This data is stored on this browser, never on our servers.)
          </Typography>
        </Paper>
      </Grid>
      <Grid item={true} xs={12}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="headline" gutterBottom={true}>
              How to download your Amazon Order Report
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid item={true} xs={12}>
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
                3. Click the "Upload Amazon Order Report" and select your
                report.
              </Typography>
              <p>
                Spendyvision will automatically load the data in this
                application.
              </p>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    </div>
  );
};
export default withStyles(styles)(HomePage);
