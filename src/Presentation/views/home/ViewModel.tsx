import React, { useContext, useEffect, useState } from "react";
import { LoginAuthUseCase } from "../../../Domain/useCases/auth/LoginAuth";
import { UserContext } from "../../context/UserContext";
import { updateNotificationTokenUserUseCase } from "../../../Domain/useCases/user/UpdateNotificationTokenUser";

const HomeViewModel = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: ""
  });
  // const { user, getUserSession } = useUserLocal();
  const { user, saveUserSession } = useContext(UserContext);

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const login = async () => {
    if (isValidForm()) {
      const response = await LoginAuthUseCase(values.email, values.password);
      console.log("RESPONSE: " + JSON.stringify(response));
      if (!response.success) {
        setErrorMessage(response.message);
      } else {
        saveUserSession(response.data);
      }
    }
  };

  const updateNotificationToken = async (id: string, token: string) => {
    const result = await updateNotificationTokenUserUseCase(id, token);
  };

  const isValidForm = (): boolean => {
    if (values.email === "") {
      setErrorMessage("Ingresa el correo electrónico");
      return false;
    }
    if (values.password === "") {
      setErrorMessage("Ingresa la contraseña");
      return false;
    }
    return true;
  };

  return {
    ...values,
    user,
    errorMessage,
    onChange,
    login,
    updateNotificationToken
  };
};

export default HomeViewModel;
