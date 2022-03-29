import blogService from '../services/blogs'
import loginService from '../services/login'

const authReducer = (state = null , action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'UNSET_USER':
    return null
  default:
    return state
  }
}


export function check_auth() {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        data: user,
      })
    }
  }
}

export function doLogin(loginData) {
  return async dispatch => {
    const user = await loginService.login(loginData)
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    dispatch({
      type: 'SET_USER',
      data: user,
    })
  }
}


export function doLogout() {
  return function (dispatch) {
    dispatch({
      type: 'UNSET_USER'
    })
  }
}


export default authReducer