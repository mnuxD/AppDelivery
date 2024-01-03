import React, { useContext, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Category } from "../../../../../Domain/entities/Category";
import { ProductContext } from "../../../../context/ProductContext";
import { Product } from "../../../../../Domain/entities/Product";
import { ResponseApiDelivery } from "../../../../../Data/sources/remote/models/ResponseApiDelivery";

const AdminProductProductViewModel = (product: Product, category: Category) => {
  const [responseMessage, setResponseMessage] = useState("");
  const [file1, setFile1] = useState<ImagePicker.ImagePickerAsset>();
  const [file2, setFile2] = useState<ImagePicker.ImagePickerAsset>();
  const [file3, setFile3] = useState<ImagePicker.ImagePickerAsset>();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(product);
  const { update, updateWithImage } = useContext(ProductContext);
  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const updateProduct = async () => {
    let files = [];
    files.push(file1!);
    files.push(file2!);
    files.push(file3!);

    if (isValidForm()) {
      setLoading(true);
      let response = {} as ResponseApiDelivery;
      if (
        values.image1.includes("https://") &&
        values.image2.includes("https://") &&
        values.image3.includes("https://")
      ) {
        response = await update(values);
      } else {
        response = await updateWithImage(values, files);
      }

      setLoading(false);
      setResponseMessage(response.message);
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

  return {
    ...values,
    loading,
    responseMessage,
    onChange,
    takePhoto,
    pickImage,
    updateProduct
  };
};

export default AdminProductProductViewModel;
