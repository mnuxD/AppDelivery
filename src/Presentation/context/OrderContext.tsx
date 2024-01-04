import { createContext, useEffect, useState } from "react";
import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { Order } from "../../Domain/entities/Order";
import { getByStatusOrderUseCase } from "../../Domain/useCases/order/GetByStatusOrder";
import { UpdateToDispatchedOrderUseCase } from "../../Domain/useCases/order/UpdateToDispatchedOrder";
import { getByDeliveryAndStatusOrderUseCase } from "../../Domain/useCases/order/GetByDeliveryAndStatusOrder";
import { UpdateToOnTheWayOrderUseCase } from "../../Domain/useCases/order/UpdateToOnTheWayOrder";
import { UpdateToDeliveredUseCase } from "../../Domain/useCases/order/UpdateToDelivered";

export interface OrderContextProps {
  ordersPayed: Order[];
  ordersDispatched: Order[];
  ordersOnTheWay: Order[];
  ordersDelivery: Order[];
  getOrdersByStatus(status: string): Promise<void>;
  getOrdersByDeliveryAndStatus(
    id_delivery: string,
    status: string
  ): Promise<void>;
  updateToDispatched(order: Order): Promise<ResponseApiDelivery>;
  updateToOnTheWay(order: Order): Promise<ResponseApiDelivery>;
  updateToDelivered(order: Order): Promise<ResponseApiDelivery>;
}

export const OrderContext = createContext({} as OrderContextProps);

export const OrderProvider = ({ children }: any) => {
  const [ordersPayed, setOrdersPayed] = useState<Order[]>([]);
  const [ordersDispatched, setOrdersDispatched] = useState<Order[]>([]);
  const [ordersOnTheWay, setOrdersOnTheWay] = useState<Order[]>([]);
  const [ordersDelivery, setOrdersDelivery] = useState<Order[]>([]);

  useEffect(() => {
    setOrdersPayed([]);
    setOrdersDispatched([]);
    setOrdersOnTheWay([]);
    setOrdersDelivery([]);
  }, []);

  const getOrdersByStatus = async (status: string) => {
    const result = await getByStatusOrderUseCase(status);
    if (status === "PAGADO") setOrdersPayed(result);
    else if (status === "DESPACHADO") setOrdersDispatched(result);
    else if (status === "EN CAMINO") setOrdersOnTheWay(result);
    else if (status === "ENTREGADO") setOrdersDelivery(result);
  };

  const getOrdersByDeliveryAndStatus = async (
    id_delivery: string,
    status: string
  ) => {
    const result = await getByDeliveryAndStatusOrderUseCase(
      id_delivery,
      status
    );

    if (status === "PAGADO") setOrdersPayed(result);
    else if (status === "DESPACHADO") setOrdersDispatched(result);
    else if (status === "EN CAMINO") setOrdersOnTheWay(result);
    else if (status === "ENTREGADO") setOrdersDelivery(result);
  };

  const updateToDispatched = async (order: Order) => {
    const result = await UpdateToDispatchedOrderUseCase(order);
    await getOrdersByStatus("PAGADO");
    await getOrdersByStatus("DESPACHADO");
    return result;
  };

  const updateToOnTheWay = async (order: Order) => {
    const result = await UpdateToOnTheWayOrderUseCase(order);
    await getOrdersByDeliveryAndStatus(order.id_delivery!, "DESPACHADO");
    await getOrdersByDeliveryAndStatus(order.id_delivery!, "EN CAMINO");

    return result;
  };

  const updateToDelivered = async (order: Order) => {
    const result = await UpdateToDeliveredUseCase(order);
    await getOrdersByDeliveryAndStatus(order.id_delivery!, "EN CAMINO");
    await getOrdersByDeliveryAndStatus(order.id_delivery!, "ENTREGADO");

    return result;
  };

  return (
    <OrderContext.Provider
      value={{
        ordersPayed,
        ordersDelivery,
        ordersDispatched,
        ordersOnTheWay,
        getOrdersByStatus,
        getOrdersByDeliveryAndStatus,
        updateToDispatched,
        updateToOnTheWay,
        updateToDelivered
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
