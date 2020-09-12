import * as PouchDB from "pouchdb";
import { IAmazonOrderItem } from "src/types/data";

class OrdersRepository {
  private db: PouchDB.Database;

  constructor() {
    this.db = new PouchDB("orders");
  }

  public async load(items: IAmazonOrderItem[]) {
    return await this.db.bulkDocs(items);
  }
}

export default OrdersRepository;
