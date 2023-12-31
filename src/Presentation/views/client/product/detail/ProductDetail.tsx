import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import styles from "./Styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import useViewModel from "./ViewModel";
import { RoundedButton } from "../../../../components/RoundedButton";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientProductDetailScreen"> {}

export const ClientProductDetailScreen = ({ navigation, route }: Props) => {
  const { product } = route.params;
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const {
    productImages,
    quantity,
    price,
    shoppingBag,
    addItem,
    removeItem,
    addToBag
  } = useViewModel(product);

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <Carousel
          loop={true}
          width={width}
          height={height}
          autoPlay={true}
          data={productImages}
          scrollAnimationDuration={1000}
          autoPlayInterval={10000}
          // onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.productImage} />
          )}
        />
      </GestureHandlerRootView>

      <View style={styles.productDetail}>
        <View style={styles.productInfo}>
          {/* Name */}
          <Text style={styles.name}>{product.name}</Text>
          <View style={styles.divider} />

          {/* Description */}
          <Text style={styles.subtitle}>Descripción:</Text>
          <Text style={styles.content}>{product.description}</Text>
          <View style={styles.divider} />

          {/* Price */}
          <Text style={styles.subtitle}>Precio:</Text>
          <Text style={styles.content}>S/. {product.price}</Text>
          <View style={styles.divider} />

          {/* Order */}
          <Text style={styles.subtitle}>Tu orden:</Text>
          <Text style={styles.content}>Cantidad: {quantity}</Text>
          <Text style={styles.content}>Precio total: S:/ {price}</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.productActions}>
          <TouchableOpacity style={styles.actionLess} onPress={removeItem}>
            <Text style={styles.actionText}>-</Text>
          </TouchableOpacity>
          <View style={styles.quantity}>
            <Text style={styles.actionText}>{quantity}</Text>
          </View>
          <TouchableOpacity style={styles.actionAdd} onPress={addItem}>
            <Text style={styles.actionText}>+</Text>
          </TouchableOpacity>
          <View style={styles.buttonAdd}>
            <RoundedButton text="AGREGAR A LA BOLSA" onPress={addToBag} />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.back} onPress={() => navigation.pop()}>
        <Image
          style={styles.backImage}
          source={require("../../../../../../assets/back.png")}
        />
      </TouchableOpacity>
    </View>
  );
};
