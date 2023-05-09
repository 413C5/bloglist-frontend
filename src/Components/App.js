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
  const [title, setTitle] = useState('')  //Adding blogs
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const resetFields = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
    setUsername('')
    setPassword('')
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
      resetFields()
      showMessage(`Welcome ${user.name}`, true)
    }
    catch (error) {
      showMessage(`wrong username or password`, false)
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
      resetFields()
    }
    catch (error) {
      showMessage(`Something went wrong, try to logout again`, true)
    }
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    blogService
      .create(newBlog)
      .then(createdBlog => {
        setBlogs(blogs.concat(createdBlog))
        showMessage(`a new blog ${createdBlog.title} by ${createdBlog.author} added`, true)
        resetFields()
      })
      .catch(error => {
        showMessage(`Something went wrong: `, error.response.data.error)
      })
  }

  const BlogForm = () => {
    return (
      <div>
        <form onSubmit={handleBlogCreation}>
          <h1>blogs</h1>
          {/* Logout */}
          <div>
            <p>
              {user.name} logged in <button onClick={handleLogout}>logout</button>
            </p>
          </div>
          {/* Add blogs */}
          <div>
            <h1>create new</h1>
            title:
            <input type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)} />
            <br />
            author:
            <input type="text" value={author} name="author" onChange={({ target }) => setAuthor(target.value)} />
            <br />
            url:
            <input type="text" value={url} name="url" onChange={({ target }) => setUrl(target.value)} />
            <br />
            <button type="submit">create </button>
          </div>
          <div>
            {showBlogs()}
          </div>
        </form>
      </div>
    )
  }

  const showBlogs = () => {
    return (
      blogs.map(blog => {
        return (
          <Blog key={blog.id} blog={blog} />
        )
      })
    )
  }

  const LoginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          <h1>log in to application</h1>
          username:
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
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
      {
        user === null ?
          (<div>
            {LoginForm()}
          </div>)
          :
          (<div>
            {BlogForm()}
          </div>)
      }
    </div>
  )
}

export default App