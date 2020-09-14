import OrdersRepository from "../orders";
import { janItem1, janItem2 } from "../../test/fixtures";

describe("OrdersRepository", () => {
  let repository: OrdersRepository;

  beforeEach(() => {
    repository = new OrdersRepository();
  });

  afterEach(() => {
    return repository.destroy();
  });

  describe("load", () => {
    it("bulk loads a list of IAmazonOrderItems", () => {
      return repository.load([janItem1, janItem2]).then((result) => {
        expect(result[0].id).toBeDefined();
      });
    });
  });

  describe("find", () => {
    it("finds by category", () => {
      return repository
        .load([janItem1])
        .then(() =>
          repository.find({
            selector: {
              category_key: janItem1.category_key,
            },
          })
        )
        .then((result) => {
          expect(result).toMatchObject([
            expect.objectContaining({
              asin: janItem1.asin,
              category_key: janItem1.category_key,
            }),
          ]);
        });
    });
  });
});
