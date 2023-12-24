import { ImagePickerAsset } from "expo-image-picker";
import { AuthRepositoryImplement } from "../../../Data/repositories/AuthRepository";
import { User } from "../../entities/User";

const { registerWithImage } = new AuthRepositoryImplement();

export const RegisterWithImageAuthUseCase = async (
  user: User,
  file: ImagePickerAsset
) => {
  return await registerWithImage(user, file);
};
