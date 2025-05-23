import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'

test('renders blog title and author, but not automatically the extra information', () => {
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