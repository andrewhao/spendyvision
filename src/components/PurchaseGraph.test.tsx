import * as React from "react";
import * as enzyme from "enzyme";
import PurchaseGraph from "./PurchaseGraph";
import { janItem1 } from "../test/fixtures";

xdescribe("PurchaseGraph", () => {
  it("renders the graph", () => {
    const groups = [{ monthKey: "2018-01-01", items: [janItem1] }];
    const attrs = { groups };
    const subject = enzyme.shallow(<PurchaseGraph {...attrs} />);
    expect(subject.find("ResponsiveContainer").length).toEqual(1);
  });

  it("does not render when no groups", () => {
    const subject = enzyme.shallow(<PurchaseGraph groups={[]} />);
    expect(subject.find("ResponsiveContainer").length).toEqual(0);
  });
});
