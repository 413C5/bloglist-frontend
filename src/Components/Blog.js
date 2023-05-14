import React, { useState } from 'react'

const Blog = ({ blog, user, removeBlog, showMessage,addLike }) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleLike = () => {
    //console.log(blog.user.username,' ',user.username)
    addLike({
      ...blog,
      likes: blog.likes + 1,
    })
  }

  const handleDelete = (event) => {
    //event.preventDefault()
    //console.log(blog.user.username,' ',user.username)
    //console.log('Blog',blog)
    //console.log('user',user)
    if (blog.user.username === user.username) {
      removeBlog(blog)
    }

    else {
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
          <button className='remove' onClick={handleDelete}>remove</button>
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
        <button className='button' id='show-more' onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
      </div>
      {contentToShow}
    </div>
  )
}

export default Blog
