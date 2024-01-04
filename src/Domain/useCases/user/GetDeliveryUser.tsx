import { UserRepositoryImpl } from "../../../Data/repositories/UserRepository";

const { getDelivery } = new UserRepositoryImpl();

export const GetDeliveryUserUseCase = async () => {
  return await getDelivery();
};
