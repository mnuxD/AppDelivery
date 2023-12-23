import { StyleSheet } from "react-native";
import { MyColors } from "../../theme/AppTheme";

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    opacity: 0.7,
    bottom: "30%"
  },
  form: {
    width: "100%",
    height: "40%",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30
  },
  logoContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "15%",
    alignItems: "center"
  },
  logoImage: {
    width: 100,
    height: 100
  },
  logoText: {
    color: "white",
    textAlign: "center",
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold"
  },
  formText: {
    fontWeight: "bold",
    fontSize: 16
  },
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
  },
  formRegister: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20
  },
  formRegisterText: {
    textDecorationLine: "underline",
    fontWeight: "bold",
    color: MyColors.primary,
    fontStyle: "italic"
  }
});

export default HomeStyles;
