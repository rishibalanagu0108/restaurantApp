import {useState, useContext} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'

const DishItem = props => {
  const {dishItem} = props
  const {
    dishId,
    dishName,
    dishImage,
    dishPrice,
    dishType,
    addonCat,
    dishAvailability,
    dishCalories,
    dishCurrency,
    dishDescription,
  } = dishItem

  const [quantity, setQuantity] = useState(0)
  const {addCartItem} = useContext(CartContext)

  const onIncreaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const onDecreaseQuantity = () => {
    setQuantity(prevState => (prevState > 0 ? prevState - 1 : 0))
  }

  const renderControllerButton = () => (
    <div className="controller-container">
      <button className="button" type="button" onClick={onDecreaseQuantity}>
        -
      </button>
      <p className="quantity">{quantity}</p>
      <button className="button" type="button" onClick={onIncreaseQuantity}>
        +
      </button>
    </div>
  )

  const onAddCartItem = () => {
    addCartItem({...dishItem, quantity})
  }

  return (
    <li className="dish-item-container">
      <div
        className={`veg-border ${dishType === 1 ? 'non-veg-border' : ''} me-3`}
      >
        <div className={`veg-round ${dishType === 1 ? 'non-veg-round' : ''}`} />
      </div>
      <div className="dish-details-container">
        <h1 className="dish-name">{dishName}</h1>
        <p className="dish-currency-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dish-description">{dishDescription}</p>
        {dishAvailability && renderControllerButton()}
        {!dishAvailability && (
          <p className="not-availability-text">Not available</p>
        )}

        {addonCat.length > 0 && (
          <p className="addon-availability-text">Customizations available</p>
        )}
        {quantity > 0 && (
          <button
            type="button"
            className="button add-cart"
            onClick={onAddCartItem}
          >
            ADD TO CART
          </button>
        )}
      </div>
      <p className="dish-calories">{dishCalories} calories</p>
      <img src={dishImage} alt={dishName} className="dish-image" />
    </li>
  )
}

export default DishItem
