import React, { useState, useEffect, useRef } from 'react'
import Notification from './Notification'
import blogService from '../Services/blogs'
import loginService from '../Services/login'
import LoginForm from './LoginForm'
import BlogForm from './BlogForm'
import ShowBlogs from './ShowBlogs'
import Toggable from './Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])//Manage blogs
  const [user, setUser] = useState(null)//Login
  const [state, setState] = useState(false)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

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
        showMessage(`wrong username or password:${error}`, false)
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
    }
    catch (error) {
      showMessage('Something went wrong, try to logout again', false)
    }
  }

  //Succesor to handleBlogCreation
  const addBlog = (blogObject) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        showMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, true)
      })
      .catch(error => {
        showMessage(`Something went wrong: ${error.response.data.error}`, false)
      })
  }

  //Now it works
  const addLike = async (blog) => {
    try {
      await blogService.update(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
      })
      showMessage(`Liked blog ${blog.title} now has ${blog.likes} `, true)
      const newBlogs = blogs.map((currentBlog) =>
        currentBlog.id === blog.id
          ? { ...currentBlog, likes: currentBlog.likes + 1 }
          : currentBlog
      )
      setBlogs(newBlogs)
    }
    catch (error) {
      showMessage(`Failed to like blog ${blog.title}: ${error.response.data.error}`, false)
    }
  }

  const removeBlog = (blogObject) => {
    const blogId = blogObject.id
    const blogTitle = blogObject.title
    const blogAuthor = blogObject.author

    if (window.confirm(`Remove ${blogTitle} by ${blogAuthor}`)) {

      blogService
        .remove(blogId)
        .then(() => {
          showMessage(`Removed blog ${blogTitle}`, true)
          console.log(`Removed blog ${blogTitle}`)
          setBlogs(blogs.filter(n => n.id !== blogId))
        })
        .catch(error => {
          showMessage(`You cannot remove blogs added by another user ${error.response.data.error}`, false)
          console.log(`You cannot remove blogs added by another user ${error.response.data.error}`)
        })
    }
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

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
          (
            <div>
              {/* Logout */}
              <div>
                <h1>blogs</h1>
                <p>
                  {user.name} logged in <button id='logout' onClick={handleLogout}>logout</button>
                </p>
              </div>
              {/* Blog Form and show blogs */}
              <Toggable buttonLabel='create new blog' ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
              </Toggable>
              <ShowBlogs blogs={sortedBlogs} user={user} removeBlog={removeBlog} showMessage={showMessage} addLike={addLike}/>
            </div>

          )
      }
    </div>
  )
}

export default App
