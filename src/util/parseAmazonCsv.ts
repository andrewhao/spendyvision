import { IAmazonOrderItem } from "../types/IAmazonOrderItem";

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
      title: mapping.Title
    } as IAmazonOrderItem;
  });
}
