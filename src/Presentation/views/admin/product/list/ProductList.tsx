import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { FlatList, Text, ToastAndroid, View } from "react-native";
import { ProductStackParamList } from "../../../../navigator/AdminProductNavigator";
import useViewModel from "./ViewModel";
import { AdminProductListItem } from "./Item";

interface Props
  extends StackScreenProps<ProductStackParamList, "AdminProductListScreen"> {}

export const AdminProductListScreen = ({ navigation, route }: Props) => {
  const { category } = route.params;
  const { products, responseMessage, getProducts, deleteProduct } =
    useViewModel();
  console.log("category", category);

  useEffect(() => {
    if (products.length == 0) getProducts(category.id!);
  }, []);

  useEffect(() => {
    if (responseMessage) ToastAndroid.show(responseMessage, ToastAndroid.LONG);
  }, [responseMessage]);
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <AdminProductListItem
            product={item}
            remove={() => {
              deleteProduct(item);
            }}
          />
        )}
      />
    </View>
  );
};
