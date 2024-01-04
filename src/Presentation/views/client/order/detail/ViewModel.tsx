import React, { useContext, useEffect, useState } from "react";
import { Order } from "../../../../../Domain/entities/Order";
import { OrderContext } from "../../../../context/OrderContext";

const ClientOrderDetailViewModel = (order: Order) => {
  const [total, setTotal] = useState(0.0);
  const [responseMessage, setResponseMessage] = useState("");

  const { updateToOnTheWay } = useContext(OrderContext);

  const updateToOnTheWayOrder = async () => {
    const result = await updateToOnTheWay(order);
    setResponseMessage(result.message);
  };

  const getTotal = () => {
    order.products.forEach((p) =>
      setTotal(total + parseFloat(p.price) * p.quantity!)
    );
  };

  return {
    total,
    responseMessage,
    getTotal,
    updateToOnTheWayOrder
  };
};

export default ClientOrderDetailViewModel;
