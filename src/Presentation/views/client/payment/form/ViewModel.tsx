import React, { useEffect, useRef, useState } from "react";

const ClientPaymentFormViewModel = () => {
  const creditCardRef = useRef(null) as any;

  const [values, setValues] = useState({
    brand: "",
    cvv: "",
    expiration: "",
    holder: "",
    number: ""
  });

  useEffect(() => {
    console.log("values", values);
  }, [values]);

  const handleSubmit = React.useCallback(() => {
    if (creditCardRef.current) {
      const { error, data } = creditCardRef.current.submit();
      if (!error) setValues(data);
      console.log("ERROR: ", error);
      console.log("CARD DATA: ", data);
    }
  }, []);

  return { creditCardRef, handleSubmit };
};

export default ClientPaymentFormViewModel;
