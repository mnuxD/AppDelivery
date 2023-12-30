import React, { useContext, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { CreateCategoryUseCase } from "../../../../../Domain/useCases/category/CreateCategory";
import { CategoryContext } from "../../../../context/CategoryContext";

const AdminCategoryCreateViewModel = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    description: "",
    image: ""
  });
  const { create } = useContext(CategoryContext);
  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const createCategory = async () => {
    if (isValidForm()) {
      setLoading(true);
      const response = await create(values, file!);
      setLoading(false);
      setResponseMessage(response.message);
      resetForm();
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1
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
      quality: 1
    });

    if (!result.canceled) {
      onChange("image", result.assets[0].uri);
      setFile(result.assets[0]);
    }
  };

  const isValidForm = (): boolean => {
    if (values.name === "") {
      setResponseMessage("Ingresa el nombre de la categoría");
      return false;
    }
    if (values.description === "") {
      setResponseMessage("Ingresa la descripción");
      return false;
    }
    if (values.image === "") {
      setResponseMessage("Ingresa la imagen");
      return false;
    }
    return true;
  };

  const resetForm = async () => {
    setValues({
      name: "",
      description: "",
      image: ""
    });
  };

  return {
    ...values,
    loading,
    responseMessage,
    onChange,
    takePhoto,
    pickImage,
    createCategory
  };
};

export default AdminCategoryCreateViewModel;
