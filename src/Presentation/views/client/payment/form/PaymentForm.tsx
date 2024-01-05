import React from "react";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  Text,
  View
} from "react-native";
import styles from "./Styles";
import useViewModel from "./ViewModel";
import CreditCard from "react-native-credit-card-form-ui";
import { RoundedButton } from "../../../../components/RoundedButton";

export const ClientPaymentFormScreen = () => {
  const { creditCardRef, handleSubmit } = useViewModel();
  const onValidStateChange = () => {
    return null;
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={20}
        style={styles.form}
      >
        <CreditCard
          ref={creditCardRef}
          onValidStateChange={onValidStateChange}
          background="#E2E2E2"
          textColor="black"
          placeholderTextColor="gray"
          labels={{
            holder: "Titular",
            cvv: "Código de Seguridad",
            expiration: "Vence fin de"
          }}
          placeholders={{
            cvv: "000",
            number: "0000 0000 0000 0000",
            holder: "NOMBRE DEL TITULAR",
            expiration: "MM/YY"
          }}
        />
      </KeyboardAvoidingView>
      <View style={styles.button}>
        <RoundedButton text="Continuar" onPress={handleSubmit} />
      </View>
    </View>
  );
};
