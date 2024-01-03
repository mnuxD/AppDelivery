import React, { useContext, useEffect, useState } from "react";
import { Address } from "../../../../../Domain/entities/Address";
import { GetByUserAddressUseCase } from "../../../../../Domain/useCases/address/GetByUserAddress";
import { UserContext } from "../../../../context/UserContext";

const ClientAddressListViewModel = () => {
  const [address, setAddress] = useState<Address[]>([]);
  const [checked, setChecked] = useState("");
  const { user, saveUserSession, getUserSession } = useContext(UserContext);

  useEffect(() => {
    if (user.address) {
      changeRadioValue(user.address!);
    }
    getAddress();
  }, [user]);

  const changeRadioValue = (address: Address) => {
    setChecked(address.id!);
    user.address = address;
    saveUserSession(user);
  };

  const getAddress = async () => {
    const result = await GetByUserAddressUseCase(user.id!);
    setAddress(result);
  };

  return { address, checked, getAddress, changeRadioValue };
};

export default ClientAddressListViewModel;
