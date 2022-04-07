import React from 'react'
import { doLike } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'


const BlogView = ( { blog } ) => {
  const dispatch = useDispatch()
  if(!blog){
    return null
  }

  const plusLike = (id, blog) => {
    dispatch(doLike(id, blog))
  }

  return (
    <div>
      <h2>{ blog.title }</h2>
      <a href={blog.url} target='_blank' rel="noreferrer">
        {blog.url}
      </a>
      <div>
        Likes: <span className='likesValue'>{blog.likes}</span>
        <button className='likeBtn' onClick={ () => plusLike(blog.id, blog) }>Like</button>
      </div>
      <div>
        Added by : {blog.user.name}
      </div>
    </div>
  )}
export default BlogView