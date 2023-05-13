import React, { useState } from 'react'

const Blog = ({ blog, user, removeBlog, showMessage,addLike }) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleLike = (event) => {
    event.preventDefault()
    const blogToUpdate = {
      ...blog,
      likes: blog.likes + 1,
    }
    addLike(blogToUpdate)
  }

  const handleDelete = (event) => {
    event.preventDefault()

    if (blog && blog.user && blog.user.username === user.username) {
      removeBlog(blog)
    }

    else {
      console.log(blog.user.username,' ',user.username)
      showMessage('You are not authorized to delete this blog', false)
      console.log('You are not authorized to delete this blog')
    }
  }

  const contentToShow = (() => {
    if (showDetails === true) {
      return (
        <div className='extra-info'>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button className='buttonLike' onClick={handleLike}>like</button>
          </p>
          {/* <p>{blog.author}</p> */}
          <p>
            {blog.user.username}
          </p>
          <button onClick={handleDelete}>remove</button>
        </div>
      )
    }
  })()

  /* console.log(blog) */
  return (
    <div className='blogStyle'>
      <div>
        <p className='title'>
          {blog.title}
        </p>
        <p className='author'>
          {blog.author}
        </p>
        <button className='button' onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
      </div>
      {contentToShow}
    </div>
  )
}

export default Blog
