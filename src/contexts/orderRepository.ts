import * as React from "react";
import OrdersRepository from "src/repositories/orders";

const OrderRepositoryContext = React.createContext(new OrdersRepository());

export default OrderRepositoryContext;
