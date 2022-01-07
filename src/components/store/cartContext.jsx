import { createContext, useContext } from "react";

export const useCart = () => useContext(CartContext);


const CartContext = createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {}
})

export default CartContext