import { useState } from "react"

const Blog = ({ blog }) => {
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
            <button onClick={() => console.log("Blog liked!")}>like this blog</button>
          </>
          :
          <button onClick={() => setShowAllInfo(true)}>show more information</button>
        }
      </div>
    </div>
  ) 
}

export default Blog