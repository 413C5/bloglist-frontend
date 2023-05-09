import React from "react"

const Blog = ({ blog }) => {
  return (
    <div>
      <p>
        {blog.author} {blog.title}
      </p>
    </div>
  )
}

export default Blog