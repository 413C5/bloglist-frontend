import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ loginHelper }) => {
  const [username, setUsername] = useState('')//Credentials
  const [password, setPassword] = useState('')

  //handleLogin
  const loginUser = (event) => {
    event.preventDefault()
    loginHelper({
      username: username,
      password: password
    })
    setUsername('')
    setPassword('')
  }
  return (
    <form onSubmit={loginUser}>
      <div>
        <h1>log in to application</h1>
          username:
        <input
          id='username'
          type='text'
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
          password:
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type='submit'>login</button>
    </form>
  )
}

LoginForm.displayName = 'LoginForm'

LoginForm.propTypes = {
  loginHelper: PropTypes.func.isRequired
}

export default LoginForm
