import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('1.-BlogForm', () => {
    let component
    const addBlog= jest.fn()

    beforeEach(() => {
        component = render(<BlogForm createBlog={addBlog} />)
    })

    test('calls createBlog event handler with correct details when a new blog is created', () => {
        const form = component.container.querySelector('form')
        const titleInput = component.container.querySelector('#title')
        const authorInput = component.container.querySelector('#author')
        const urlInput = component.container.querySelector('#url')

        const newBlog = {
            title: 'Test Blog',
            author: 'Test Author',
            url: 'http://www.test.com'
        }

        fireEvent.change(titleInput, { target: { value: newBlog.title } })
        fireEvent.change(authorInput, { target: { value: newBlog.author } })
        fireEvent.change(urlInput, { target: { value: newBlog.url } })
        fireEvent.submit(form)

        expect(addBlog.mock.calls).toHaveLength(1)
        expect(addBlog.mock.calls[0][0]).toEqual(newBlog)
    })
})