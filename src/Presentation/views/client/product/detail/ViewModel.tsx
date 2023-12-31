import React, { useContext, useEffect, useState } from "react";
import { Product } from "../../../../../Domain/entities/Product";
import { ShoppingBagContext } from "../../../../context/ShoppingBagContext";

const ClientProductDetailViewModel = (product: Product) => {
  const { shoppingBag, saveItem } = useContext(ShoppingBagContext);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0.0);

  const addToBag = () => {
    if (quantity > 0) {
      product.quantity = quantity;
      saveItem(product);
    }
  };

  console.log(shoppingBag);

  const addItem = () => {
    setQuantity(quantity + 1);
  };

  const removeItem = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  useEffect(() => {
    setPrice(quantity * parseFloat(product.price));
  }, [quantity]);

  useEffect(() => {
    const index = shoppingBag.findIndex((p) => p.id == product.id);
    if (index !== -1) {
      //existe en la bolsa
      setQuantity(shoppingBag[index].quantity!);
    }
  }, []);

  const productImages: string[] = [
    product.image1,
    product.image2,
    product.image3
  ];
  return {
    productImages,
    quantity,
    price,
    shoppingBag,
    addItem,
    removeItem,
    addToBag
  };
};

export default ClientProductDetailViewModel;
