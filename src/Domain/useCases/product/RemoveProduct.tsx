import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";

const { remove } = new ProductRepositoryImpl();

export const RemoveProductUseCase = async (product: Product) => {
  return await remove(product);
};
