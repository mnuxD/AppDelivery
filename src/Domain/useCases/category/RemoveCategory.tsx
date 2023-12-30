import React from "react";
import { CategoryRepositoryImpl } from "../../../Data/repositories/CategoryRepository";

const { remove } = new CategoryRepositoryImpl();

export const RemoveCategoryUseCase = async (id: string) => {
  return await remove(id);
};
