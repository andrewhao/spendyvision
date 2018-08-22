import "./App.css";
import { IAmazonOrderItem, MonthKey, CategoryKey } from "./types/data";
import DetailedTransactionPage from "./pages/DetailedTransactionPage";
import CategoryPage from "./pages/CategoryPage";
import SummaryPage from "./pages/SummaryPage";
import MonthlyReportPage from "./pages/MonthlyReportPage";
import HomePage from "./pages/HomePage";
import parseAmazonCsv from "./util/parseAmazonCsv";
import * as React from "react";
import groupItemsByMonth from "./util/groupItemsByMonth";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import { Grid, withStyles, createMuiTheme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ActivePanel } from "./types/view";
import { DateTime } from "luxon";
import * as R from "ramda";
import { colorScaleMapping } from "./util/ColorUtils";

const LOCAL_STORAGE_CACHE_KEY = "amazon_order_items";

interface IAppState {
  amazonOrderItems: IAmazonOrderItem[];
  isDrawerOpen: boolean;
  activePanel: ActivePanel;
  numMonthsToShow: number;
  focusedMonthlyReportMonth: MonthKey;
}

const theme = createMuiTheme();

const styles: any = {
  root: {
    flexGrow: 1,
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
    padding: theme.spacing.unit * 3,
    marginTop: 100
  }
};

const currentMonth = DateTime.local()
  .startOf("month")
  .toISO() as MonthKey;

class App extends React.Component<any, IAppState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      amazonOrderItems: [],
      isDrawerOpen: true,
      activePanel: ActivePanel.Home,
      numMonthsToShow: 4,
      focusedMonthlyReportMonth: currentMonth
    };
    this.restoreAmazonOrderItems = this.restoreAmazonOrderItems.bind(this);
    this.handleCsvUpload = this.handleCsvUpload.bind(this);
    this.setAmazonOrderItems = this.setAmazonOrderItems.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleNavigationItemClick = this.handleNavigationItemClick.bind(this);
    this.handleMonthlyReportMonthChange = this.handleMonthlyReportMonthChange.bind(
      this
    );
    this.handleNumMonthsToShowChange = this.handleNumMonthsToShowChange.bind(
      this
    );
  }
  public render() {
    const monthlyGroups = groupItemsByMonth(this.state.amazonOrderItems);
    const allCategories = R.pipe(
      R.map(R.prop("category")),
      R.reject(R.isNil),
      R.reject(R.isEmpty),
      R.uniq
    )(this.state.amazonOrderItems) as CategoryKey[];
    const globalColorMapping = colorScaleMapping(allCategories);

    const handleDrawerClose = () => {
      this.setState({ isDrawerOpen: false });
    };

    return (
      <React.Fragment>
        <CssBaseline>
          <div className={this.props.classes.root}>
            <Header
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
              {this.state.activePanel === ActivePanel.Home && (
                <HomePage handleCsvUpload={this.handleCsvUpload} />
              )}
              {this.state.activePanel === ActivePanel.Summary && (
                <SummaryPage
                  groups={monthlyGroups}
                  items={this.state.amazonOrderItems}
                />
              )}
              {this.state.activePanel === ActivePanel.DetailedTransaction && (
                <DetailedTransactionPage groups={monthlyGroups} />
              )}
              {this.state.activePanel === ActivePanel.MonthlyReport && (
                <MonthlyReportPage
                  globalColorMapping={globalColorMapping}
                  monthlyGroups={monthlyGroups}
                  focusedMonth={this.state.focusedMonthlyReportMonth}
                  handleMonthlyReportMonthChange={
                    this.handleMonthlyReportMonthChange
                  }
                />
              )}
              {this.state.activePanel === ActivePanel.Category && (
                <CategoryPage
                  items={this.state.amazonOrderItems}
                  monthlyItems={monthlyGroups}
                  globalColorMapping={globalColorMapping}
                  numMonthsToShow={this.state.numMonthsToShow}
                  handleNumMonthsToShowChange={this.handleNumMonthsToShowChange}
                />
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

  private handleNumMonthsToShowChange(event: any) {
    this.setState({ numMonthsToShow: event.target.value });
  }

  private handleMonthlyReportMonthChange(event: any) {
    this.setState({ focusedMonthlyReportMonth: event.target.value });
  }

  private handleMenuClick() {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
  }

  private handleNavigationItemClick(panel: ActivePanel) {
    return function handleBound(this: React.Component) {
      this.setState({ activePanel: panel });
    }.bind(this);
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
