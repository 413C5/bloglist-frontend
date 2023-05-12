import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'


describe('<Blog />', () => {
    let component
    const showMessage = jest.fn()
    const removeBlog= jest.fn()
    const blog = {
      id: 'abcdefghi',
      title: 'Title',
      url: 'https://dom.com',
      likes: 0,
      author: 'Author',
    }
  
    beforeEach(() => {
      component = render(
        <Blog
          key={blog.id}
          blog={blog}
          /* user={user} */
          removeBlog={removeBlog}
          showMessage={showMessage}
        />
      )
    })
  
    test('renders title and author but not url or likes by default', () => {
      expect(component.container.querySelector('.title and author')).toHaveTextContent(
        blog.title,' ',blog.author
      )
      expect(component.queryByText(blog.url)).not.toBeInTheDocument()
      expect(component.queryByText('like')).not.toBeInTheDocument()
    })
  
    test('at start the children are not displayed', () => {
      const div = component.container.querySelector('.extra-info')
  
      expect(div).toEqual(null)
    })
  })