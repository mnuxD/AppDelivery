import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { Order } from "../entities/Order";

export interface OrderRepository {
  create(order: Order): Promise<ResponseApiDelivery>;
  getByStatus(status: string): Promise<Order[]>;
  getByDeliveryAndStatus(id_delivery: string, status: string): Promise<Order[]>;
  updateToDispatched(order: Order): Promise<ResponseApiDelivery>;
  updateToOnTheWay(order: Order): Promise<ResponseApiDelivery>;
  updateToDelivered(order: Order): Promise<ResponseApiDelivery>;
}
