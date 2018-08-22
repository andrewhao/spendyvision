import { CategoryKey, ColorMapping } from "../types/data";
import chroma from "chroma-js";
import * as R from "ramda";

export const colorScale = (categories: CategoryKey[]): string[] => {
  return chroma
    .scale("Paired")
    .mode("lrgb")
    .colors(categories.length);
};

export const colorScaleMapping = (categories: CategoryKey[]): ColorMapping => {
  return R.zipObj(categories, colorScale(categories));
};

export default { colorScaleMapping, colorScale };
