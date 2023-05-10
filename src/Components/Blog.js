import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const addLike = () => {
    console.log('+1 likes')
  }

  const contentToShow = (() => {
    if (showDetails === true) {
      return (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={addLike}>like</button>
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