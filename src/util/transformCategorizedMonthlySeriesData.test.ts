import transformCategorizedMonthlySeriesData from "./transformCategorizedMonthlySeriesData";
import { IAmazonOrderItem, IMonthlyGroup } from "../types/data";

xdescribe("transformCategorizedMonthlySeriesData", () => {
  it("groups items by category costs", () => {
    const date1 = new Date("2018-01-05").toISOString();
    const date2 = new Date("2018-01-06").toISOString();
    const date3 = new Date("2018-01-07").toISOString();
    const babyItem1: IAmazonOrderItem = {
      asin: "baby123",
      order_id: "1234",
      title: "Flip flops",
      price: "$12.99",
      price_cents: 1299,
      order_date: date1,
      category: "Baby"
    };
    const foodItem2: IAmazonOrderItem = {
      asin: "food123",
      order_id: "1235",
      title: "Pasta sauce",
      price: "2.99",
      price_cents: 299,
      order_date: date2,
      category: "Food Items & Italian Food"
    };
    const babyItem2: IAmazonOrderItem = {
      asin: "baby223",
      order_id: "1236",
      title: "Onesie",
      price: "$16.99",
      price_cents: 1699,
      order_date: date3,
      category: "Baby"
    };

    const monthGroup = {
      monthKey: "january 2018",
      items: [babyItem1, foodItem2, babyItem2]
    } as IMonthlyGroup;

    const result = transformCategorizedMonthlySeriesData([monthGroup]);
    expect(Object.keys(result[0])).toEqual([
      "month",
      "y",
      "baby",
      "food_items_italian_food"
    ]);
  });
});
