import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { RoundedButton } from "./RoundedButton";

interface Props {
  openGalery: (numberImage: number) => void;
  openCamera: (numberImage: number) => void;
  numberImage: number;
  modalUseState: boolean;
  setModalUseState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalPickMultipleImage = ({
  openCamera,
  openGalery,
  numberImage,
  setModalUseState,
  modalUseState
}: Props) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalUseState}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalUseState(!modalUseState);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Selecciona una opción:</Text>
            <RoundedButton
              text="Galeria"
              onPress={() => {
                openGalery(numberImage);
                setModalUseState(false);
              }}
            ></RoundedButton>
            <RoundedButton
              text="Cámara"
              onPress={() => {
                openCamera(numberImage);
                setModalUseState(false);
              }}
            ></RoundedButton>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: 250,
    height: 200,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF"
  },
  buttonClose: {
    backgroundColor: "#2196F3"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
