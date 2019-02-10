import groupCategoryItemsByMonth from "./groupCategoryItemsByMonth";
import groupItemsByMonth from "./groupItemsByMonth";
import { DateTime } from "luxon";
import { IAmazonOrderItem, CategoryKey, CategoryName } from "src/types/data";

describe("groupCategoryItemsByMonth", () => {
  const date1 = DateTime.local(2018, 1, 5)
    .toLocal()
    .toISO();
  const date2 = DateTime.local(2018, 2, 5)
    .toLocal()
    .toISO();
  const item1: IAmazonOrderItem = {
    order_id: "1234",
    asin: "ABC123",
    title: "Flip flops",
    price: "$12.99",
    price_cents: 1299,
    order_date: date1,
    category: "Baby" as CategoryName,
    category_key: "baby" as CategoryKey
  };
  const item2: IAmazonOrderItem = {
    asin: "ABC124",
    order_id: "1235",
    title: "Cute hat",
    price: "$2.99",
    price_cents: 299,
    order_date: date2,
    category: "Baby" as CategoryName,
    category_key: "baby" as CategoryKey
  };
  const item3: IAmazonOrderItem = {
    asin: "XYZ123",
    order_id: "1236",
    title: "Pasta Sauce",
    price: "$3.99",
    price_cents: 399,
    order_date: date1,
    category: "Groceries" as CategoryName,
    category_key: "groceries" as CategoryKey
  };

  const allMonths = [
    DateTime.fromISO(date1).startOf("month"),
    DateTime.fromISO(date2).startOf("month")
  ];
  const monthlyItems = groupItemsByMonth([item1, item2, item3]);

  it("groups orders by month", () => {
    const result = groupCategoryItemsByMonth(
      "baby" as CategoryKey,
      monthlyItems,
      allMonths
    );

    expect(result).toEqual([
      { monthKey: allMonths[0], monthValue: 1299 },
      { monthKey: allMonths[1], monthValue: 299 }
    ]);
  });

  it("fills in missing category in month with zeros", () => {
    const result = groupCategoryItemsByMonth(
      "groceries" as CategoryKey,
      monthlyItems,
      allMonths
    );

    expect(result).toEqual([
      { monthKey: allMonths[0], monthValue: 399 },
      { monthKey: allMonths[1], monthValue: 0 }
    ]);
  });

  it("handles nonexisting categories with zeros", () => {
    const result = groupCategoryItemsByMonth(
      "salt-shakers" as CategoryKey,
      monthlyItems,
      allMonths
    );

    expect(result).toEqual([
      { monthKey: allMonths[0], monthValue: 0 },
      { monthKey: allMonths[1], monthValue: 0 }
    ]);
  });
});
