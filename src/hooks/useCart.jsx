import React from "react";
import AppContext from "../AppContext";

export const useCart = () => {
  const { cartItems, setItemsCart } = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  return { cartItems, setItemsCart, totalPrice };
};
