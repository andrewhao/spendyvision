import * as R from "ramda";
import { DateTime } from "luxon";
import { Nullable } from "typescript-nullable";
import { MonthKey } from "../types/data";

export default function deriveCurrentMonth(itemsJSON: any): Nullable<MonthKey> {
  const date = R.pipe(
    R.map(R.prop("order_date")),
    R.sortBy(R.identity),
    R.last
  )(itemsJSON);
  return DateTime.fromISO(date)
    .startOf("month")
    .toString();
}
