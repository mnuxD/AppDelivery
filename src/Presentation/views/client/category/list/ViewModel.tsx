import React, { useState } from "react";
import { Category } from "../../../../../Domain/entities/Category";
import { getAllCategoryUseCase } from "../../../../../Domain/useCases/category/GetAllCategory";

const ClientCategoryListViewModel = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    const result = await getAllCategoryUseCase();
    setCategories(result);
  };

  return { categories, getCategories };
};

export default ClientCategoryListViewModel;
