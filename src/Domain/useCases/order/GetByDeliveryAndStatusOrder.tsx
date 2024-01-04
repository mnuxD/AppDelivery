import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";

const { getByDeliveryAndStatus } = new OrderRepositoryImpl();

export const getByDeliveryAndStatusOrderUseCase = async (
  id_delivery: string,
  status: string
) => {
  return await getByDeliveryAndStatus(id_delivery, status);
};
