import React, { useContext } from "react";
import { ShoppingBagContext } from "../../../context/ShoppingBagContext";
import { Product } from "../../../../Domain/entities/Product";

const ClientShoppingBagViewMode = () => {
  const { shoppingBag, total, saveItem, deleteItem } =
    useContext(ShoppingBagContext);

  const addItem = async (product: Product) => {
    product.quantity = product.quantity! + 1;
    await saveItem(product);
  };

  const subtractItem = async (product: Product) => {
    if (product.quantity! > 0) product.quantity = product.quantity! - 1;
    await saveItem(product);
  };

  return { shoppingBag, total, addItem, subtractItem, deleteItem };
};

export default ClientShoppingBagViewMode;
