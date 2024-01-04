import React, { useContext, useEffect, useState } from "react";
import { Address } from "../../../../../Domain/entities/Address";
import { GetByUserAddressUseCase } from "../../../../../Domain/useCases/address/GetByUserAddress";
import { UserContext } from "../../../../context/UserContext";
import { CreateOrderUseCase } from "../../../../../Domain/useCases/order/CreateOrder";
import { Order } from "../../../../../Domain/entities/Order";
import { ShoppingBagContext } from "../../../../context/ShoppingBagContext";

const ClientAddressListViewModel = () => {
  const [address, setAddress] = useState<Address[]>([]);
  const [checked, setChecked] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const { user, saveUserSession } = useContext(UserContext);
  const { shoppingBag } = useContext(ShoppingBagContext);

  useEffect(() => {
    if (user.address) {
      changeRadioValue(user.address!);
    }
    getAddress();
  }, [user]);

  const createOrder = async () => {
    const order: Order = {
      id_client: user.id!,
      id_address: user.address?.id!,
      products: shoppingBag
    };
    const result = await CreateOrderUseCase(order);
    setResponseMessage(result.message);
  };

  const changeRadioValue = (address: Address) => {
    setChecked(address.id!);
    user.address = address;
    saveUserSession(user);
  };

  const getAddress = async () => {
    const result = await GetByUserAddressUseCase(user.id!);
    setAddress(result);
  };

  return {
    address,
    checked,
    responseMessage,
    getAddress,
    changeRadioValue,
    createOrder
  };
};

export default ClientAddressListViewModel;
