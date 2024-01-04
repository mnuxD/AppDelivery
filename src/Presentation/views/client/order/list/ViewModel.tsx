import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../../../context/OrderContext";
import { UserContext } from "../../../../context/UserContext";

const ClientOrderListViewModel = () => {
  const {
    ordersPayed,
    ordersDelivery,
    ordersDispatched,
    ordersOnTheWay,
    getOrdersByClientAndStatus
  } = useContext(OrderContext);

  const { user } = useContext(UserContext);

  const getOrders = async (id_client: string, status: string) => {
    const result = await getOrdersByClientAndStatus(id_client, status);
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

export default ClientOrderListViewModel;
