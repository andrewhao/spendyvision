// import { AmazonOrderItem } from "../types/AmazonOrderItem";
import parseAmazonCsv from "./parseAmazonCsv";

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
        "01/01/18",
        "113-6290391-3682612",
        "Dang Gluten Free Toasted Coconut Chips, Original, 3.17oz Bags, 4 Count Bundle",
        "Grocery",
        "B01N164QIR",
        "",
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
        "01/04/18",
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
        title:
          "Dang Gluten Free Toasted Coconut Chips, Original, 3.17oz Bags, 4 Count Bundle"
      }
    ]);
  });
});
