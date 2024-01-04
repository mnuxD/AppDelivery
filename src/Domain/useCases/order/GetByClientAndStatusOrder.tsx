import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";

const { getByClientAndStatus } = new OrderRepositoryImpl();

export const getByClientAndStatusOrderUseCase = async (
  id_client: string,
  status: string
) => {
  return await getByClientAndStatus(id_client, status);
};
