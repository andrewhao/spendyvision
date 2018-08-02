import * as React from "react";
import * as enzyme from "enzyme";
import PurchaseGraph from "./PurchaseGraph";
import { DateTime } from "luxon";

describe("PurchaseGraph", () => {
  it("renders the graph", () => {
    const item = {
      price: "$12.99",
      title: "foo",
      price_cents: 1299,
      unspsc_code: "52141514",
      category: "Food",
      order_date: DateTime.fromObject({
        year: 2018,
        month: 1,
        day: 1
      }).toJSDate()
    };
    const groups = [{ groupKey: "2018-01-01", items: [item] }];
    const attrs = { groups };
    const subject = enzyme.shallow(<PurchaseGraph {...attrs} />);
    expect(subject.find("ResponsiveContainer").length).toEqual(1);
  });

  it("does not render when no groups", () => {
    const subject = enzyme.shallow(<PurchaseGraph groups={[]} />);
    expect(subject.find("ResponsiveContainer").length).toEqual(0);
  });
});
