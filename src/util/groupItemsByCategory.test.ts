import groupItemsByCategory from "./groupItemsByCategory";
import { janItem1, janItem2 } from "../test/fixtures";

describe("groupItemsByCategory", () => {
  it("creates an AmazonOrderItemGroup", () => {
    const items = [janItem1, janItem2];

    const result = groupItemsByCategory(items);

    expect(result.length).toEqual(2);
    const group = result[0];
    expect(group.items).toEqual([janItem1]);
    expect(group.groupKey).toEqual("Baby");

    const group2 = result[1];
    expect(group2.items).toEqual([janItem2]);
    expect(group2.groupKey).toEqual("N/A");
  });
});
