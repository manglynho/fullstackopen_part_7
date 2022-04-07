import React from 'react'
//import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Blog from '../components/Blog'

const BlogList = (props) => {
  return(
    <div>
      {props.blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          byeBlog ={ () => {
            if (window.confirm(`Delete ${blog.title} ?`)) {
              props.removeBlog(blog)
              //props.setNotification(`Removed ${blog.title}`, 3000, 'success')
            }
          }
          }
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  /*if ( state.filter === 'ALL' ) {
    return {
      blogs: state.blogs.sort((a, b) => b.likes - a.likes)
    }
  }  return {
    blogs: state.blogs.filter(el => el.title.toLowerCase().indexOf(state.filter.toLowerCase()) !== -1).sort((a, b) => b.likes - a.likes)
  }*/
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {  removeBlog , setNotification }

//export default AnecdoteList
const ConnectedBlogList = connect(mapStateToProps,mapDispatchToProps)(BlogList)
export default ConnectedBlogList