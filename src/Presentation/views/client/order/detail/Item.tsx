import React from "react";
import { Product } from "../../../../../Domain/entities/Product";
import { Image, StyleSheet, Text, View } from "react-native";

interface Props {
  product: Product;
}

export const OrderDetailItem = ({ product }: Props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: product.image1 }} />
      <View style={styles.productInfo}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.quantity}>Cantidad: {product.quantity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 20,
    alignItems: "center"
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 15
  },
  productInfo: {
    marginLeft: 15
  },
  name: {
    fontWeight: "bold"
  },
  quantity: {
    fontSize: 13,
    marginTop: 2
  }
});
