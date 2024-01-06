import React, { useContext, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Category } from "../../../../../Domain/entities/Category";
import { ResponseApiDelivery } from "../../../../../Data/sources/remote/models/ResponseApiDelivery";
import { CategoryContext } from "../../../../context/CategoryContext";

const AdminCategoryUpdateViewModel = (category: Category) => {
  const [responseMessage, setResponseMessage] = useState("");
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(category);
  const { update, updateWithImage } = useContext(CategoryContext);
  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const updateCategory = async () => {
    if (isValidForm()) {
      setLoading(true);
      let response = {} as ResponseApiDelivery;
      if (values.image?.includes("https://")) {
        //no actualizo imagen
        response = await update(values);
      } else {
        response = await updateWithImage(values, file!);
      }

      setLoading(false);
      if (response.success) {
        setResponseMessage(response.message);
      } else {
        setResponseMessage(response.message);
      }
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

  return {
    ...values,
    loading,
    responseMessage,
    onChange,
    takePhoto,
    pickImage,
    updateCategory
  };
};

export default AdminCategoryUpdateViewModel;
