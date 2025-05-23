import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
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

test('renders blog title and author, but not automatically the extra information', () => {

    render(<Blog blog={blog} loggedInUser={user} />)

    // Test that title and author are rendered
    const titleAndAuthor = screen.getByText('All about component testing by Teresa Tester')
    expect(titleAndAuthor).toBeInTheDocument()

    // Test that extra information is not rendered by default
    const url = screen.queryByText('Url: componenttesting.com')
    const likes = screen.queryByText('Likes: 30')
    expect(url).not.toBeInTheDocument()
    expect(likes).not.toBeInTheDocument()
})

test('renders more information about the blog when button has been pressed', async () => {

    render(
        <Blog blog={blog} loggedInUser={user} />
    )

    const testUser = userEvent.setup()
    const button = screen.getByText('show more information')
    await testUser.click(button)

    const url = await screen.findByText('Url: componenttesting.com')
    const likes = await screen.findByText('Likes: 30')
    const blogOwner = await screen.findByText('Added by: Mummo Ankka')

    expect(url).toBeInTheDocument()
    expect(likes).toBeInTheDocument()
    expect(blogOwner).toBeInTheDocument()
})

test('when the \'like\' button is clicked two times, event handler is called two times', async () => {

    const mockHandler = vi.fn()

    render(
        <Blog blog={blog} loggedInUser={user} handleLikeBlog={mockHandler}/>
    )

    const testUser = userEvent.setup()

    // Click the 'show more information' button to show the 'like this blog' button
    const moreButton = screen.getByText('show more information')
    await testUser.click(moreButton)

    // Click the 'like this blog' button two times
    const likeButton = screen.getByText('like this blog')
    await testUser.click(likeButton)
    await testUser.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})