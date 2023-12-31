import { createContext, useEffect, useState } from "react";
import { Product } from "../../Domain/entities/Product";
import { GetShoppingBagUseCase } from "../../Domain/useCases/shoppingBag/GetShoppingBag";
import { SaveShoppingBagUseCase } from "../../Domain/useCases/shoppingBag/SaveShoppingBag";

export interface ShoppingBagContextProps {
  shoppingBag: Product[];
  total: number;
  getTotal(): Promise<void>;
  getShoppinBag(): Promise<void>;
  saveItem(product: Product): Promise<void>;
  deleteItem(product: Product): Promise<void>;
}

export const ShoppingBagContext = createContext({} as ShoppingBagContextProps);

export const ShoppingBagProvider = ({ children }: any) => {
  const [shoppingBag, setShoppingBag] = useState<Product[]>([]);
  const [total, setTotal] = useState(0.0);

  const getShoppinBag = async (): Promise<void> => {
    const result = await GetShoppingBagUseCase();
    setShoppingBag(result);
  };

  const getTotal = async (): Promise<void> => {
    setTotal(0);
    let totalPrice = 0;
    shoppingBag.forEach((product) => {
      totalPrice = totalPrice + product.quantity! * parseFloat(product.price);
    });
    setTotal(totalPrice);
  };

  const saveItem = async (product: Product): Promise<void> => {
    const index = shoppingBag.findIndex((p) => p.id == product.id);
    if (index == -1) {
      //Producto no encontrado => insertarlo a la bolsa
      shoppingBag.push(product);
    } else {
      //Producto ya ha sido agregado => editar la cantidad seleccionada
      shoppingBag[index].quantity = product.quantity;
    }
    await SaveShoppingBagUseCase(shoppingBag);
    getShoppinBag();
  };

  const deleteItem = async (product: Product): Promise<void> => {
    const index = shoppingBag.findIndex((p) => p.id == product.id);
    shoppingBag.splice(index, 1);
    await SaveShoppingBagUseCase(shoppingBag);
    getShoppinBag();
  };

  useEffect(() => {
    getShoppinBag();
  }, []);

  useEffect(() => {
    getTotal();
  }, [shoppingBag]);

  return (
    <ShoppingBagContext.Provider
      value={{
        shoppingBag,
        total,
        getShoppinBag,
        getTotal,
        saveItem,
        deleteItem
      }}
    >
      {children}
    </ShoppingBagContext.Provider>
  );
};
