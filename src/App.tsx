import "./App.css";
import { IAmazonOrderItem } from "./types/data";
import DetailedTransactionPage from "./pages/DetailedTransactionPage";
import SummaryPage from "./pages/SummaryPage";
import parseAmazonCsv from "./util/parseAmazonCsv";
import * as React from "react";
import groupItemsByMonth from "./util/groupItemsByMonth";
import PurchaseGraph from "./components/PurchaseGraph";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import { Grid, withStyles, createMuiTheme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ActivePanel } from "./types/view";

const LOCAL_STORAGE_CACHE_KEY = "amazon_order_items";

interface IAppState {
  amazonOrderItems: IAmazonOrderItem[];
  isDrawerOpen: boolean;
  activePanel: ActivePanel;
}

const theme = createMuiTheme();

const styles: any = {
  root: {
    flexGrow: 1,
    height: "100vh",
    zIndex: 1,
    position: "relative",
    display: "flex"
  },
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
    this.state = {
      amazonOrderItems: [],
      isDrawerOpen: false,
      activePanel: "Summary"
    };
    this.restoreAmazonOrderItems = this.restoreAmazonOrderItems.bind(this);
    this.handleCsvUpload = this.handleCsvUpload.bind(this);
    this.setAmazonOrderItems = this.setAmazonOrderItems.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleNavigationItemClick = this.handleNavigationItemClick.bind(this);
  }
  public render() {
    const groups = groupItemsByMonth(this.state.amazonOrderItems);
    const handleDrawerClose = () => {
      this.setState({ isDrawerOpen: false });
    };

    return (
      <React.Fragment>
        <CssBaseline>
          <div className={this.props.classes.root}>
            <Header
              handleCsvUpload={this.handleCsvUpload}
              handleMenuClick={this.handleMenuClick}
              open={this.state.isDrawerOpen}
            />
            <Navigation
              handleDrawerClose={handleDrawerClose}
              activePanel={this.state.activePanel}
              handleItemClick={this.handleNavigationItemClick}
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
              {this.state.activePanel === "Summary" && (
                <SummaryPage items={this.state.amazonOrderItems} />
              )}
              {this.state.activePanel === "DetailedTransaction" && (
                <DetailedTransactionPage groups={groups} />
              )}
            </Grid>
          </div>
        </CssBaseline>
      </React.Fragment>
    );
  }

  public componentDidMount() {
    this.restoreAmazonOrderItems();
  }

  private handleMenuClick() {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
  }

  private handleNavigationItemClick(panel: ActivePanel) {
    this.setState({ activePanel: panel });
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
