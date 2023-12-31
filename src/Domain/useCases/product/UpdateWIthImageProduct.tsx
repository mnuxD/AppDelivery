import React from "react";
import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";
import { ImagePickerAsset } from "expo-image-picker";

const { updateWithImage } = new ProductRepositoryImpl();

export const UpdateWithImageProductUseCase = async (
  product: Product,
  files: ImagePickerAsset[]
) => {
  return await updateWithImage(product, files);
};
