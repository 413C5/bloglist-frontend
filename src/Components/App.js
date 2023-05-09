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

  //Stores user in local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
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
      //Local storage
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
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

  //Method to manage user logout
  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      showMessage(`${user.name} logout`, true)
      window.localStorage.clear()
      blogService.setToken(null)
      setUser(null)
      setUsername('')
      setPassword('')
    }
    catch (error) {
      showMessage(`Something went wrong, try to logout again`, true)
    }
  }

  const BlogForm = () => {
    return (
      <div>
        <h1>blogs</h1>
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
        {
          blogs.map(blog => {
            return (
              <Blog key={blog.id} blog={blog} />
            )
          })
        }
      </div>
    )
  }

  const LoginForm = () => {
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

  return (
    <div>
      <Notification message={message} state={state} />
      {/* Conditional rendering */}
      {user === null ?
        (<div>
          {LoginForm()}
        </div>
        )
        :
        (<div>
          {BlogForm()}
        </div>
        )
      }
    </div>
  )
}

export default App