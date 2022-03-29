import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'DO_LIKE': {
    const id = action.data
    const blogToChange = state.find(n => n.id === id)
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1
    }
    return state.map(blog =>
      blog.id !== id ? blog : changedBlog
    )
  }
  case 'REMOVE': {
    const id = action.data
    return state.filter(item => item.id !== id)
  }
  default:
    return state
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const doLike = (id, blog) => {
  return async dispatch => {
    const changedLikes = {
      ...blog,
      likes: blog.likes + 1
    }
    //const updatedBlog = await blogService.update(id, changedLikes)
    const updatedBlog = await blogService.update(changedLikes)
    dispatch({
      type: 'DO_LIKE',
      data: updatedBlog.id,
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)
      dispatch({
        type: 'REMOVE',
        data: blog.id,
      })
      dispatch(setNotification(`Removed ${blog.title}`, 3000, 'success'))
    }catch (error) {
      if (error.response) {
        // Request made and server responded
        dispatch(setNotification(error.response.data.error, 3000, 'error'))
      }else{
        dispatch(setNotification(error.message, 3000, 'error'))
      }
    }
  }
}

export default blogReducer