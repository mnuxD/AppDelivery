import { ImagePickerAsset } from "expo-image-picker";
import { Category } from "../../Domain/entities/Category";
import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { createContext, useEffect, useState } from "react";
import { getAllCategoryUseCase } from "../../Domain/useCases/category/GetAllCategory";
import { CreateCategoryUseCase } from "../../Domain/useCases/category/CreateCategory";
import { UpdateCategoryUseCase } from "../../Domain/useCases/category/UpdateCategory";
import { UpdateWithImageCategoryUseCase } from "../../Domain/useCases/category/UpdateWithImageCategory";
import { RemoveCategoryUseCase } from "../../Domain/useCases/category/RemoveCategory";

export interface CategoryContextProps {
  categories: Category[];
  getCategories(): Promise<void>;
  create(
    category: Category,
    file: ImagePickerAsset
  ): Promise<ResponseApiDelivery>;
  updateWithImage(
    category: Category,
    file: ImagePickerAsset
  ): Promise<ResponseApiDelivery>;
  update(category: Category): Promise<ResponseApiDelivery>;
  remove(id: string): Promise<ResponseApiDelivery>;
}

export const CategoryContext = createContext({} as CategoryContextProps);

export const CategoryProvider = ({ children }: any) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async (): Promise<void> => {
    const result = await getAllCategoryUseCase();
    setCategories(result);
  };

  const create = async (
    category: Category,
    file: ImagePickerAsset
  ): Promise<ResponseApiDelivery> => {
    const response = await CreateCategoryUseCase(category, file!);
    getCategories();
    return response;
  };

  const update = async (category: Category): Promise<ResponseApiDelivery> => {
    const response = await UpdateCategoryUseCase(category);
    getCategories();
    return response;
  };

  const updateWithImage = async (
    category: Category,
    file: ImagePickerAsset
  ): Promise<ResponseApiDelivery> => {
    const response = await UpdateWithImageCategoryUseCase(category, file!);
    getCategories();
    return response;
  };

  const remove = async (id: string): Promise<ResponseApiDelivery> => {
    const response = await RemoveCategoryUseCase(id);
    getCategories();
    return response;
  };

  useEffect(() => {
    if (categories.length === 0) getCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        getCategories,
        create,
        update,
        updateWithImage,
        remove
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
