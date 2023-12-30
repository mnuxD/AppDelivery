import React from "react";
import {
  Image,
  KeyboardType,
  StyleSheet,
  TextInput,
  TextInputProps,
  View
} from "react-native";

interface Props {
  image: any;
  placeholder?: string;
  value: any;
  keyboardType?: KeyboardType;
  secureTextEntry?: boolean;
  property: string;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  onChangeText: (property: string, value: any) => void;
}

export const CustomTextInput = ({
  image,
  placeholder = "",
  value,
  keyboardType = "default",
  secureTextEntry = false,
  property,
  autoCapitalize = "sentences",
  onChangeText
}: Props) => {
  return (
    <View style={styles.formInput}>
      <Image style={styles.formIcon} source={image} />
      <TextInput
        style={styles.formTextInput}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(text) => onChangeText(property, text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formInput: {
    flexDirection: "row",
    marginTop: 30,
    gap: 15,
    alignItems: "center"
  },
  formIcon: {
    width: 25,
    height: 25
  },
  formTextInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#AAAAAA"
  }
});
