import * as React from "react";
import SummaryPage from "./SummaryPage";
import { mount } from "enzyme";

describe("SummaryPage", () => {
  it("renders default text when no items", () => {
    const el = mount(<SummaryPage groups={[]} items={[]} />);
    expect(el.text()).toMatch("Please upload an order report first");
  });
});
