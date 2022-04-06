import React from 'react'

const User = (props) => {
  if(!props.user){
    return null
  }
  return(
    <div>
      <h2>{props.user.name}</h2>
      <h4>Added Blogs</h4>
      <ul>
        { props.user.blogs.map(blog =>
          <li key={blog.id}>
            {blog.title}
          </li>
        )}
      </ul>
    </div>
  )
}

export default User