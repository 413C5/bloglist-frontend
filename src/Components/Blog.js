import React, { useState } from 'react'
import blogService from '../Services/blogs'

const Blog = ({ blog, user, removeBlog, showMessage }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [updatedLikes, setLikes] = useState(blog.likes)


  /* console.log(blog.user.username,user.username) */

  //Now it works
  const addLike = (blog) => {
    blogService
      .updateLike(blog.id, blog)
      .then(returnedBlog => {
        setLikes(returnedBlog.likes)
        console.log(`${returnedBlog.title} now has ${returnedBlog.likes} likes`)
        showMessage(`${returnedBlog.title} now has ${returnedBlog.likes} likes`, true)
      })
      .catch(error => {
        showMessage(`something went wrong ${error}`, false)
        console.log('something went wrong')
      })
  }

  const handleDelete = (event) => {
    event.preventDefault();

    if (blog && blog.user && blog.user.username === user.username) {
      removeBlog(blog);
    }
    else {
      showMessage(`You are not authorized to delete this blog`, false)
      console.log('You are not authorized to delete this blog');
    }
  };



  const contentToShow = (() => {
    if (showDetails === true) {
      return (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {updatedLikes} <button onClick={() => addLike(blog)}>like</button>
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
    <div className="blogStyle">
      <div>
        {blog.title} {' '} {blog.author}<button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
      </div>
      {contentToShow}
    </div>
  )
}

export default Blog