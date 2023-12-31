import { ImagePickerAsset } from "expo-image-picker";
import { Product } from "../entities/Product";
import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";

export interface ProductRepository {
  create(
    product: Product,
    files: ImagePickerAsset[]
  ): Promise<ResponseApiDelivery>;

  getProductsByCategory(idCategory: string): Promise<Product[]>;
  update(product: Product): Promise<ResponseApiDelivery>;
  updateWithImage(
    product: Product,
    files: ImagePickerAsset[]
  ): Promise<ResponseApiDelivery>;
  remove(product: Product): Promise<ResponseApiDelivery>;
}
