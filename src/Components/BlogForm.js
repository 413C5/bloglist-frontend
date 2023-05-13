import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')//Adding blogs
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const resetFields = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    resetFields()
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        {/* Add blogs */}
        <div>
          <h1>create new</h1>
            title:
          <input id='title' type='text' value={title} name='title' onChange={({ target }) => setTitle(target.value)} />
          <br />
            author:
          <input id='author' type='text' value={author} name='author' onChange={({ target }) => setAuthor(target.value)} />
          <br />
            url:
          <input id='url' type='text' value={url} name='url' onChange={({ target }) => setUrl(target.value)} />
          <br />
          <button type='submit'>create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
