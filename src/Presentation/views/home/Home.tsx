import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { RoundedButton } from "../../components/RoundedButton";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App";
import useViewModel from "./ViewModel";
import styles from "./Styles";
import { CustomTextInput } from "../../components/CustomTextInput";

interface Props extends StackScreenProps<RootStackParamList, "HomeScreen"> {}

export const HomeScreen = ({ navigation, route }: Props) => {
  const { email, password, user, errorMessage, onChange, login } =
    useViewModel();

  useEffect(() => {
    if (errorMessage !== "") {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (user?.id) {
      if (user.roles?.length! > 1) navigation.replace("RolesScreen");
      else navigation.replace("ClientTabsNavigator");
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageBackground}
        source={require("../../../../assets/chef.jpg")}
      />

      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={require("../../../../assets/logo.png")}
        />
        <Text style={styles.logoText}>FOOD APP</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.formText}>INGRESAR</Text>

        <CustomTextInput
          image={require("../../../../assets/email.png")}
          placeholder="Correo Electrónico"
          keyboardType="email-address"
          property="email"
          value={email}
          onChangeText={onChange}
          autoCapitalize="none"
        />

        <CustomTextInput
          image={require("../../../../assets/password.png")}
          placeholder="Contraseña"
          keyboardType="default"
          secureTextEntry={true}
          property="password"
          value={password}
          onChangeText={onChange}
          autoCapitalize="none"
        />

        <View style={{ marginTop: 30 }}>
          <RoundedButton text="ENTRAR" onPress={() => login()} />
        </View>

        <View style={styles.formRegister}>
          <Text>¿No tienes una cuenta? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.formRegisterText}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
