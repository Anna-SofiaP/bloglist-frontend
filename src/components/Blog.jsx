import { useState } from "react"

const Blog = ({ blog, user, handleLikeBlog}) => {
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

  const likeThisBlog = (event, blog, user) => {
    event.preventDefault()
    const newLikes = blog.likes + 1

    const blogWithNewLikes = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: newLikes,
    }

    handleLikeBlog(blogWithNewLikes)
  }

  return (
    <div style={blogStyle}>
      <div>
        <p>{blog.title} by {blog.author}</p>
      </div>
      <div>
        {showAllInfo ?
          <>
            <button onClick={() => setShowAllInfo(false)}>hide information</button>
            <p>Url: {blog.url}</p>
            <p>Likes: {blog.likes}</p>
            {user === undefined ?
              <p>Added by: Unknown</p>
              :
              <p>Added by: {user.name}</p>}
            <button onClick={(event) => {
              likeThisBlog(event, blog, user)}}>like this blog</button>
          </>
          :
          <button onClick={() => setShowAllInfo(true)}>show more information</button>
        }
      </div>
    </div>
  ) 
}

export default Blog