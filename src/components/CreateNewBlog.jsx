import { useState } from 'react'

const CreateNewBlog = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateNewBlog = (event) => {
    event.preventDefault()
    createNewBlog({
      title: title,
      author: author,
      url: url,
      likes: 0
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={handleCreateNewBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateNewBlog