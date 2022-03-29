import React, {  useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs , createBlog } from './reducers/blogReducer'
import { check_auth, doLogin, doLogout } from './reducers/authReducer'
import { useDispatch, useSelector } from 'react-redux'


const App = () => {

  const blogFormRef = useRef()
  const loginFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  useEffect(() => {
    dispatch(check_auth())
  }, [dispatch])

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(createBlog(blogObject))
      dispatch(setNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`, 3000, 'success'))
    }catch(exception){
      dispatch(setNotification('Form Error', 3000,'error'))
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(doLogout())
    dispatch(setNotification('User logged out', 3000, 'success'))
  }

  const handleLogin = async (loginData) => {
    loginFormRef.current.toggleVisibility()
    try {
      dispatch(doLogin(loginData))
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 3000,'error'))
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='New Blog' buttonCancelLabel='Cancel' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const loginForm = () => (
    <Togglable buttonLabel='Login' buttonCancelLabel='Cancel' ref={loginFormRef}>
      <LoginForm doLogin={handleLogin} />
    </Togglable>
  )
  const user = useSelector(state => state.user)

  return (
    <div>
      <h2>Blogs App</h2>
      <Notification/>
      {user === null ?
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div> :
        <div>
          <p>{user.name} logged in
            <button id="logout-btn" onClick={() => logout()}>
            Logout
            </button></p>
          <h3>Add a new</h3>
          {blogForm(addBlog)}
          <hr/>
          <BlogList/>
        </div>
      }
    </div>
  )
}

export default App
