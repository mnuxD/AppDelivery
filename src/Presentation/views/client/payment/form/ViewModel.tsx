import React, { useEffect, useRef, useState } from "react";
import { IdentificationType } from "../../../../../Domain/entities/IdentificationType";
import { GetIdentificationTypesMercadoPagoUseCase } from "../../../../../Domain/useCases/mercadoPago/GetIdentificationTypesMercadoPago";

interface DropDownProps {
  label: string;
  value: string;
}

const ClientPaymentFormViewModel = () => {
  const creditCardRef = useRef(null) as any;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<DropDownProps[]>([]);
  const [values, setValues] = useState({
    brand: "",
    cvv: "",
    expiration: "",
    holder: "",
    number: ""
  });

  const [valuesIdentification, setValuesIdentification] = useState({
    identificationNumber: "",
    identificationType: ""
  });

  const [identificationTypeList, setIdentificationTypeList] = useState<
    IdentificationType[]
  >([]);

  const getIdentificationTypes = async () => {
    const result = await GetIdentificationTypesMercadoPagoUseCase();
    setIdentificationTypeList(result);
  };

  const setDropDownItems = () => {
    let items: DropDownProps[] = [];
    identificationTypeList.forEach((item) =>
      items.push({
        label: item.name,
        value: item.id
      })
    );
    setItems(items);
  };

  useEffect(() => {
    console.log("values", values);
    console.log("valuesIdentification", valuesIdentification);
  }, [values, valuesIdentification]);

  useEffect(() => {
    setDropDownItems();
  }, [identificationTypeList]);

  useEffect(() => {
    onChange("identificationType", value);
  }, [value]);

  const onChange = (property: string, value: any) => {
    setValuesIdentification({ ...valuesIdentification, [property]: value });
  };

  const handleSubmit = React.useCallback(() => {
    if (creditCardRef.current) {
      const { error, data } = creditCardRef.current.submit();
      if (!error) setValues(data);
      console.log("ERROR: ", error);
      console.log("CARD DATA: ", data);
    }
  }, []);

  return {
    ...valuesIdentification,
    open,
    value,
    items,
    creditCardRef,
    identificationTypeList,
    onChange,
    setOpen,
    setValue,
    setItems,
    handleSubmit,
    getIdentificationTypes
  };
};

export default ClientPaymentFormViewModel;
