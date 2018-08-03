import "./App.css";
import "../node_modules/react-vis/dist/style.css";
import CsvFileUpload from "./CsvFileUpload";
import { IAmazonOrderItem, IAmazonOrderItemGroup } from "./types/data";
import OrderItem from "./components/OrderItem";
import PurchaseSummary from "./components/PurchaseSummary";
import parseAmazonCsv from "./util/parseAmazonCsv";
import * as React from "react";
import groupItemsByMonth from "./util/groupItemsByMonth";
import PurchaseGraph from "./components/PurchaseGraph";

interface IAppState {
  amazonOrderItems: IAmazonOrderItem[];
}

class App extends React.Component<any, IAppState> {
  public constructor(props: any) {
    super(props);
    this.state = { amazonOrderItems: [] };
    this.handleCsvUpload = this.handleCsvUpload.bind(this);
    this.renderAmazonOrderItems = this.renderAmazonOrderItems.bind(this);
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

  private renderAmazonOrderItems(groups: IAmazonOrderItemGroup[]) {
    return groups.map((month: IAmazonOrderItemGroup, monthKey) => {
      const items = month.items.map((item, i) => (
        <OrderItem key={i} {...item} />
      ));

      const monthGroupKey = month.groupKey;

      return (
        <div className="amazon-order-item-group" key={monthKey}>
          <h1>{monthGroupKey}</h1>
          <table className="amazon-order-items">{items}</table>
        </div>
      );
    });
  }

  private handleCsvUpload(results: any[], filename: string) {
    const amazonOrderItems = parseAmazonCsv(results);
    this.setState({ amazonOrderItems });
  }
}

export default App;
