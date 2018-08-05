import "./App.css";
import { IAmazonOrderItem, IAmazonOrderItemGroup } from "./types/data";
import MonthlyOrderTable from "./components/MonthlyOrderTable";
import PurchaseSummary from "./components/PurchaseSummary";
import parseAmazonCsv from "./util/parseAmazonCsv";
import * as React from "react";
import groupItemsByMonth from "./util/groupItemsByMonth";
import PurchaseGraph from "./components/PurchaseGraph";
import LeftDrawer from "./components/LeftDrawer";
import Header from "./components/Header";
import { Grid, withStyles, createMuiTheme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

const LOCAL_STORAGE_CACHE_KEY = "amazon_order_items";

interface IAppState {
  amazonOrderItems: IAmazonOrderItem[];
  isDrawerOpen: boolean;
}

const theme = createMuiTheme();

const styles = {
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
};

class App extends React.Component<any, IAppState> {
  public constructor(props: any) {
    super(props);
    this.state = { amazonOrderItems: [], isDrawerOpen: false };
    this.restoreAmazonOrderItems = this.restoreAmazonOrderItems.bind(this);
    this.handleCsvUpload = this.handleCsvUpload.bind(this);
    this.renderAmazonOrderItems = this.renderAmazonOrderItems.bind(this);
    this.setAmazonOrderItems = this.setAmazonOrderItems.bind(this);
  }
  public render() {
    const groups = groupItemsByMonth(this.state.amazonOrderItems);
    const handleDrawerClose = () => {
      this.setState({ isDrawerOpen: false });
    };

    return (
      <React.Fragment>
        <CssBaseline>
          <div className="App">
            <Header handleCsvUpload={this.handleCsvUpload} />
            <LeftDrawer
              handleDrawerClose={handleDrawerClose}
              open={this.state.isDrawerOpen}
            />
            <Grid
              container={true}
              direction="row"
              justify="center"
              alignItems="center"
              className={this.props.classes.content}
            >
              <Grid item={true} xs={12} style={{ marginTop: "100px" }}>
                <PurchaseGraph groups={groups} />
              </Grid>
              <Grid item={true} xs={12}>
                <PurchaseSummary items={this.state.amazonOrderItems} />
              </Grid>
              <Grid item={true} xs={12}>
                {this.renderAmazonOrderItems(groups)}
              </Grid>
            </Grid>
          </div>
        </CssBaseline>
      </React.Fragment>
    );
  }

  public componentDidMount() {
    this.restoreAmazonOrderItems();
  }

  private renderAmazonOrderItems(groups: IAmazonOrderItemGroup[]) {
    return groups.map((month: IAmazonOrderItemGroup, monthKey) => (
      <MonthlyOrderTable month={month} key={monthKey} />
    ));
  }

  private setAmazonOrderItems(amazonOrderItems: any[]): boolean {
    const itemsString = JSON.stringify(amazonOrderItems);
    window.localStorage.setItem(LOCAL_STORAGE_CACHE_KEY, itemsString);
    return true;
  }

  private restoreAmazonOrderItems(): boolean {
    const cachedItems = window.localStorage.getItem(LOCAL_STORAGE_CACHE_KEY);
    if (cachedItems !== null) {
      const itemsJSON = JSON.parse(cachedItems);
      this.setState({ amazonOrderItems: itemsJSON });
      return true;
    }
    return false;
  }

  private handleCsvUpload(results: any[]) {
    const itemsJSON = parseAmazonCsv(results);
    this.setAmazonOrderItems(itemsJSON);
    this.setState({ amazonOrderItems: itemsJSON });
  }
}

export default withStyles(styles)(App);
