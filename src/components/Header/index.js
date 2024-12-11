import {useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'

import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const {restaurantName, cartList} = useContext(CartContext)

  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderCartIcon = () => (
    <div className="cart-icon-link">
      <Link to="/cart">
        <button className="cart-icon-button" type="button" data-testid="cart">
          <AiOutlineShoppingCart className="cart-icon" />
        </button>
      </Link>
      <div className="cart-count-badge">
        <p className="cart-count">{cartList.length}</p>
      </div>
    </div>
  )

  return (
    <header className=" nav-header">
      <Link to="/">
        <h1 className="logo-heading">{restaurantName}</h1>
      </Link>
      <div className="order-container">
        <p className="my-orders-text">My Orders</p>
        <button type="button" className="logout-btn" onClick={onLogout}>
          Logout
        </button>
        {renderCartIcon()}
      </div>
    </header>
  )
}

export default Header
