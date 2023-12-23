import { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { RoundedButton } from "../../components/RoundedButton";
import useViewModel from "./ViewModel";
import styles from "./Styles";
import { CustomTextInput } from "../../components/CustomTextInput";
import { ModalPickImage } from "../../components/ModalPickImage";

export const RegisterScreen = () => {
  const {
    name,
    lastname,
    email,
    phone,
    image,
    password,
    confirmPassword,
    errorMessage,
    pickImage,
    takePhoto,
    onChange,
    register,
  } = useViewModel();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (errorMessage != "") ToastAndroid.show(errorMessage, ToastAndroid.LONG);
  }, [errorMessage]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageBackground}
        source={require("../../../../assets/chef.jpg")}
      />

      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {image == "" ? (
            <Image
              style={styles.logoImage}
              source={require("../../../../assets/user_image.png")}
            />
          ) : (
            <Image style={styles.logoImage} source={{ uri: image }} />
          )}
        </TouchableOpacity>

        <Text style={styles.logoText}>SELECIONA UNA IMAGEN</Text>
      </View>

      <View style={styles.form}>
        <ScrollView>
          <Text style={styles.formText}>REGISTRARSE</Text>

          <CustomTextInput
            image={require("../../../../assets/user.png")}
            placeholder="Nombres"
            property="name"
            value={name}
            onChangeText={onChange}
            autoCapitalize="words"
          />

          <CustomTextInput
            image={require("../../../../assets/my_user.png")}
            placeholder="Apellidos"
            property="lastname"
            value={lastname}
            onChangeText={onChange}
            autoCapitalize="words"
          />

          <CustomTextInput
            image={require("../../../../assets/email.png")}
            placeholder="Correo Electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            property="email"
            value={email}
            onChangeText={onChange}
          />

          <CustomTextInput
            image={require("../../../../assets/phone.png")}
            placeholder="Teléfono"
            keyboardType="numeric"
            property="phone"
            value={phone}
            onChangeText={onChange}
          />

          <CustomTextInput
            image={require("../../../../assets/password.png")}
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry={true}
            property="password"
            value={password}
            onChangeText={onChange}
          />

          <CustomTextInput
            image={require("../../../../assets/confirm_password.png")}
            placeholder="Confirmar Contraseña"
            autoCapitalize="none"
            secureTextEntry={true}
            property="confirmPassword"
            value={confirmPassword}
            onChangeText={onChange}
          />

          <View style={{ marginTop: 30 }}>
            <RoundedButton text="CONFIRMAR" onPress={register} />
          </View>
        </ScrollView>
      </View>
      <ModalPickImage
        openGalery={pickImage}
        openCamera={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
      />
    </View>
  );
};
