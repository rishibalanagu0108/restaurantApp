import {useState, useEffect, useContext} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import DishItem from '../DishItem'
import CartContext from '../../context/CartContext'

import './index.css'

const Home = () => {
  const [isLoading, setLoading] = useState(true)
  const [response, setResponse] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState('')
  const {setRestaurantName} = useContext(CartContext)

  const getUpdatedData = tableMenuList =>
    tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishType: eachDish.dish_Type,
        dishAvailability: eachDish.dish_Availability,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishCurrency: eachDish.dish_currency,
        addonCat: eachDish.addonCat,
      })),
    }))

  const fetchRestaurantsApi = async () => {
    const apiUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const apiResponse = await fetch(apiUrl)
    const data = await apiResponse.json()
    const updatedData = getUpdatedData(data[0].table_menu_list)
    setResponse(updatedData)
    setRestaurantName(data[0].restaurant_name)
    setActiveCategoryId(updatedData[0].menuCategoryId)
    setLoading(false)
  }

  useEffect(() => {
    fetchRestaurantsApi()
  }, [])

  const renderSpinner = () => (
    <div className="spinner-container">
      <Loader type="ThreeDots" width={50} height={50} />
    </div>
  )

  const onUpdateActiveCategoryIdx = id => {
    setActiveCategoryId(id)
  }

  const renderTabItem = (categoryId, categoryName) => {
    const onClickTabItem = () => {
      onUpdateActiveCategoryIdx(categoryId)
    }
    return (
      <li
        key={categoryId}
        className={`each-tab-item ${
          categoryId === activeCategoryId ? 'active-tab-item' : ''
        }`}
      >
        <button
          type="button"
          onClick={onClickTabItem}
          className="tab-category-button"
        >
          {categoryName}
        </button>
      </li>
    )
  }

  const renderDishes = () => {
    const {categoryDishes} = response.find(
      eachCategory => eachCategory.menuCategoryId === activeCategoryId,
    )
    console.log(categoryDishes)
    return (
      <ul className="dishes-list-container">
        {categoryDishes.map(eachDish => (
          <DishItem key={eachDish.dishId} dishItem={eachDish} />
        ))}
      </ul>
    )
  }

  return isLoading ? (
    renderSpinner()
  ) : (
    <div className="home-background">
      <Header />
      <ul className="tab-container">
        {response.map(eachCategory =>
          renderTabItem(eachCategory.menuCategoryId, eachCategory.menuCategory),
        )}
      </ul>
      {renderDishes()}
    </div>
  )
}

export default Home
