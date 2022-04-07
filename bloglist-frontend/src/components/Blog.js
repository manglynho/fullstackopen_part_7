import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog,  byeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeBtnStyle ={
    color: 'white',
    backgroundColor: 'red',
    borderColor:'red',
    borderRadius: '10%'
  }

  return (
    <div className='blog_element' style={blogStyle}>
      <div>
        <Link to={`/blogs/${blog.id}`}> {blog.title} {blog.author} </Link>
        <button className='removeBtn' style={removeBtnStyle} onClick={byeBlog}>Remove</button>
      </div>
    </div>
  )}

Blog.propTypes = {
  byeBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog