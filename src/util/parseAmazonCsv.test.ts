import parseAmazonCsv, { convertToPriceCents } from "./parseAmazonCsv";
import { DateTime } from "luxon";

describe("parseAmazonCsv", () => {
  it("parses a raw CSV array and returns an AmazonOrderItem", () => {
    const input = [
      [
        "Order Date",
        "Order ID",
        "Title",
        "Category",
        "ASIN/ISBN",
        "UNSPSC Code",
        "Website",
        "Release Date",
        "Condition",
        "Seller",
        "Seller Credentials",
        "List Price Per Unit",
        "Purchase Price Per Unit",
        "Quantity",
        "Payment Instrument Type",
        "Purchase Order Number",
        "PO Line Number",
        "Ordering Customer Email",
        "Shipment Date",
        "Shipping Address Name",
        "Shipping Address Street 1",
        "Shipping Address Street 2",
        "Shipping Address City",
        "Shipping Address State",
        "Shipping Address Zip",
        "Order Status",
        "Carrier Name & Tracking Number",
        "Item Subtotal",
        "Item Subtotal Tax",
        "Item Total",
        "Tax Exemption Applied",
        "Tax Exemption Type",
        "Exemption Opt-Out",
        "Buyer Name",
        "Currency",
        "Group Name"
      ],
      [
        "02/01/18",
        "113-6290391-3682612",
        "Dang Gluten Free Toasted Coconut Chips, Original, 3.17oz Bags, 4 Count Bundle",
        "Grocery",
        "B01N164QIR",
        "52141514",
        "Amazon.com",
        "01/18/17",
        "new",
        "Amazon.com",
        "",
        "$22.99",
        "$12.00",
        "1",
        "Gift Certificate/Card and Visa - 1111",
        "",
        "",
        "charlie@example.com",
        "02/04/18",
        "Charlie Ricky",
        "123 Anywhere St",
        "",
        "Anytown",
        "CA",
        "12345",
        "Shipped",
        "AMZN_US(TBA662376427000)",
        "$12.00",
        "$0.00",
        "$12.00",
        "",
        "",
        "",
        "Charlie Ricky",
        "USD",
        ""
      ]
    ];
    expect(parseAmazonCsv(input)).toEqual([
      {
        price: "$12.00",
        price_cents: 1200,
        order_date: DateTime.local(2018, 2, 1).toJSDate(),
        title:
          "Dang Gluten Free Toasted Coconut Chips, Original, 3.17oz Bags, 4 Count Bundle",
        category: "Grocery",
        unspsc_code: "52141514"
      }
    ]);
  });

  describe("#convertToPriceCents", () => {
    it("converts string to number", () => {
      expect(convertToPriceCents("$12.00")).toEqual(1200);
    });

    it("handles undefined as zero", () => {
      expect(convertToPriceCents()).toEqual(0);
    });

    it("handles blank string as 0", () => {
      expect(convertToPriceCents("")).toEqual(0);
    });
  });
});
