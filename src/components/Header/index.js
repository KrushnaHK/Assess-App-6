import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar-container">
      <div>
        <Link to="/" className="link-items">
          <img
            className="website-logo"
            alt="website logo"
            src="https://res.cloudinary.com/djifdyfkd/image/upload/v1711797243/Group_8004_3x_sqmvrj.png"
          />
        </Link>
      </div>
      <button type="button" className="logout-button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
