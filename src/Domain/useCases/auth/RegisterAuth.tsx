import { AuthRepositoryImplement } from "../../../Data/repositories/AuthRepository";
import { User } from "../../entities/User";

const { register } = new AuthRepositoryImplement();

export const RegisterAuthUseCase = async (user: User) => {
  return await register(user);
};
