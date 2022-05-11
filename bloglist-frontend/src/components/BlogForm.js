import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [newBlogTittle, setNewBlogTittle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl , setNewBlogUrl] = useState('')

  const handleBlogTittleChange = (event) => {
    setNewBlogTittle(event.target.value)
  }
  const handleBlogAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }
  const handleBlogUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTittle,
      author: newBlogAuthor,
      url: newBlogUrl,
    })
    setNewBlogTittle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <Form onSubmit={addBlog}>
      <Form.Group>
        <Form.Label>Blog:</Form.Label>
        <Form.Control
          type="text"
          name='title'
          id='title'
          value={newBlogTittle}
          onChange={handleBlogTittleChange}
        />
        <Form.Label>Author:</Form.Label>
        <Form.Control
          type="text"
          name='author'
          id='author'
          value={newBlogAuthor}
          onChange={handleBlogAuthorChange}
        />
        <Form.Label>Url:</Form.Label>
        <Form.Control
          type="text"
          name='url'
          id='url'
          value={newBlogUrl}
          onChange={handleBlogUrlChange}
        />
        <Button id='add-blog-button' variant="primary" type="submit">
            save
        </Button>
      </Form.Group>
    </Form>
  )
}

BlogForm.propTypes = {
  createBlog:PropTypes.func.isRequired
  /*addBlog: PropTypes.func.isRequired,
  handleBlogTittleChange: PropTypes.func.isRequired,
  handleBlogAuthorChange: PropTypes.func.isRequired,
  handleBlogUrlChange:PropTypes.func.isRequired,
  newBlogTittle: PropTypes.string.isRequired,
  newBlogAuthor: PropTypes.string.isRequired,
  newBlogUrl: PropTypes.string.isRequired*/
}

export default BlogForm