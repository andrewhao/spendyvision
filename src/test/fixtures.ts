import {
  IAmazonOrderItem,
  IMonthlyGroup,
  CategoryKey,
  CategoryName,
} from "../types/data";

export const january = new Date("2018-01-01").toISOString();
const janDate1 = new Date("2018-01-05").toISOString();
const janDate2 = new Date("2018-01-06").toISOString();
const janDate3 = new Date("2018-01-07").toISOString();
export const janItem1: IAmazonOrderItem = {
  asin: "abc123",
  order_id: "111-1234-5678",
  title: "Flip flops",
  price: "$12.99",
  price_cents: 1299,
  order_date: janDate1,
  category: "Baby" as CategoryName,
  category_key: "baby" as CategoryKey,
};
export const janItem2: IAmazonOrderItem = {
  asin: "abc124",
  order_id: "111-1234-5679",
  title: "Pasta sauce",
  price: "2.99",
  price_cents: 299,
  order_date: janDate2,
  category: "Food Items & Italian Food" as CategoryName,
  category_key: "food-items-and-italian-food" as CategoryKey,
};
export const janItem3: IAmazonOrderItem = {
  asin: "abc125",
  order_id: "111-1234-5680",
  title: "Onesie",
  price: "$16.99",
  price_cents: 1699,
  order_date: janDate3,
  category: "Baby" as CategoryName,
  category_key: "baby" as CategoryKey,
};

export const januaryGroup = {
  monthKey: january,
  items: [janItem1, janItem2, janItem3],
} as IMonthlyGroup;

export const december = new Date("2017-12-01").toISOString();
const decDate1 = new Date("2017-12-05").toISOString();
const decDate2 = new Date("2017-12-06").toISOString();
const decItem1: IAmazonOrderItem = {
  asin: "abd123",
  order_id: "111-1234-5678",
  title: "Echo Dot",
  price: "$39.99",
  price_cents: 3999,
  order_date: decDate1,
  category: "Electronics" as CategoryName,
  category_key: "electronics" as CategoryKey,
};
const decItem2: IAmazonOrderItem = {
  asin: "abe123",
  order_id: "111-1234-36312",
  title: "Diapers",
  price: "$15.27",
  price_cents: 1527,
  order_date: decDate2,
  category: "Baby" as CategoryName,
  category_key: "baby" as CategoryKey,
};

export const decemberGroup = {
  monthKey: december,
  items: [decItem1, decItem2],
} as IMonthlyGroup;

export const november = new Date("2017-11-01").toISOString();
const novDate1 = new Date("2017-11-05").toISOString();
const novDate2 = new Date("2017-11-06").toISOString();
const novItem1: IAmazonOrderItem = {
  asin: "xqq123",
  order_id: "234-1234-5678",
  title: "Power Drill",
  price: "$129.99",
  price_cents: 12999,
  order_date: novDate1,
  category: "Tools & Home Improvement" as CategoryName,
  category_key: "tools-and-home-improvement" as CategoryKey,
};
const novItem2: IAmazonOrderItem = {
  asin: "abf1453",
  order_id: "1155-23454-5678",
  title: "Formula",
  price: "$89.30",
  price_cents: 8930,
  order_date: novDate2,
  category: "Baby" as CategoryName,
  category_key: "baby" as CategoryKey,
};

export const novemberGroup = {
  monthKey: november,
  items: [novItem1, novItem2],
} as IMonthlyGroup;
