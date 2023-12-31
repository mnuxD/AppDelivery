import React, { useEffect, useState } from "react";
import { Product } from "../../../../../Domain/entities/Product";

const ClientProductDetailViewModel = (product: Product) => {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0.0);

  const addItem = () => {
    setQuantity(quantity + 1);
  };

  const removeItem = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  useEffect(() => {
    setPrice(quantity * parseFloat(product.price));
  }, [quantity]);

  const productImages: string[] = [
    product.image1,
    product.image2,
    product.image3
  ];
  return { productImages, quantity, price, addItem, removeItem };
};

export default ClientProductDetailViewModel;
