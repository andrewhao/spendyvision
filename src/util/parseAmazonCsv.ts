import { IAmazonOrderItem } from "../types/IAmazonOrderItem";
import { DateTime } from "luxon";

export default function parseAmazonCsv(csvArray: any[]): IAmazonOrderItem[] {
  const headers = csvArray[0];
  const rest = csvArray.slice(1);

  return rest.map(values => {
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
      unspsc_code: mapping["UNSPSC Code"]
    } as IAmazonOrderItem;
  });
}

export const convertToPriceCents = (total?: string) => {
  if (!total) {
    return 0;
  }

  const centsStr = total.replace("$", "").replace(".", "");
  return parseInt(centsStr, 10);
};
