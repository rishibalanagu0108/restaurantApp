import {Route, BrowserRouter} from 'react-router-dom'
import {useState} from 'react'

import Home from './components/Home'

import NotFound from './components/NotFound'
import CartContext from './context/CartContext'

import './App.css'

// write your code here
const App = () => {
  const [cartList, setCartList] = useState([])

  const addCartItem = dish => {
    const dishAlreadyExists = cartList.find(
      eachDish => eachDish.dishId === dish.dishId,
    )
    if (dishAlreadyExists) {
      setCartList(prev =>
        prev.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + dish.quantity}
            : item,
        ),
      )
    } else {
      setCartList(prev => [...prev, dish])
    }
  }
  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
      }}
    >
      <BrowserRouter>
        <Route exact path="/" component={Home} />
      </BrowserRouter>
    </CartContext.Provider>
  )
}

export default App
