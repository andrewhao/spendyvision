import { IAmazonOrderItem } from "../types/data";
import { DateTime } from "luxon";
import * as R from "ramda";
import { snakeCase } from "lodash";

export default function parseAmazonCsv(csvArray: any[]): IAmazonOrderItem[] {
  const headers = csvArray[0];
  const rest = R.filter((item: string[]): boolean => {
    return item.length > 1;
  }, csvArray.slice(1));

  return rest.map(
    (values: string[]): IAmazonOrderItem => {
      const mapping = values.reduce((acc: any, value: string, i: number) => {
        acc[headers[i]] = value;
        return acc;
      }, {});

      return {
        price: mapping["Item Total"],
        title: mapping.Title,
        order_date: DateTime.fromFormat(mapping["Order Date"], "LL/dd/yy", {
          zone: "local"
        })
          .startOf("day")
          .toJSDate(),
        price_cents: convertToPriceCents(mapping["Item Total"]),
        category: mapping.Category,
        category_key: snakeCase(mapping.Category),
        unspsc_code: mapping["UNSPSC Code"]
      } as IAmazonOrderItem;
    }
  );
}

export const convertToPriceCents = (total?: string) => {
  if (!total) {
    return 0;
  }

  const centsStr = total.replace("$", "").replace(".", "");
  return parseInt(centsStr, 10);
};
