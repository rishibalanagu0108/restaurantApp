import {createContext} from 'react'

const CartContext = createContext({
  cartList: [],
  addCartItem: () => {},
})

export default CartContext
