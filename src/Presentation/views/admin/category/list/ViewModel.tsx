import React, { useContext, useState } from "react";
import { CategoryContext } from "../../../../context/CategoryContext";

const AdminCategoryListViewModel = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const { categories, remove, getCategories } = useContext(CategoryContext);

  const deleteCategory = async (idCategory: string) => {
    const result = await remove(idCategory);
    setResponseMessage(result.message);
  };
  return {
    categories,
    responseMessage,
    deleteCategory,
    getCategories
  };
};

export default AdminCategoryListViewModel;
