import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from "react-native";
import styles from "./Styles";
import { CustomTextInput } from "../../../../components/CustomTextInput";
import useViewModel from "./ViewModel";
import { RoundedButton } from "../../../../components/RoundedButton";
import { ModalPickMultipleImage } from "../../../../components/ModalPickMultipleImage";
import { MyColors, MyStyles } from "../../../../theme/AppTheme";
import { StackScreenProps } from "@react-navigation/stack";
import { ProductStackParamList } from "../../../../navigator/AdminProductNavigator";

interface Props
  extends StackScreenProps<ProductStackParamList, "AdminProductCreateScreen"> {}

export const AdminProductCreateScreen = ({ navigation, route }: Props) => {
  const { category } = route.params;

  const {
    name,
    description,
    image1,
    image2,
    image3,
    price,
    responseMessage,
    loading,
    onChange,
    takePhoto,
    pickImage,
    createProduct
  } = useViewModel(category);
  const [modalVisible, setModalVisible] = useState(false);
  const [numberImage, setNumberImage] = useState(1);

  useEffect(() => {
    if (responseMessage) ToastAndroid.show(responseMessage, ToastAndroid.LONG);
  }, [responseMessage]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={() => {
            setNumberImage(1);
            setModalVisible(true);
          }}
        >
          {image1 == "" ? (
            <Image
              source={require("../../../../../../assets/image_new.png")}
              style={styles.image}
            />
          ) : (
            <Image style={styles.image} source={{ uri: image1 }} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setNumberImage(2);
            setModalVisible(true);
          }}
        >
          {image2 == "" ? (
            <Image
              source={require("../../../../../../assets/image_new.png")}
              style={styles.image}
            />
          ) : (
            <Image style={styles.image} source={{ uri: image2 }} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setNumberImage(3);
            setModalVisible(true);
          }}
        >
          {image3 == "" ? (
            <Image
              source={require("../../../../../../assets/image_new.png")}
              style={styles.image}
            />
          ) : (
            <Image style={styles.image} source={{ uri: image3 }} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <ScrollView>
          <View style={styles.categoryInfo}>
            <Image
              style={styles.imageCategory}
              source={require("../../../../../../assets/menu.png")}
            />
            <Text style={styles.textCategory}>Categoría Seleccionada</Text>
            <Text>{category.name}</Text>
          </View>
          <CustomTextInput
            placeholder="Nombre del producto"
            image={require("../../../../../../assets/categories.png")}
            value={name}
            onChangeText={onChange}
            property="name"
          />
          <CustomTextInput
            placeholder="Descripción"
            image={require("../../../../../../assets/description.png")}
            value={description}
            onChangeText={onChange}
            property="description"
          />
          <CustomTextInput
            placeholder="Precio"
            keyboardType="numeric"
            image={require("../../../../../../assets/price.png")}
            value={price}
            onChangeText={onChange}
            property="price"
          />
          <View style={styles.buttonContainer}>
            <RoundedButton
              text="CREAR PRODUCTO"
              onPress={() => {
                createProduct();
              }}
            />
          </View>
        </ScrollView>
      </View>

      <ModalPickMultipleImage
        openGalery={pickImage}
        openCamera={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
        numberImage={numberImage}
      />
      {loading && (
        <ActivityIndicator
          style={MyStyles.loading}
          size="large"
          color={MyColors.primary}
        />
      )}
    </View>
  );
};
