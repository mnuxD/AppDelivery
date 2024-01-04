import React, { useContext, useState } from "react";
import { OrderContext } from "../../../../context/OrderContext";

const AdminOrderListViewModel = () => {
  const {
    ordersPayed,
    ordersDelivery,
    ordersDispatched,
    ordersOnTheWay,
    getOrdersByStatus
  } = useContext(OrderContext);

  const getOrders = async (status: string) => {
    await getOrdersByStatus(status);
  };

  return {
    ordersPayed,
    ordersDelivery,
    ordersDispatched,
    ordersOnTheWay,
    getOrders
  };
};

export default AdminOrderListViewModel;
