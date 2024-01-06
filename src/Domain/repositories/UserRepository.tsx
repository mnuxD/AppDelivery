import { ImagePickerAsset } from "expo-image-picker";
import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { User } from "../entities/User";

export interface UserRepository {
  getDelivery(): Promise<User[]>;
  update(user: User): Promise<ResponseApiDelivery>;
  updateNotificationToken(
    id: string,
    token: string
  ): Promise<ResponseApiDelivery>;
  updateWithImage(
    user: User,
    file: ImagePickerAsset
  ): Promise<ResponseApiDelivery>;
}
