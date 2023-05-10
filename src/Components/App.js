import React, { useState, useEffect } from 'react'
import Notification from './Notification'
import blogService from '../Services/blogs'
import loginService from '../Services/login'
import LoginForm from './LoginForm'
import BlogForm from './BlogForm'

const App = () => {

  const [blogs, setBlogs] = useState([]) //Manage blogs
  const [user, setUser] = useState(null) //Login 
  const [title, setTitle] = useState('')  //Adding blogs
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [state, setState] = useState(false)
  const [message, setMessage] = useState(null)


  //Gets all blogs
  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs =>
        setBlogs(initialBlogs)
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
    /* setUsername('')
    setPassword('') */
  }

  //Succesor to handleLogin
  const loginUser = (userObject) => {
    loginService
      .login(userObject)
      .then(returnedUser => {
        setUser(returnedUser)
        blogService.setToken(returnedUser.token)
        window.localStorage.setItem(
          'loggedBloglistUser', JSON.stringify(returnedUser)
        )
        showMessage(`Welcome ${returnedUser.name}`, true)
      })
      .catch(error => {
        showMessage(`wrong username or password`, false)
      })
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


  //handleBlogCreation
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
        user === null
          ?
          (
            <LoginForm loginHelper={loginUser} />
          )
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