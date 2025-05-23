import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateNewBlog from './CreateNewBlog'
import { expect } from 'vitest'

const user = {
    username: 'mummoankkaa',
    name: 'Mummo Ankka'
}

const blog = {
    title: 'All about component testing',
    author: 'Teresa Tester',
    url: 'componenttesting.com',
    likes: 30,
    user: user
}

test('correct information is given to the event handler when a new blog is created', async () => {

    const testUser = userEvent.setup()
    const mockHandler = vi.fn()

    render(
        <CreateNewBlog createNewBlog={mockHandler}/>
    )

    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')
    const createButton = screen.getByText('create')

    await testUser.type(titleInput, blog.title)
    await testUser.type(authorInput, blog.author)
    await testUser.type(urlInput, blog.url)
    await testUser.click(createButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe(blog.title)
    expect(mockHandler.mock.calls[0][0].author).toBe(blog.author)
    expect(mockHandler.mock.calls[0][0].url).toBe(blog.url)
})