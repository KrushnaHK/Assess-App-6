import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  renderUsername = () => {
    const {username} = this.state

    return (
      <>
        <label className="label" htmlFor="userName">
          USERNAME
        </label>
        <input
          type="text"
          id="userName"
          placeholder="Username"
          className="user-input"
          value={username}
          onChange={this.onChangeUserName}
        />
      </>
    )
  }

  renderPassword = () => {
    const {showPassword, password} = this.state
    const passwordType = showPassword ? 'text' : 'password'

    return (
      <>
        <label className="label" htmlFor="password">
          PASSWORD
        </label>
        <input
          className="user-input"
          id="password"
          type={passwordType}
          placeholder="Password"
          value={password}
          onChange={this.onChangePassword}
        />
        <div className="checkbox-container">
          <input
            type="checkbox"
            className="checkbox-input"
            id="checkbox"
            onChange={this.onClickShowPassword}
          />
          <label className="show-password-label" htmlFor="checkbox">
            Show Password
          </label>
        </div>
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="assess-app-container">
        <div className="card-container">
          <div className="logo-container">
            <img
              src="https://res.cloudinary.com/djifdyfkd/image/upload/v1711781288/image_28_Traced_1x_fqihb9.png"
              alt="login website logo"
              className="logo"
            />
            <h1 className="app-name">
              <span className="main-heading">NXT </span>
              Assess
            </h1>
          </div>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div className="input-container">{this.renderUsername()}</div>
            <div className="input-container">{this.renderPassword()}</div>
            <button className="login-button" type="submit">
              Login
            </button>
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
