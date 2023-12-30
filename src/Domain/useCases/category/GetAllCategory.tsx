import { CategoryRepositoryImpl } from "../../../Data/repositories/CategoryRepository";

const { getAll } = new CategoryRepositoryImpl();

export const getAllCategoryUseCase = async () => {
  return await getAll();
};
