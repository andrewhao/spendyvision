import { IAmazonOrderItem, IMonthlyGroup } from "../types/data";

export const january = new Date("2018-01-01").toISOString();
const janDate1 = new Date("2018-01-05").toISOString();
const janDate2 = new Date("2018-01-06").toISOString();
const janDate3 = new Date("2018-01-07").toISOString();
const janItem1 = {
  title: "Flip flops",
  price: "$12.99",
  price_cents: 1299,
  order_date: janDate1,
  category: "Baby"
} as IAmazonOrderItem;
const janItem2 = {
  title: "Pasta sauce",
  price: "2.99",
  price_cents: 299,
  order_date: janDate2,
  category: "Food Items & Italian Food"
} as IAmazonOrderItem;
const janItem3 = {
  title: "Onesie",
  price: "$16.99",
  price_cents: 1699,
  order_date: janDate3,
  category: "Baby"
} as IAmazonOrderItem;

export const januaryGroup = {
  monthKey: january,
  items: [janItem1, janItem2, janItem3]
} as IMonthlyGroup;

export const december = new Date("2017-12-01").toISOString();
const decDate1 = new Date("2017-12-05").toISOString();
const decDate2 = new Date("2017-12-06").toISOString();
const decItem1 = {
  title: "Echo Dot",
  price: "$39.99",
  price_cents: 3999,
  order_date: decDate1,
  category: "Electronics"
} as IAmazonOrderItem;
const decItem2 = {
  title: "Diapers",
  price: "$15.27",
  price_cents: 1527,
  order_date: decDate2,
  category: "Baby"
} as IAmazonOrderItem;

export const decemberGroup = {
  monthKey: december,
  items: [decItem1, decItem2]
} as IMonthlyGroup;

export const november = new Date("2017-11-01").toISOString();
const novDate1 = new Date("2017-11-05").toISOString();
const novDate2 = new Date("2017-11-06").toISOString();
const novItem1 = {
  title: "Power Drill",
  price: "$129.99",
  price_cents: 12999,
  order_date: novDate1,
  category: "Tools & Home Improvement"
} as IAmazonOrderItem;
const novItem2 = {
  title: "Formula",
  price: "$89.30",
  price_cents: 8930,
  order_date: novDate2,
  category: "Baby"
} as IAmazonOrderItem;

export const novemberGroup = {
  monthKey: november,
  items: [novItem1, novItem2]
} as IMonthlyGroup;
