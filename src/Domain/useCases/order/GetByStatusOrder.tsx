import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";

const { getByStatus } = new OrderRepositoryImpl();

export const getByStatusOrderUseCase = async (status: string) => {
  return await getByStatus(status);
};
