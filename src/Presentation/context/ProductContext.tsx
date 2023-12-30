import { ImagePickerAsset } from "expo-image-picker";
import { Product } from "../../Domain/entities/Product";
import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { createContext, useState } from "react";
import { CreateProductUseCase } from "../../Domain/useCases/product/CreateProduct";
import { GetProductsByCategoryUseCase } from "../../Domain/useCases/product/GetProductsByCategory";
import { RemoveProductUseCase } from "../../Domain/useCases/product/RemoveProduct";

export interface ProductContextProps {
  products: Product[];
  getProducts(idCategory: string): Promise<void>;
  create(
    product: Product,
    files: ImagePickerAsset[]
  ): Promise<ResponseApiDelivery>;
  remove(product: Product): Promise<ResponseApiDelivery>;
}

export const ProductContext = createContext({} as ProductContextProps);

export const ProductProvider = ({ children }: any) => {
  const [products, setProducts] = useState<Product[]>([]);

  const create = async (
    product: Product,
    files: ImagePickerAsset[]
  ): Promise<ResponseApiDelivery> => {
    const response = await CreateProductUseCase(product, files);
    getProducts(product.id_category!);
    return response;
  };

  const getProducts = async (idCategory: string): Promise<void> => {
    const result = await GetProductsByCategoryUseCase(idCategory);
    setProducts(result);
  };

  const remove = async (product: Product): Promise<ResponseApiDelivery> => {
    const response = await RemoveProductUseCase(product);
    getProducts(product.id_category!);
    return response;
  };

  return (
    <ProductContext.Provider value={{ products, getProducts, create, remove }}>
      {children}
    </ProductContext.Provider>
  );
};
