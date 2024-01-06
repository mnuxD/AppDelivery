import React, { useEffect } from "react";
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
import DropDownPicker from "react-native-dropdown-picker";
import { CustomTextInput } from "../../../../components/CustomTextInput";

export const ClientPaymentFormScreen = () => {
  const {
    open,
    value,
    items,
    creditCardRef,
    identificationNumber,
    identificationTypeList,
    onChange,
    setOpen,
    setValue,
    setItems,
    handleSubmit,
    getIdentificationTypes
  } = useViewModel();

  useEffect(() => {
    getIdentificationTypes();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <CreditCard
          ref={creditCardRef}
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
      </View>
      <View style={styles.dropdown}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />

        <CustomTextInput
          placeholder="Número de documento"
          onChangeText={onChange}
          value={identificationNumber}
          property="identificationNumber"
          image={require("../../../../../../assets/document.png")}
        />
      </View>

      <View style={styles.button}>
        <RoundedButton text="Continuar" onPress={handleSubmit} />
      </View>
    </View>
  );
};
