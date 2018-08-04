import "./App.css";
import "../node_modules/react-vis/dist/style.css";
import CsvFileUpload from "./CsvFileUpload";
import { IAmazonOrderItem, IAmazonOrderItemGroup } from "./types/data";
import MonthlyOrderTable from "./components/MonthlyOrderTable";
import PurchaseSummary from "./components/PurchaseSummary";
import parseAmazonCsv from "./util/parseAmazonCsv";
import * as React from "react";
import groupItemsByMonth from "./util/groupItemsByMonth";
import PurchaseGraph from "./components/PurchaseGraph";

const LOCAL_STORAGE_CACHE_KEY = "amazon_order_items";

interface IAppState {
  amazonOrderItems: IAmazonOrderItem[];
}

class App extends React.Component<any, IAppState> {
  public constructor(props: any) {
    super(props);
    this.state = { amazonOrderItems: [] };
    this.restoreAmazonOrderItems = this.restoreAmazonOrderItems.bind(this);
    this.handleCsvUpload = this.handleCsvUpload.bind(this);
    this.renderAmazonOrderItems = this.renderAmazonOrderItems.bind(this);
    this.setAmazonOrderItems = this.setAmazonOrderItems.bind(this);
  }
  public render() {
    const groups = groupItemsByMonth(this.state.amazonOrderItems);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">OMG, Amazon!</h1>
          <CsvFileUpload handleCsvUpload={this.handleCsvUpload} />
        </header>
        <PurchaseGraph groups={groups} />
        <PurchaseSummary items={this.state.amazonOrderItems} />
        {this.renderAmazonOrderItems(groups)}
      </div>
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
    console.log(itemsJSON);
    this.setAmazonOrderItems(itemsJSON);
    this.setState({ amazonOrderItems: itemsJSON });
  }
}

export default App;
