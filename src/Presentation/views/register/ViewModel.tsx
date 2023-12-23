import React, { useState } from "react";
import { ApiDelivery } from "../../../Data/sources/remote/api/ApiDelivery";
import { RegisterAuthUseCase } from "../../../Domain/useCases/auth/RegisterAuth";
import * as ImagePicker from "expo-image-picker";

const RegisterViewModel = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    image: "",
    password: "",
    confirmPassword: "",
  });
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();

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
  const register = async () => {
    if (isValidForm()) {
      const response = await RegisterAuthUseCase(values);
      console.log("RESULT: " + JSON.stringify(response));
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
    if (values.email === "") {
      setErrorMessage("Ingresa tu email");
      return false;
    }
    if (values.phone === "") {
      setErrorMessage("Ingresa tu celular");
      return false;
    }
    if (values.password === "") {
      setErrorMessage("Ingresa tu contraseña");
      return false;
    }
    if (values.confirmPassword === "") {
      setErrorMessage("Ingresa denuevo la contraseña");
      return false;
    }
    if (values.password !== values.confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return false;
    }
    return true;
  };

  return { ...values, onChange, pickImage, takePhoto, register, errorMessage };
};

export default RegisterViewModel;
