import SpendingComputation from "./SpendingComputation";
import { DateTime } from "luxon";
import { novemberGroup, decemberGroup, januaryGroup } from "../test/fixtures";
import { CategoryKey } from "../types/data";

describe("SpendingComputation", () => {
  describe("#rollingAverage", () => {
    const january = DateTime.fromObject({ year: 2018, month: 1, day: 1 });
    const february = DateTime.fromObject({ year: 2018, month: 2, day: 1 });

    it("returns 0 when no months provided", () => {
      const result = SpendingComputation.rollingAverage([], 3, january);
      expect(result).toEqual({ numMonths: 0, spending: 0 });
    });

    it("returns 0 when rolling period is 0", () => {
      const result = SpendingComputation.rollingAverage(
        [decemberGroup, januaryGroup],
        0,
        january
      );

      expect(result).toEqual({ numMonths: 0, spending: 0 });
    });

    it("returns the prior month total when only 1 month prior provided", () => {
      const result = SpendingComputation.rollingAverage(
        [decemberGroup, januaryGroup],
        3,
        january
      );

      expect(result).toEqual({ numMonths: 1, spending: 5526 });
    });

    it("returns the two prior months total when only 2 month prior provided", () => {
      const result = SpendingComputation.rollingAverage(
        [novemberGroup, decemberGroup, januaryGroup],
        3,
        january
      );

      expect(result).toEqual({ numMonths: 2, spending: 13728 });
    });

    it("returns only the rolling period specified", () => {
      const result = SpendingComputation.rollingAverage(
        [novemberGroup, decemberGroup, januaryGroup],
        2,
        february
      );

      expect(result).toEqual({ numMonths: 2, spending: 4412 });
    });

    describe("filtering by category", () => {
      it("returns filtered results for a category", () => {
        const result = SpendingComputation.rollingAverage(
          [novemberGroup, decemberGroup, januaryGroup],
          2,
          february,
          "Baby" as CategoryKey
        );
        expect(result).toEqual({ numMonths: 2, spending: 2263 });
      });
    });
  });
});
