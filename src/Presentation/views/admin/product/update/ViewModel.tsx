import React, { useContext, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Category } from "../../../../../Domain/entities/Category";
import { ProductContext } from "../../../../context/ProductContext";

const AdminProductProductViewModel = (category: Category) => {
  const [responseMessage, setResponseMessage] = useState("");
  const [file1, setFile1] = useState<ImagePicker.ImagePickerAsset>();
  const [file2, setFile2] = useState<ImagePicker.ImagePickerAsset>();
  const [file3, setFile3] = useState<ImagePicker.ImagePickerAsset>();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    image1: "",
    image2: "",
    image3: "",
    id_category: category.id
  });
  const { create } = useContext(ProductContext);
  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const createProduct = async () => {
    console.log(values);

    let files = [];
    files.push(file1!);
    files.push(file2!);
    files.push(file3!);

    if (isValidForm()) {
      setLoading(true);
      const response = await create(values, files);
      setLoading(false);
      setResponseMessage(response.message);
      if (response.success) resetForm();
    }
  };

  const pickImage = async (numberImage: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1
    });

    if (!result.canceled) {
      if (numberImage == 1) {
        onChange("image1", result.assets[0].uri);
        setFile1(result.assets[0]);
      } else if (numberImage == 2) {
        onChange("image2", result.assets[0].uri);
        setFile2(result.assets[0]);
      } else if (numberImage == 3) {
        onChange("image3", result.assets[0].uri);
        setFile3(result.assets[0]);
      }
    }
  };

  const takePhoto = async (numberImage: number) => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1
    });

    if (!result.canceled) {
      if (numberImage == 1) {
        onChange("image1", result.assets[0].uri);
        setFile1(result.assets[0]);
      } else if (numberImage == 2) {
        onChange("image2", result.assets[0].uri);
        setFile2(result.assets[0]);
      } else if (numberImage == 3) {
        onChange("image3", result.assets[0].uri);
        setFile3(result.assets[0]);
      }
    }
  };

  const isValidForm = (): boolean => {
    if (values.name === "") {
      setResponseMessage("Ingresa el nombre del producto");
      return false;
    }
    if (values.description === "") {
      setResponseMessage("Ingresa la descripción");
      return false;
    }
    if (values.price === "") {
      setResponseMessage("Ingresa el precio");
      return false;
    }
    if (values.image1 === "") {
      setResponseMessage("Ingresa la primera imagen");
      return false;
    }
    if (values.image2 === "") {
      setResponseMessage("Ingresa la segunda imagen");
      return false;
    }
    if (values.image3 === "") {
      setResponseMessage("Ingresa la tercera imagen");
      return false;
    }
    return true;
  };

  const resetForm = async () => {
    setValues({
      name: "",
      description: "",
      price: "",
      image1: "",
      image2: "",
      image3: "",
      id_category: category.id
    });
  };

  return {
    ...values,
    loading,
    responseMessage,
    onChange,
    takePhoto,
    pickImage,
    createProduct
  };
};

export default AdminProductProductViewModel;
