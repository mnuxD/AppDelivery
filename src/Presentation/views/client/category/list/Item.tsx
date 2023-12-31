import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Category } from "../../../../../Domain/entities/Category";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { MyColors } from "../../../../theme/AppTheme";
interface Props {
  category: Category;
  height: number;
  width: number;
  navigation: StackNavigationProp<
    ClientStackParamList,
    "ClientCategoryListScreen",
    undefined
  >;
}

export const ClientCategoryItem = ({
  category,
  height,
  width,
  navigation
}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ClientProductListScreen", {
          idCategory: category.id!
        });
      }}
      style={{ ...styles.container, height: height, width: width }}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: category.image }} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{category.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    paddingBottom: 20,
    paddingHorizontal: 7
  },
  imageContainer: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: "white"
  },
  image: {
    flex: 1,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18
  },
  titleContainer: {
    height: 70,
    backgroundColor: "white",
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    //funciona en android
    elevation: 20,
    //funciona en IOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2
  },
  title: {
    color: "black",
    fontSize: 20
  }
});
