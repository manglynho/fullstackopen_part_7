import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ doLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    doLogin({
      username: username,
      password: password,
    })
    setUsername('')
    setPassword('')
  }
  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username:</Form.Label>
        <Form.Control
          type="text"
          name="username"
          id='username'
          value={username}
          onChange={handleUsernameChange}
        />
        <Form.Label>password:</Form.Label>
        <Form.Control
          type="password"
          id='password'
          value={password}
          onChange={handlePasswordChange}
        />
        <Button id='login-button' variant="primary" type="submit">
            login
        </Button>
      </Form.Group>
    </Form>
  )
}

LoginForm.propTypes = {
  doLogin:PropTypes.func.isRequired,
  /*handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired*/
}

export default LoginForm