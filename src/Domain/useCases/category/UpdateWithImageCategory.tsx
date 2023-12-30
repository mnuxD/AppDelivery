import React from "react";
import { CategoryRepositoryImpl } from "../../../Data/repositories/CategoryRepository";
import { Category } from "../../entities/Category";
import { ImagePickerAsset } from "expo-image-picker";

const { updateWithImage } = new CategoryRepositoryImpl();

export const UpdateWithImageCategoryUseCase = async (
  category: Category,
  file: ImagePickerAsset
) => {
  return await updateWithImage(category, file);
};
