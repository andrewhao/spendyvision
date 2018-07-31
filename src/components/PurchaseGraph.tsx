import * as React from "react";
import { XYPlot } from "react-vis";
import { IAmazonOrderItem } from "../types/IAmazonOrderItem";

interface IProps {
  items: IAmazonOrderItem[];
}

export default function PurchaseGraph({ items }: IProps) {}
