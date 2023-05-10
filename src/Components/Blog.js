import React, { useState } from 'react'
import blogService from '../Services/blogs'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [updatedLikes, setLikes] = useState(blog.likes)

  const findBlogAddUser = async (blogId) => {
    const allBlogs = await blogService.getAll()
    const blogToUpdate = allBlogs.find(n => n.id === blogId)

    return
    (
      { ...blogToUpdate, user: blogToUpdate.user.id }
    )
  }

  //Now it works
  const addLike = (blogId) => {
    const blogWithUser = findBlogAddUser(blogId)

    blogService
      .updateLike(blogId, blogWithUser)
      .then(returnedBlog => {
        setLikes(returnedBlog.likes)
        console.log(`${returnedBlog.title} now has ${returnedBlog.likes} likes`)
      })
      .catch(error => {
        console.log('something went wrong')
      })
  }

  const contentToShow = (() => {
    if (showDetails === true) {
      return (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {updatedLikes} <button onClick={() => addLike(blog.id)}>like</button>
          </p>
          <p>{blog.author}</p>
        </div>
      )
    }
  })()

  /* console.log(blog) */
  return (
    <div className="blogStyle">
      <div>
        {blog.title} <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
      </div>
      {contentToShow}
    </div>
  )
}

export default Blog