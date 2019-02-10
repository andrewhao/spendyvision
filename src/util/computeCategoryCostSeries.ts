import {
  ICategoryGroup,
  IAmazonItemCollectionKeyable,
  Price
} from "../types/data";
import groupItemsByCategory from "./groupItemsByCategory";
import Dinero from "dinero.js";
import computeTotalPrice from "./computeTotalPrice";

interface ICategoryCostSeries {
  [s: string]: Price;
}

export default function computeCategoryCostSeries(
  group: IAmazonItemCollectionKeyable
): ICategoryCostSeries {
  return groupItemsByCategory(group.items).reduce(
    (acc: object, g: ICategoryGroup) => {
      acc[g.groupKey as string] = Dinero({
        amount: computeTotalPrice(g)
      }).toRoundedUnit(2);
      return acc;
    },
    {}
  );
}
