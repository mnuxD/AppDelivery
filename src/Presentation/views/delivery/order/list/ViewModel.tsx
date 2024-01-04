import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../../../context/OrderContext";
import { UserContext } from "../../../../context/UserContext";

const DeliveryOrderListViewModel = () => {
  const {
    ordersPayed,
    ordersDelivery,
    ordersDispatched,
    ordersOnTheWay,
    getOrdersByDeliveryAndStatus
  } = useContext(OrderContext);

  const { user } = useContext(UserContext);

  const getOrders = async (id_delivery: string, status: string) => {
    const result = await getOrdersByDeliveryAndStatus(id_delivery, status);
  };

  return {
    user,
    ordersPayed,
    ordersDelivery,
    ordersDispatched,
    ordersOnTheWay,
    getOrders
  };
};

export default DeliveryOrderListViewModel;
