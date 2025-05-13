const CreateNewBlog = ({ createNewBlog, setTitle, setAuthor, setUrl }) => {

    const setNewTitle = (title) => {
        setTitle(title)
    }

    const setNewAuthor = (author) => {
        setAuthor(author)
    }

    const setNewUrl = (url) => {
        setUrl(url)
    }

    const handleCreateNewBlog = (event) => {
        createNewBlog(event)
    }

    return (
        <div>
          <form onSubmit={handleCreateNewBlog}>
              <div>
                title
                  <input
                  type="text"
                  name="Title"
                  onChange={({ target }) => setNewTitle(target.value)}
                />
              </div>
              <div>
                author
                  <input
                  type="text"
                  name="Author"
                  onChange={({ target }) => setNewAuthor(target.value)}
                />
              </div>
              <div>
                url
                  <input
                  type="text"
                  name="Url"
                  onChange={({ target }) => setNewUrl(target.value)}
                />
              </div>
              <button type="submit">create</button>
            </form>
        </div>
    )
}
  
  export default CreateNewBlog