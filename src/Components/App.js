import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import Notification from './Notification'
import blogService from '../Services/blogs'
import loginService from '../Services/login'

const App = () => {

  const [blogs, setBlogs] = useState([]) //Manage blogs
  const [user, setUser] = useState(null) //Login 
  const [username, setUsername] = useState('') //Credentials
  const [password, setPassword] = useState('')
  const [state, setState] = useState(false)
  const [message, setMessage] = useState(null)


  //Gets all blogs
  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs)
      )
  }, [])

  //Sets message and color
  const showMessage = (message, state) => {
    setMessage(message)
    console.log(message)
    setState(state)
    setTimeout(() => {
      setMessage(null)
      setState(false)
    }, 5000)
  }

  //Method to manage user login
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      //Method is called when there is a succesfull login
      blogService.setToken(user.token)
      //Create new blogs
      setUser(user)
      setUsername('')
      setPassword('')
      showMessage(`Welcome ${user.name}`, true)
    }
    catch (error) {
      showMessage(`Wrong credentials`, false)
    }
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          <h1>log in to application</h1>
          username: {' '}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password: {' '}
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">
          login
        </button>
      </form>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <h1>blogs</h1>
        <p> {user.name} logged in </p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <div>
      <Notification message={message} state={state} />
      {/* Conditional rendering */}
      {user === null ?
        (<div>
          {loginForm()}
        </div>
        )
        :
        (<div>
          {blogForm()}
        </div>
        )
      }
    </div>
  )
}

export default App