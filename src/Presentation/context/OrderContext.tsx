import { createContext, useState } from "react";
import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { Order } from "../../Domain/entities/Order";
import { getByStatusOrderUseCase } from "../../Domain/useCases/order/GetByStatusOrder";
import { UpdateToDispatchedOrderUseCase } from "../../Domain/useCases/order/UpdateToDispatchedOrder";

export interface OrderContextProps {
  ordersPayed: Order[];
  ordersDispatched: Order[];
  ordersOnTheWay: Order[];
  ordersDelivery: Order[];
  getOrderByStatus(status: string): Promise<void>;
  updateToDispatched(order: Order): Promise<ResponseApiDelivery>;
}

export const OrderContext = createContext({} as OrderContextProps);

export const OrderProvider = ({ children }: any) => {
  const [ordersPayed, setOrdersPayed] = useState<Order[]>([]);
  const [ordersDispatched, setOrdersDispatched] = useState<Order[]>([]);
  const [ordersOnTheWay, setOrdersOnTheWay] = useState<Order[]>([]);
  const [ordersDelivery, setOrdersDelivery] = useState<Order[]>([]);

  const getOrderByStatus = async (status: string) => {
    const result = await getByStatusOrderUseCase(status);
    switch (status) {
      case "PAGADO":
        setOrdersPayed(result);
        break;
      case "DESPACHADO":
        setOrdersDispatched(result);
        break;
      case "EN CAMINO":
        setOrdersOnTheWay(result);
        break;
      case "ENTREGADO":
        setOrdersDelivery(result);
        break;
      default:
        setOrdersPayed(result);
        break;
    }
  };

  const updateToDispatched = async (order: Order) => {
    const result = await UpdateToDispatchedOrderUseCase(order);
    await getOrderByStatus("PAGADO");
    await getOrderByStatus("DESPACHADO");
    return result;
  };

  return (
    <OrderContext.Provider
      value={{
        ordersPayed,
        ordersDelivery,
        ordersDispatched,
        ordersOnTheWay,
        getOrderByStatus,
        updateToDispatched
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
