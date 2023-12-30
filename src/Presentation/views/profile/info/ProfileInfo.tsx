import React, { useEffect } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import useViewModel from "./ViewModel";
import { RoundedButton } from "../../../components/RoundedButton";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import styles from "./Styles";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigator/MainStackNavigator";

export const ProfileInfoScreen = () => {
  const { removeUserSession, user } = useViewModel();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  console.log("user", user);

  useEffect(() => {
    if (!user.id) {
      navigation.replace("HomeScreen");
    }
  }, [user]);
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageBackground}
        source={require("../../../../../assets/proflle_background.png")}
      />
      <TouchableOpacity
        style={styles.logout}
        onPress={() => {
          removeUserSession();
        }}
      >
        <Image
          style={styles.logoutImage}
          source={require("../../../../../assets/logout.png")}
        />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        {user.image && (
          <Image style={styles.logoImage} source={{ uri: user?.image }} />
        )}
      </View>

      <View style={styles.form}>
        <View style={styles.formInfo}>
          <Image
            source={require("../../../../../assets/user.png")}
            style={styles.formImage}
          />
          <View style={styles.formContent}>
            <Text>
              {user?.name} {user?.lastname}
            </Text>
            <Text style={styles.formTextDescription}>Nombre del usuario </Text>
          </View>
        </View>

        <View style={styles.formInfo}>
          <Image
            source={require("../../../../../assets/email.png")}
            style={styles.formImage}
          />
          <View style={styles.formContent}>
            <Text>{user?.email}</Text>
            <Text style={styles.formTextDescription}>Correo Electrónico</Text>
          </View>
        </View>

        <View style={styles.formInfo}>
          <Image
            source={require("../../../../../assets/phone.png")}
            style={styles.formImage}
          />
          <View style={styles.formContent}>
            <Text>{user?.phone}</Text>
            <Text style={styles.formTextDescription}>Teléfono </Text>
          </View>
        </View>

        <RoundedButton
          text="Actualizar información"
          onPress={() => {
            navigation.navigate("ProfileUpdateScreen", { user: user! });
          }}
        />
      </View>
    </View>
  );
};
