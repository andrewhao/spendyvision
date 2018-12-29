import * as React from "react";
import {
  Grid,
  Paper,
  withStyles,
  createStyles,
  WithStyles,
  Typography,
  Dialog,
  Button,
  DialogTitle,
  DialogContent
} from "@material-ui/core";
import CsvFileUpload from "../CsvFileUpload";
import { IAmazonOrderItem } from "../types/data";
import * as R from "ramda";
import { isoDateToFriendlyDisplay } from "../util/DateUtils";

export interface IHomePageProps extends WithStyles<typeof styles> {
  items: IAmazonOrderItem[];
  handleCsvUpload(results: any[]): void;
  handleClearStorage(): void;
}

interface IHomePageState {
  isOpen: boolean;
}

const styles = createStyles({
  paper: {
    padding: "1rem",
    marginBottom: "1rem"
  }
});

class HomePage extends React.Component<IHomePageProps, IHomePageState> {
  constructor(props: IHomePageProps) {
    super(props);
    this.state = { isOpen: false };

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  public render() {
    const { handleCsvUpload, classes, items, handleClearStorage } = this.props;
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
      <div className="page page--home">
        <Grid container={true}>
          <Grid container={true}>
            <Grid item={true} xs={1}>
              1.
            </Grid>
            <Grid item={true} xs={11}>
              <Typography variant="headline" gutterBottom={true} align="center">
                Download an Amazon Order Item Report. (
                <a onClick={this.handleOpen} href="#">
                  Tell me more
                </a>
                )
              </Typography>
            </Grid>
          </Grid>
          <Grid container={true}>
            <Grid item={true} xs={1}>
              2.
            </Grid>
            <Grid item={true} xs={11}>
              <CsvFileUpload handleCsvUpload={handleCsvUpload} />
              <Typography variant="body1">
                (This data is stored on this browser, never on our servers.)
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item={true} xs={12}>
          {loadedItemMsg(sortedItems)}
        </Grid>
        <Dialog open={this.state.isOpen} onClose={this.handleClose}>
          <DialogTitle>How to download your Amazon Order Report</DialogTitle>
          <DialogContent>
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
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  private handleClose() {
    this.setState({ isOpen: false });
  }

  private handleOpen() {
    this.setState({ isOpen: true });
  }
}
export default withStyles(styles)(HomePage);
