import React, { useContext, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { UpdateUserUseCase } from "../../../../Domain/useCases/user/UpdateUser";
import { User } from "../../../../Domain/entities/User";
import { UpdateWithImageUserUseCase } from "../../../../Domain/useCases/user/UpdateWithImageUser";
import { ResponseApiDelivery } from "../../../../Data/sources/remote/models/ResponseApiDelivery";
import { UserContext } from "../../../context/UserContext";

const ProfileUpdateViewModel = (user: User) => {
  // pasamos user como parametro para ponerlo en values y poder cambiar su valor
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [values, setValues] = useState(user);
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();
  const [loading, setLoading] = useState(false);
  const { saveUserSession } = useContext(UserContext);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onChange("image", result.assets[0].uri);
      setFile(result.assets[0]);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onChange("image", result.assets[0].uri);
      setFile(result.assets[0]);
    }
  };

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const onChangeInfoUpdate = (
    name: string,
    lastname: string,
    phone: string
  ) => {
    setValues({ ...values, name, lastname, phone });
  };

  const update = async () => {
    if (isValidForm()) {
      setLoading(true);
      let response = {} as ResponseApiDelivery;
      if (values.image?.includes("https://")) {
        //no actualizo imagen
        response = await UpdateUserUseCase(values);
      } else {
        response = await UpdateWithImageUserUseCase(values, file!);
      }

      setLoading(false);
      console.log("RESULT: " + JSON.stringify(response));
      if (response.success) {
        saveUserSession(response.data);
        setSuccessMessage(response.message);
      } else {
        setErrorMessage(response.message);
      }
    }
  };

  const isValidForm = (): boolean => {
    if (values.name === "") {
      setErrorMessage("Ingresa tus nombres");
      return false;
    }
    if (values.lastname === "") {
      setErrorMessage("Ingresa tus apellidos");
      return false;
    }

    if (values.phone === "") {
      setErrorMessage("Ingresa tu celular");
      return false;
    }

    return true;
  };

  return {
    ...values,
    loading,
    user,
    onChange,
    onChangeInfoUpdate,
    pickImage,
    takePhoto,
    update,
    errorMessage,
    successMessage,
  };
};

export default ProfileUpdateViewModel;
