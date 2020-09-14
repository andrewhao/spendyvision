import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";
import { IAmazonOrderItem } from "src/types/data";

PouchDB.plugin(PouchDBFind);

/**
 * Database wrapper around PouchDB database for orders.
 */
class OrdersRepository {
  private db: PouchDB.Database;

  constructor() {
    this.db = new PouchDB("orders");
    this.db.createIndex({
      index: {
        fields: ["category_key"],
      },
    });
  }

  public async load(items: IAmazonOrderItem[]) {
    return await this.db.bulkDocs(items);
  }

  public async find(request: PouchDB.Find.FindRequest<IAmazonOrderItem>) {
    return (await this.db.find(request)).docs;
  }

  public async close() {
    return this.db.close();
  }

  public async destroy() {
    return await this.db.destroy();
  }
}

export default OrdersRepository;
