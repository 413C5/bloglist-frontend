import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'
import blogService from '../Services/blogs'

describe('1.-Blog render', () => {
    let component
    const showMessage = jest.fn()
    const removeBlog = jest.fn()
    const addLike = jest.fn()
    const blog = {
        id: 'abcdefghi',
        title: 'Title',
        url: 'https://dom.com',
        likes: 0,
        author: 'Author',
        user: {
            id: '324098',
        }
    }

    beforeEach(() => {
        component = render(
            <Blog
                key={blog.id}
                blog={blog}
                /* user={user} */
                removeBlog={removeBlog}
                showMessage={showMessage}
                addLike={addLike}
            />
        )
    })

    test('renders title and author but not url or likes by default', () => {
        expect(component.container.querySelector('.title')).toHaveTextContent(
            blog.title
        )
        expect(component.container.querySelector('.author')).toHaveTextContent(
            blog.author
        )
        expect(component.queryByText(blog.url)).not.toBeInTheDocument()
        expect(component.queryByText('like')).not.toBeInTheDocument()
    })

    test('at start the children are not displayed', () => {
        const div = component.container.querySelector('.extra-info')

        expect(div).toEqual(null)
    })

    test('after button click the children are displayed', () => {
        const button = component.container.querySelector('button')
        fireEvent.click(button)

        const div = component.container.querySelector('.extra-info')

        expect(div).toBeInTheDocument()
    })

    test('renders url and likes after click on view button', () => {
        const button = component.container.querySelector('button')
        fireEvent.click(button)

        expect(component.queryByText(blog.url)).toBeInTheDocument()
        expect(component.queryByText('like')).toBeInTheDocument()
    })

    test('event handler is called twice when button is clicked twice', () => {
        const button = component.container.querySelector('button')
        fireEvent.click(button)

        const likeButton = component.getByText('like')

        /* console.log(likeButton) */

        fireEvent.click(likeButton)
        expect(addLike.mock.calls).toHaveLength(1)

        fireEvent.click(likeButton)
        expect(addLike.mock.calls).toHaveLength(2)
    })

})