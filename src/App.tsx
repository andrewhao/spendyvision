import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CategoryKey } from "./types/data";
import DetailedTransactionPage from "./pages/DetailedTransactionPage";
import CategoryPage from "./pages/CategoryPage";
import SummaryPage from "./pages/SummaryPage";
import MonthlyReportPage from "./pages/MonthlyReportPage";
import HomePage from "./pages/HomePage";
import parseAmazonCsv from "./util/parseAmazonCsv";
import * as React from "react";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import { Grid, createMuiTheme } from "@material-ui/core";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ActivePanel } from "./types/view";
import { IAmazonOrderItem, IMonthlyGroup } from "./types/data";
import * as R from "ramda";
import { colorScaleMapping } from "./util/ColorUtils";

import { IAppStore, IAppAction } from "./rootTypes";

import { Provider, connect } from "react-redux";
import { Dispatch } from "redux";
import { updateAmazonOrderItems, resetAmazonOrderItems } from "./actions";

import configureStore from "./store";

const store = configureStore();

const LOCAL_STORAGE_CACHE_KEY = "amazon_order_items";

const theme = createMuiTheme();

const styles = createStyles({
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
});

interface IAppProps extends WithStyles<typeof styles> {
  items: IAmazonOrderItem[];
  monthlyGroups: IMonthlyGroup[];
  handleUpdateAmazonOrderItem: (items: IAmazonOrderItem[]) => IAppAction;
  handleClearAmazonOrderItems: () => IAppAction;
}

class UnwrappedApp extends React.Component<IAppProps, any> {
  public constructor(props: IAppProps) {
    super(props);
    this.state = {
      activePanel: ActivePanel.Home,
      numMonthsToShow: 4
    };
    this.restoreAmazonOrderItems = this.restoreAmazonOrderItems.bind(this);
    this.handleCsvUpload = this.handleCsvUpload.bind(this);
    this.handleClearStorage = this.handleClearStorage.bind(this);
    this.setAmazonOrderItems = this.setAmazonOrderItems.bind(this);
    this.handleNavigationItemClick = this.handleNavigationItemClick.bind(this);
    this.handleNumMonthsToShowChange = this.handleNumMonthsToShowChange.bind(
      this
    );
  }
  public render() {
    const allCategories = R.pipe(
      R.map(R.prop("category")),
      R.reject(R.isNil),
      R.reject(R.isEmpty),
      R.uniq
    )(this.props.items) as CategoryKey[];

    const globalColorMapping = colorScaleMapping(allCategories);

    return (
      <Router>
        <React.Fragment>
          <CssBaseline>
            <div className={this.props.classes.root}>
              <Header />
              <Navigation
                activePanel={this.state.activePanel}
                handleItemClick={this.handleNavigationItemClick}
              />
              <Grid
                container={true}
                direction="row"
                justify="center"
                alignItems="center"
                className={this.props.classes.content}
              >
                <Route
                  exact={true}
                  path="/"
                  render={() => (
                    <HomePage
                      handleCsvUpload={this.handleCsvUpload}
                      handleClearStorage={this.handleClearStorage}
                      items={this.props.items}
                    />
                  )}
                />
                <Route
                  path="/summary"
                  render={() => (
                    <SummaryPage
                      groups={this.props.monthlyGroups}
                      items={this.props.items}
                    />
                  )}
                />
                <Switch>
                  <Route
                    path="/transactions/date/:date"
                    render={props => (
                      <DetailedTransactionPage
                        {...props}
                        items={this.props.items}
                        monthlyGroups={this.props.monthlyGroups}
                      />
                    )}
                  />
                  <Route
                    path="/transactions"
                    render={props => (
                      <DetailedTransactionPage
                        {...props}
                        items={this.props.items}
                        monthlyGroups={this.props.monthlyGroups}
                      />
                    )}
                  />
                </Switch>
                <Route
                  path="/monthly"
                  render={() => (
                    <MonthlyReportPage
                      globalColorMapping={globalColorMapping}
                      monthlyGroups={this.props.monthlyGroups}
                    />
                  )}
                />
                <Route
                  path="/categories"
                  render={() => (
                    <CategoryPage
                      items={this.props.items}
                      monthlyItems={this.props.monthlyGroups}
                      globalColorMapping={globalColorMapping}
                      numMonthsToShow={this.state.numMonthsToShow}
                      handleNumMonthsToShowChange={
                        this.handleNumMonthsToShowChange
                      }
                    />
                  )}
                />
              </Grid>
            </div>
          </CssBaseline>
        </React.Fragment>
      </Router>
    );
  }

  public componentWillMount() {
    this.restoreAmazonOrderItems();
  }

  private handleNumMonthsToShowChange(event: any) {
    this.setState({ numMonthsToShow: event.target.value });
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

      this.props.handleUpdateAmazonOrderItem(itemsJSON);
      return true;
    }
    return false;
  }

  private handleCsvUpload(results: any[]) {
    const itemsJSON = parseAmazonCsv(results);
    this.setAmazonOrderItems(itemsJSON);
    this.props.handleUpdateAmazonOrderItem(itemsJSON);
  }

  private handleClearStorage(): void {
    window.localStorage.removeItem(LOCAL_STORAGE_CACHE_KEY);
    this.props.handleClearAmazonOrderItems();
  }
}

function mapStateToProps(state: IAppStore) {
  return { items: state.amazonOrderItems, monthlyGroups: state.monthlyGroups };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    handleUpdateAmazonOrderItem: (newItems: IAmazonOrderItem[]) =>
      dispatch(updateAmazonOrderItems(newItems)),
    handleClearAmazonOrderItems: () => dispatch(resetAmazonOrderItems())
  };
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UnwrappedApp));

const App = () => (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
);

export default App;
