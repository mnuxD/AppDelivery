import React, { useEffect } from "react";
import { FlatList, Text, ToastAndroid, View } from "react-native";
import useViewModel from "./ViewModel";
import { AdminCategoryListItem } from "./Item";

export const AdminCategoryListScreen = () => {
  const { categories, deleteCategory, getCategories, responseMessage } =
    useViewModel();

  useEffect(() => {
    if (responseMessage) ToastAndroid.show(responseMessage, ToastAndroid.LONG);
  }, [responseMessage]);
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <AdminCategoryListItem category={item} remove={deleteCategory} />
        )}
      />
    </View>
  );
};
