import * as React from "react";
import CategoryPage from "./CategoryPage";
import { mount } from "enzyme";

describe("CategoryPage", () => {
  it("renders default text when no items", () => {
    const el = mount(
      <CategoryPage
        classes={{}}
        globalColorMapping={{}}
        numMonthsToShow={0}
        monthlyItems={[]}
        items={[]}
        handleNumMonthsToShowChange={() => null}
      />
    );
    expect(el.text()).toMatch("Please upload an order report first");
  });
});
