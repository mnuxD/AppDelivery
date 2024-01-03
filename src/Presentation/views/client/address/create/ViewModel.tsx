import React, { useContext, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { CreateCategoryUseCase } from "../../../../../Domain/useCases/category/CreateCategory";
import { CategoryContext } from "../../../../context/CategoryContext";
import { UserContext } from "../../../../context/UserContext";
import { CreateAddressUseCase } from "../../../../../Domain/useCases/address/CreateAddress";

const ClientAddressCreateViewModel = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    address: "",
    neighborhood: "",
    refPoint: "",
    lat: 0.0,
    lng: 0.0,
    id_user: ""
  });
  const { user, saveUserSession, getUserSession } = useContext(UserContext);
  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const onChangeRefPoint = (refPoint: string, lat: number, lng: number) => {
    setValues({ ...values, refPoint, lat, lng });
  };

  const createAddress = async () => {
    if (isValidForm()) {
      setLoading(true);
      const response = await CreateAddressUseCase(values);
      setLoading(false);
      setResponseMessage(response.message);
      if (response.success) {
        resetForm();
        user.address = values;
        user.address.id = response.data; //agregar el id que retorna del endpoint
        await saveUserSession(user);
        getUserSession();
      }
    }
  };

  const isValidForm = (): boolean => {
    if (values.address === "") {
      setResponseMessage("Ingresa nombre de la dirección");
      return false;
    }
    if (values.neighborhood === "") {
      setResponseMessage("Ingresa el barrio");
      return false;
    }
    if (!values.lat || !values.lng) {
      setResponseMessage("Ingresa la dirección fisica");
      return false;
    }
    return true;
  };

  const resetForm = async () => {
    setValues({
      address: "",
      neighborhood: "",
      refPoint: "",
      lat: 0.0,
      lng: 0.0,
      id_user: user.id!
    });
  };

  useEffect(() => {
    if (user) onChange("id_user", user.id);
  }, [user]);

  return {
    ...values,
    loading,
    responseMessage,
    onChange,
    onChangeRefPoint,
    createAddress
  };
};

export default ClientAddressCreateViewModel;
