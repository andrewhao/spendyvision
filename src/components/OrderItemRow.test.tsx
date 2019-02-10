import * as React from "react";
import * as enzyme from "enzyme";
import OrderItemRow from "./OrderItemRow";
import { DateTime } from "luxon";
import { IAmazonOrderItem, CategoryKey, CategoryName } from "src/types/data";

describe("OrderItemRow", () => {
  xit("renders the item title", () => {
    const attrs: IAmazonOrderItem = {
      order_id: "1234",
      asin: "XYZ123",
      price: "$12.99",
      title: "foo",
      price_cents: 1299,
      unspsc_code: "52141514",
      category: "Food" as CategoryName,
      category_key: "food" as CategoryKey,
      order_date: DateTime.fromObject({ year: 2018, month: 1, day: 1 }).toISO()
    };
    const subject = enzyme.shallow(<OrderItemRow {...attrs} />);
    const subjectText = subject
      .find(".order-item")
      .dive()
      .html();

    expect(subjectText).toContain("foo");
    expect(subjectText).toContain("$12.99");
    expect(subjectText).toContain("Jan 1");
    expect(subjectText).toContain("52141514");
    expect(subjectText).toContain("Food");
  });
});
