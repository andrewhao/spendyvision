import groupItemsByMonth from "./groupItemsByMonth";

describe("groupItemsByMonth", () => {
  it("creates an AmazonOrderItemGroup", () => {
    const date1 = new Date("2018-01-05");
    const date2 = new Date("2018-01-06");
    const item1 = {
      title: "Flip flops",
      price: "$12.99",
      price_cents: 1299,
      order_date: date1
    };
    const item2 = {
      title: "Pasta sauce",
      price: "2.99",
      price_cents: 299,
      order_date: date2
    };
    const items = [item1, item2];

    const result = groupItemsByMonth(items);

    expect(result.length).toEqual(1);
  });
});
