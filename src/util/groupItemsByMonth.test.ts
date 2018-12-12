import groupItemsByMonth from "./groupItemsByMonth";
import { DateTime } from "luxon";
import { janItem1, janItem2 } from "../test/fixtures";

describe("groupItemsByMonth", () => {
  it("creates an AmazonOrderItemGroup", () => {
    const items = [janItem1, janItem2];

    const result = groupItemsByMonth(items);

    expect(result.length).toEqual(1);
    const group = result[0];
    expect(group.items).toEqual([janItem1, janItem2]);
    expect(group.monthKey).toEqual(
      DateTime.fromObject({ year: 2018, month: 1, day: 1 })
        .toLocal()
        .toISO()
    );
  });

  it("returns empty array", () => {
    const result = groupItemsByMonth([]);
    expect(result).toEqual([]);
  });
});
