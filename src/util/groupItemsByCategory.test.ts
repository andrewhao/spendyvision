import groupItemsByCategory from "./groupItemsByCategory";

describe("groupItemsByCategory", () => {
  it("creates an AmazonOrderItemGroup", () => {
    const date1 = new Date("2018-01-05");
    const date2 = new Date("2018-01-06");
    const item1 = {
      title: "Flip flops",
      price: "$12.99",
      price_cents: 1299,
      order_date: date1,
      category: "Baby"
    };
    const item2 = {
      title: "Pasta sauce",
      price: "2.99",
      price_cents: 299,
      order_date: date2
    };
    const items = [item1, item2];

    const result = groupItemsByCategory(items);

    expect(result.length).toEqual(2);
    const group = result[0];
    expect(group.items).toEqual([item1]);
    expect(group.groupKey).toEqual("Baby");

    const group2 = result[1];
    expect(group2.items).toEqual([item2]);
    expect(group2.groupKey).toEqual("N/A");
  });
});
