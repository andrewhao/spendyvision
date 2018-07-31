import * as React from "react";
import * as enzyme from "enzyme";
import OrderItem from "./OrderItem";
import { DateTime } from "luxon"

describe("OrderItem", () => {
  it("renders the item title", () => {
    const attrs = {
      price: "$12.99",
      title: "foo",
      price_cents: 1299,
      unspsc_code: "52141514",
      category: "Food",
      order_date: DateTime.fromObject({year: 2018, month: 1, day: 1}).toJSDate();
    };
    const subject = enzyme.shallow(<OrderItem {...attrs} />);
    const subjectText = subject.find(".order-item").text();

    expect(subjectText).toContain("foo");
    expect(subjectText).toContain("$12.99");
    expect(subjectText).toContain("Jan 1");
    expect(subjectText).toContain("52141514");
    expect(subjectText).toContain("Food");
  });
});
