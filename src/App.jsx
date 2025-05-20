import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateNewBlog from './components/CreateNewBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [users, setUsers] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState('')

  const newBlogFormRef = useRef()

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
      console.log("Logged in user: ", user)
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

  const handleCreateNewBlog = async (newBlog) => {
    console.log("Creating a new blog post:", newBlog.title, newBlog.author, newBlog.url)

    try {
      newBlogFormRef.current.toggleVisibility()
      await blogService.create(newBlog)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setMessage('Blog ' + newBlog.title + ' by ' + newBlog.author + ' was added!')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      console.log("New blog was added!")

    } catch (exception) {
      console.log("Error in creating a new blog: ", exception)
      setErrorMessage('could not create blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const handleLikeBlog = async (blogObject, oldBlog) => {
    console.log("This function registers a new like to a blog!")
    console.log("Blog to be updated: ", blogObject)
    console.log("The old blog is: ", oldBlog)

    try {
      await blogService.update(blogObject)
        .then(returnedObject => {
          console.log("Updating the blog was successful: ", returnedObject)
          // TODO: Here remove the old blog from the blogs list and add the new updated one there!!!
          const index = blogs.indexOf(oldBlog)
          if (index > -1) {
            let newBlogs = [...blogs]
            console.log("Old blog: ", newBlogs[index], " and its index: ", index)
            newBlogs[index] = returnedObject
            console.log("New blog: ", newBlogs[index], " and its index: ", index)
            console.log("New blogs: ", newBlogs)
            setBlogs(newBlogs)
          }
          setMessage('the blog ' + blogObject.title + ' got a new like!')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    } catch (exception) {
      console.log("Error in updating a blog: ", exception)
      setErrorMessage('could not update the blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const handleDeleteBlog = async (blogToDelete) => {
    console.log("This function handles the deletion of a blog!")
    console.log("Blog to delete: ", blogToDelete)
    console.log("Blog id: ", blogToDelete.id)
    console.log("User who added the blog: ", blogToDelete.user.name)
    console.log("User who is deleting the blog: ", user.name)

    if (window.confirm("Delete the blog " + blogToDelete.title + " by " + blogToDelete.user.name + "?")) {
      try {
        console.log("Deleting accepted!")
        await blogService.deleteBlog(blogToDelete.id)
          .then(() => {
            console.log("Deleting blog was successful!")
            const index = blogs.indexOf(blogToDelete)
            if (index > -1) {
              let newBlogs = [...blogs]
              newBlogs.splice(index, 1)
              console.log("Blogs when one was deleted: ", newBlogs)
              //newBlogs.splice()
              //console.log("New blog: ", newBlogs[index], " and its index: ", index)
              //console.log("New blogs: ", newBlogs)
              setBlogs(newBlogs)
            }
            setMessage('blog ' + blogToDelete.title + ' deleted')
            setTimeout(() => {
            setMessage(null)
          }, 5000)
          })

      } catch (exception) {
        console.log("Error in deleting the blog: ", exception)
        setErrorMessage('could not delete the blog, a blog can be deleted only by its creator')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
    console.log("Deleting not accepted...")
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

      <Togglable buttonLabel='create new blog' ref={newBlogFormRef}>
        <CreateNewBlog createNewBlog={handleCreateNewBlog}/>
      </Togglable>

      <h3>List of blogs</h3>
      {blogs.toSorted((a, b) => b.likes - a.likes).map(blog =>
        <Blog 
        key={blog.id} 
        loggedInUser={user}
        blog={blog}
        handleLikeBlog={handleLikeBlog} 
        handleDeleteBlog={handleDeleteBlog}/>
      )}

      <h3 style={{marginTop: 20}}>Log out</h3>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  )
}


export default App