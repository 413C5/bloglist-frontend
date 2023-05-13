import React from 'react'
import Blog from './Blog'

const ShowBlogs = ({ blogs, user, removeBlog, showMessage,addLike }) => {
  return (
    blogs.map(blog => {
      return (
        <Blog key={blog.id} blog={blog} user={user} removeBlog={removeBlog} showMessage={showMessage} addLike={addLike} />
      )
    })
  )
}

export default ShowBlogs
