import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from "react-native";
import styles from "./Styles";
import { CustomTextInput } from "../../../../components/CustomTextInput";
import useViewModel from "./ViewModel";
import { RoundedButton } from "../../../../components/RoundedButton";
import { ModalPickImage } from "../../../../components/ModalPickImage";
import { MyColors, MyStyles } from "../../../../theme/AppTheme";
import { StackScreenProps } from "@react-navigation/stack";
import { CategoryStackParamList } from "../../../../navigator/AdminCategoryNavigator";

interface Props
  extends StackScreenProps<
    CategoryStackParamList,
    "AdminCategoryUpdateScreen"
  > {}

export const AdminCategoryUpdateScreen = ({ navigation, route }: Props) => {
  const { category } = route.params;
  const {
    name,
    description,
    image,
    responseMessage,
    loading,
    onChange,
    takePhoto,
    pickImage,
    updateCategory
  } = useViewModel(category);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (responseMessage) ToastAndroid.show(responseMessage, ToastAndroid.LONG);
  }, [responseMessage]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => setModalVisible(true)}
      >
        {image == "" ? (
          <Image
            source={require("../../../../../../assets/image_new.png")}
            style={styles.image}
          />
        ) : (
          <Image style={styles.image} source={{ uri: image }} />
        )}
      </TouchableOpacity>
      <View style={styles.form}>
        <CustomTextInput
          placeholder="Nombre de la categoría"
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
      </View>
      <View style={styles.buttonContainer}>
        <RoundedButton
          text="ACTUALIZAR CATEGORíA"
          onPress={() => {
            updateCategory();
          }}
        />
      </View>

      <ModalPickImage
        openGalery={pickImage}
        openCamera={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
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
