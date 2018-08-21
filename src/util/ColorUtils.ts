import { CategoryKey } from "../types/data";
import chroma from "chroma-js";
import * as R from "ramda";

// type ColorScaleMapping = [CategoryKey, string];

export const colorScale = (categories: CategoryKey[]): string[] => {
  return chroma
    .scale("Paired")
    .mode("lrgb")
    .colors(categories.length);
};

export const colorScaleMapping = (categories: CategoryKey[]) => {
  return R.zip(categories, colorScale(categories));
};

export default { colorScaleMapping, colorScale };
