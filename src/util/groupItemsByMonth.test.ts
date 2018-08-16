import groupItemsByMonth from "./groupItemsByMonth";
import { DateTime } from "luxon";

describe("groupItemsByMonth", () => {
  it("creates an AmazonOrderItemGroup", () => {
    const date1 = new Date("2018-01-05").toISOString();
    const date2 = new Date("2018-01-06").toISOString();
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
    const group = result[0];
    expect(group.items).toEqual([item1, item2]);
    expect(group.monthKey).toEqual(
      DateTime.fromObject({ year: 2018, month: 1, day: 1 })
        .toLocal()
        .toISO()
    );
  });

  it("returns empty array", () => {
    const result = groupItemsByMonth([]);
    expect(result).toEqual([]);
  });
});
