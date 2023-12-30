import { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { RoundedButton } from "../../../components/RoundedButton";
import useViewModel from "./ViewModel";
import styles from "./Styles";
import { CustomTextInput } from "../../../components/CustomTextInput";
import { ModalPickImage } from "../../../components/ModalPickImage";
import { StackScreenProps } from "@react-navigation/stack";
import { MyColors, MyStyles } from "../../../theme/AppTheme";
import { RootStackParamList } from "../../../navigator/MainStackNavigator";

interface Props
  extends StackScreenProps<RootStackParamList, "ProfileUpdateScreen"> {}

export const ProfileUpdateScreen = ({ navigation, route }: Props) => {
  const { user } = route.params;
  const {
    name,
    lastname,
    phone,
    image,
    errorMessage,
    successMessage,
    loading,
    pickImage,
    takePhoto,
    onChange,
    onChangeInfoUpdate,
    update
  } = useViewModel(user);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (errorMessage != "") ToastAndroid.show(errorMessage, ToastAndroid.LONG);
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage != "")
      ToastAndroid.show(successMessage, ToastAndroid.LONG);
  }, [successMessage]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageBackground}
        source={require("../../../../../assets/city.jpg")}
      />

      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {image == "" ? (
            <Image style={styles.logoImage} source={{ uri: user?.image }} />
          ) : (
            <Image style={styles.logoImage} source={{ uri: image }} />
          )}
        </TouchableOpacity>

        <Text style={styles.logoText}>SELECIONA UNA IMAGEN</Text>
      </View>

      <View style={styles.form}>
        <ScrollView>
          <Text style={styles.formText}>Actualizar</Text>

          <CustomTextInput
            image={require("../../../../../assets/user.png")}
            placeholder="Nombres"
            property="name"
            value={name}
            onChangeText={onChange}
            autoCapitalize="words"
          />

          <CustomTextInput
            image={require("../../../../../assets/my_user.png")}
            placeholder="Apellidos"
            property="lastname"
            value={lastname}
            onChangeText={onChange}
            autoCapitalize="words"
          />

          <CustomTextInput
            image={require("../../../../../assets/phone.png")}
            placeholder="Teléfono"
            keyboardType="numeric"
            property="phone"
            value={phone}
            onChangeText={onChange}
          />

          <View style={{ marginTop: 30 }}>
            <RoundedButton text="CONFIRMAR" onPress={update} />
          </View>
        </ScrollView>
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
