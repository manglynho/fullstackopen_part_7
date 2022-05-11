import React, { useState } from 'react'
import { doLike, doComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'


const BlogView = ( { blog } ) => {
  const [newBlogComment, setBlogComment] = useState('')
  const dispatch = useDispatch()
  if(!blog){
    return null
  }

  const plusLike = (id, blog) => {
    dispatch(doLike(id, blog))
  }

  const handleBlogCommentChange = (event) => {
    setBlogComment(event.target.value)
  }

  const addBlogComment = (event) => {
    event.preventDefault()
    dispatch(doComment(newBlogComment, blog))
    setBlogComment('')
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
      <h4>Comments</h4>
      <form onSubmit={addBlogComment}>
        <div>
          <input id='title' value={newBlogComment} onChange={handleBlogCommentChange} />
          <button id='add-blog-comment-button' type="submit">save</button>
        </div>
      </form>
      <ul>
        {blog.comments.map((comm, index) =>
          <li key={index}>
            {comm}
          </li>
        )}
      </ul>
    </div>
  )}
export default BlogView