import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DetailedTransactionPage from "./pages/DetailedTransactionPage";
import CategoryPage from "./pages/CategoryPage";
import SummaryPage from "./pages/SummaryPage";
import MonthlyReportPage from "./pages/MonthlyReportPage";
import HomePage from "./pages/HomePage";
import * as React from "react";
import Header from "./components/Header";
import { Grid, createMuiTheme } from "@material-ui/core";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { IAmazonOrderItem, IMonthlyGroup } from "./types/data";

import { IAppStore, IAppAction } from "./rootTypes";

import { Provider, connect } from "react-redux";
import { Dispatch } from "redux";
import {
  updateAmazonOrderItems,
  resetAmazonOrderItems,
  uploadCsv
} from "./actions";

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
    marginTop: 120
  }
});

interface IAppProps extends WithStyles<typeof styles> {
  items: IAmazonOrderItem[];
  monthlyGroups: IMonthlyGroup[];
  handleUpdateAmazonOrderItem: (items: IAmazonOrderItem[]) => IAppAction;
  handleClearAmazonOrderItems: () => IAppAction;
  handleCsvUpload: (results: any[]) => IAppAction;
}

class UnwrappedApp extends React.Component<IAppProps, any> {
  public constructor(props: IAppProps) {
    super(props);
    this.state = {
      numMonthsToShow: 4
    };
    this.handleClearStorage = this.handleClearStorage.bind(this);
    this.handleNumMonthsToShowChange = this.handleNumMonthsToShowChange.bind(
      this
    );
  }

  public render() {
    return (
      <Router>
        <React.Fragment>
          <CssBaseline>
            <div className={this.props.classes.root}>
              <Header />
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
                      handleCsvUpload={this.props.handleCsvUpload}
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
  private handleNumMonthsToShowChange(event: any) {
    this.setState({ numMonthsToShow: event.target.value });
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
    handleClearAmazonOrderItems: () => dispatch(resetAmazonOrderItems()),
    handleCsvUpload: (parsedCsv: any[]) => dispatch(uploadCsv(parsedCsv))
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
