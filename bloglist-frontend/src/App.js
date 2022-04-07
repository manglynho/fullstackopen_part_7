import React, { useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import BlogView from './components/BlogView'
import UserList from './components/UserList'
import User from './components/User'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

import { initializeUsers } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs , createBlog } from './reducers/blogReducer'
import { check_auth, doLogin, doLogout } from './reducers/authReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useMatch } from 'react-router-dom'

const App = () => {
  const blogFormRef = useRef()
  const loginFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
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

  const loggedUser = useSelector(state => state.user)

  const HomeContent = () => {
    return (
      loggedUser === null ?
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div> :
        <div>
          <h3>Add a new</h3>
          {blogForm(addBlog)}
          <hr/>
          <BlogList/>
        </div>
    )}

  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const match = useMatch('/users/:id')
  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  const match1 = useMatch('/blogs/:id')
  const blog = match1
    ? blogs.find(blog => blog.id === match1.params.id)
    : null

  const LoginStatus = () => {
    return(
      loggedUser === null ?
        <div>
        </div> :
        <div>
          {loggedUser.name} logged in
          <button id="logout-btn" onClick={() => logout()}>
      Logout
          </button>
        </div>
    )
  }
  const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <div>
        <Link style={padding} to="/">Blogs</Link>
        <Link style={padding} to="/users">Users</Link>
        <LoginStatus/>
      </div>
    )
  }

  return (
    <div>
      <Menu/>
      <h2>Blogs App</h2>
      <Notification/>
      <Routes>
        <Route path="/blogs/:id" element={<BlogView blog={blog}/>}/>
        <Route path="/users/:id" element={<User user={user}/>}/>
        <Route path="/users" element={<UserList users={users} />}>
        </Route>
        <Route path="/" element={<HomeContent />}>
        </Route>
      </Routes>
    </div>
  )
}

export default App
