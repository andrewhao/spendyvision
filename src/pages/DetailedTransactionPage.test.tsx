import * as React from "react";
import DetailedTransactionPage from "./DetailedTransactionPage";
import { mount } from "enzyme";
import { januaryGroup } from "../test/fixtures";

describe("DetailedTransactionPage", () => {
  const match = { params: { date: "" } };

  it("renders default text when no items", () => {
    const el = mount(
      <DetailedTransactionPage match={match} items={[]} monthlyGroups={[]} />
    );
    expect(el.text()).toMatch("Please upload an order report first");
  });

  it("renders paginated list of items", () => {
    const el = mount(
      <DetailedTransactionPage
        match={match}
        items={januaryGroup.items}
        monthlyGroups={[januaryGroup]}
      />
    );
    expect(el.text()).toMatch("1-3 of 3");
  });
});
