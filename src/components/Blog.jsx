import { useState } from "react"

const Blog = ({ blog, loggedInUser, handleLikeBlog, handleDeleteBlog}) => {
  const [showAllInfo, setShowAllInfo] = useState(false)

  const blogStyle = {
    //paddingTop: 0,
    paddingBottom: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10
  }

  const likeThisBlog = (event, blog) => {
    event.preventDefault()
    const newLikes = blog.likes + 1
    console.log("Liking a blog...")
    console.log("Blog's previous likes: ", blog.likes)
    console.log("Blog's new likes: ", newLikes)
    console.log("Blogs user: ", blog.user.name)

    const blogWithNewLikes = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: newLikes,
      //user: blog.user
    }

    handleLikeBlog(blogWithNewLikes, blog)
  }

  const deleteThisBlog = (event, blog) => {
    event.preventDefault()
    console.log("Deleting a blog...")
    handleDeleteBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div>
        <p>{blog.title} by {blog.author}</p>
        {showAllInfo ?
          <>
            <button onClick={() => setShowAllInfo(false)}>hide information</button>
            <p>Url: {blog.url}</p>
            <p>Likes: {blog.likes}</p>
            <p>Added by: {blog.user.name}</p>
            <button className='likeButton' onClick={(event) => {
              likeThisBlog(event, blog)}}>like this blog</button>
          </>
          :
          <button onClick={() => setShowAllInfo(true)}>show more information</button>
        }
        {loggedInUser.id === blog.user.id &&
          <button className='deleteButton' 
            onClick={(event) => deleteThisBlog(event, blog)}>
            delete this blog
          </button>
        }
      </div>
    </div>
  ) 
}

export default Blog