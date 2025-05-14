import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateNewBlog from './components/CreateNewBlog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
      console.log("The blogs are: ", blogs)
    })  
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Logging in with ', username, password)

    try {
      const user = await loginService.login({username, password})
      console.log("Logged in user: ", user)

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    console.log("Logging out user ", user.name)

    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const handleCreateNewBlog = async (event) => {
    event.preventDefault()
    console.log("Creating a new blog post:", title, author, url)

    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
        likes: 0
      }

      const blog = await blogService.create(newBlog)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setMessage('Blog ' + newBlog.title + ' by ' + newBlog.author + ' was added!')
          setTitle('')
          setAuthor('')
          setUrl('')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      console.log("New blog was added: ", blog)

    } catch (exception) {
      console.log("Error in creating a new blog: ", exception)
      setErrorMessage('could not create blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (user == null) {
    return (
      <div>
        <h2>Log in to view your blogs</h2>
        {errorMessage && <p className='error'>{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      {errorMessage && <p className='error'>{errorMessage}</p>}
      {message && <p className='msg'>{message}</p>}

      <h3>Create a new blog</h3>
      <CreateNewBlog 
        createNewBlog={handleCreateNewBlog}
        setTitle={setTitle} 
        setAuthor={setAuthor}
        setUrl={setUrl}
      />

      <h3>List of blogs</h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

      <h3 style={{marginTop: 20}}>Log out</h3>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  )
}


export default App