import {useContext} from 'react'

import Header from '../Header'
import CartItem from '../CartItem'

import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)

  const renderEmptyView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty view"
        className="empty-view-image"
      />
      <p className="empty-description">Your Card is Empty.</p>
    </div>
  )

  const onRemoveAllCartItems = () => {
    removeAllCartItems()
  }

  const renderCartContainer = () => (
    <>
      <div className="cart-items-header">
        <h1>Cart Items</h1>
        <button className="remove-all-btn" onClick={onRemoveAllCartItems}>
          Remove All
        </button>
        <ul>
          {cartList.map(dish => (
            <CartItem key={dish.dishId} cartItemDetails={dish} />
          ))}
        </ul>
      </div>
    </>
  )

  return (
    <div className="cart-page-container">
      <Header />
      <div className="cart-body-container">
        {cartList.length === 0 ? renderEmptyView() : renderCartContainer()}
      </div>
    </div>
  )
}

export default Cart
