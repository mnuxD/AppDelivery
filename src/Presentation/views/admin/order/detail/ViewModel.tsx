import React, { useContext, useEffect, useState } from "react";
import { Order } from "../../../../../Domain/entities/Order";
import { GetDeliveryUserUseCase } from "../../../../../Domain/useCases/user/GetDeliveryUser";
import { User } from "../../../../../Domain/entities/User";
import { OrderContext } from "../../../../context/OrderContext";
import { NotificationPush } from "../../../../utils/NotificationPush";

interface DropDownProps {
  label: string;
  value: string;
}

const AdminOrderDetailViewModel = (order: Order) => {
  const [total, setTotal] = useState(0.0);
  const [deliveryUsers, setDeliveryUsers] = useState<User[]>([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<DropDownProps[]>([]);

  const { updateToDispatched } = useContext(OrderContext);
  const { sendPushNotification } = NotificationPush();

  const setDropDownItems = () => {
    let itemsDeliveryUsers: DropDownProps[] = [];
    deliveryUsers.forEach((user) =>
      itemsDeliveryUsers.push({
        label: user.name + " " + user.lastname,
        value: user.id!
      })
    );
    setItems(itemsDeliveryUsers);
  };

  const dispatchOrder = async () => {
    if (value) {
      order.id_delivery = value!;
      const result = await updateToDispatched(order);

      setResponseMessage(result.message);
      if (result.success) {
        const index = deliveryUsers.findIndex(
          (d) => d.id === order.id_delivery
        );

        await sendPushNotification(
          deliveryUsers[index].notification_token!,
          "PEDIDO ASIGNADO",
          "TE HAN ASIGNADO UN PEDIDO"
        );
      }
    } else {
      setResponseMessage("Selecciona un repartidor");
    }
  };

  const getTotal = () => {
    order.products.forEach((p) =>
      setTotal(total + parseFloat(p.price) * p.quantity!)
    );
  };

  const getDelivery = async () => {
    const result = await GetDeliveryUserUseCase();
    setDeliveryUsers(result);
  };

  useEffect(() => {
    setDropDownItems();
  }, [deliveryUsers]);

  return {
    total,
    deliveryUsers,
    open,
    value,
    items,
    responseMessage,
    getTotal,
    getDelivery,
    setOpen,
    setValue,
    setItems,
    dispatchOrder
  };
};

export default AdminOrderDetailViewModel;
