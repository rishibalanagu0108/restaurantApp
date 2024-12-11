import {Redirect, useHistory} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'

import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [erroMsg, setErrorMsg] = useState('')
  const history = useHistory()

  const inputHandler = event => {
    const {id, value} = event.target
    if (id === 'username') {
      setUsername(value)
    } else {
      setPassword(value)
    }
  }

  const submitSuccessForm = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  const submitFailureForm = errorMsgValue => {
    setErrorMsg(errorMsgValue)
  }

  const submitForm = async event => {
    event.preventDefault()
    const formData = {
      username,
      password,
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(formData),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      submitSuccessForm(data.jwt_token)
    } else {
      submitFailureForm(data.error_msg)
    }
  }

  if (Cookies.get('jwt_token')) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-bg">
      <form className="login-form" onSubmit={submitForm}>
        <h1 className="form-heading">Login</h1>
        <label className="login-form-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          className="login-form-input"
          id="username"
          onChange={inputHandler}
          value={username}
        />
        <label className="login-form-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          className="login-form-input"
          id="password"
          onChange={inputHandler}
          value={password}
        />
        <button type="submit" className="login-button">
          Submit
        </button>
        {erroMsg !== '' && <p>{erroMsg}</p>}
      </form>
    </div>
  )
}

export default Login
