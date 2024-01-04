import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";
import { Order } from "../../entities/Order";

const { getByStatus } = new OrderRepositoryImpl();

export const getByStatusOrderUseCase = async (status: string) => {
  return await getByStatus(status);
};
