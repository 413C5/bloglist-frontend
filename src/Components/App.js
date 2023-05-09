import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import Notification from './Notification'
import blogService from '../Services/blogs'
import loginService from '../Services/login'
import LoginForm from './LoginForm'
import BlogForm from './BlogForm'

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

  return (
    <div>
      <Notification message={message} state={state} />
      {/* Conditional rendering */}
      {
        user === null ?
          (<LoginForm
            handleLogin={handleLogin}
            username={username}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            password={password}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />)
          :
          (<div>
            <BlogForm
              handleBlogCreation={handleBlogCreation}
              user={user}
              handleLogout={handleLogout}
              title={title}
              handleTitleChange={({ target }) => setTitle(target.value)}
              author={author}
              handleAuhtorChange={({ target }) => setAuthor(target.value)}
              url={url}
              handleUrlChange={({ target }) => setUrl(target.value)}
              blogs={blogs}
            />
          </div>)
      }
    </div>
  )
}

export default App