import "./App.css";
import CsvFileUpload from "./CsvFileUpload";
import { IAmazonOrderItem } from "./types/IAmazonOrderItem";
import OrderItem from "./components/OrderItem";
import parseAmazonCsv from "./util/parseAmazonCsv";
import * as React from "react";

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
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">OMG, Amazon!</h1>
        </header>
        <p className="App-intro">
          <CsvFileUpload handleCsvUpload={this.handleCsvUpload} />
        </p>
        {this.renderAmazonOrderItems(this.state.amazonOrderItems)}
      </div>
    );
  }

  private renderAmazonOrderItems(amazonOrderItems: IAmazonOrderItem[]) {
    const items = amazonOrderItems.map((item, i) => (
      <OrderItem key={i} {...item} />
    ));
    return <table className="amazon-order-items">{items}</table>;
  }

  private handleCsvUpload(results: any[], filename: string) {
    const amazonOrderItems = parseAmazonCsv(results);
    this.setState({ amazonOrderItems });
  }
}

export default App;
