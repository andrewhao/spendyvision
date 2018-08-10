import * as React from "react";
import { CategoryKey } from "../types/data";
import { DateTime } from "luxon";

interface ICategoryGraphProps {
  allDates: DateTime[];
  category: CategoryKey;
}

export default function CategoryGraph(props: ICategoryGraphProps) {
  return <div className="category-graph" />;
}
