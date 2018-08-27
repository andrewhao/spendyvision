import { ICategoryGroup, IAmazonItemCollectionKeyable } from "../types/data";
import groupItemsByCategory from "./groupItemsByCategory";

const Dinero = require("dinero.js");
import computeTotalPrice from "./computeTotalPrice";

type CategoryCostSeries = object;

export default function computeCategoryCostSeries(
  group: IAmazonItemCollectionKeyable
): CategoryCostSeries {
  return groupItemsByCategory(group.items).reduce(
    (acc: object, g: ICategoryGroup) => {
      acc[g.groupKey] = Dinero({
        amount: computeTotalPrice(g)
      }).toRoundedUnit(2);
      return acc;
    },
    {}
  );
}
