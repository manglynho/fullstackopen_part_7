import React, { useState } from 'react'
import { doLike, doComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'


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
        <Button className='likeBtn' onClick={ () => plusLike(blog.id, blog) } variant="info">
          Like
        </Button>
      </div>
      <div>
        Added by : {blog.user.name}
      </div>
      <h4>Comments</h4>
      <Form onSubmit={addBlogComment}>
        <Form.Group>
          <Form.Label>Comment:</Form.Label>
          <Form.Control
            type="text"
            id='comment'
            tittle='comment'
            value={newBlogComment}
            onChange={handleBlogCommentChange}
          />
          <Button variant="primary" type="submit">
            save
          </Button>
        </Form.Group>
      </Form>
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