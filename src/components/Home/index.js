import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="home-bg-container">
        <div className="instruction-card">
          <h1 className="home-page-heading">Instructions</h1>
          <ol className="instructions-list">
            <li className="instruction">
              Total Questions: <span className="span">10</span>
            </li>
            <li className="instruction">
              Types of Questions: <span className="span">MCQs</span>
            </li>
            <li className="instruction">
              Duration: <span className="span">10 Mins</span>
            </li>
            <li className="instruction">
              Marking Scheme:{' '}
              <span className="span">Every Correct response, get 1 mark.</span>
            </li>
            <li className="instruction wish">
              All the progress will be lost, if you reload during the assessment
            </li>
          </ol>
          <Link to="/assessment">
            <button type="button" className="start-button">
              Start Assessment
            </button>
          </Link>
        </div>
        <img
          src="https://res.cloudinary.com/djifdyfkd/image/upload/v1711874342/Group_pogefq.png"
          alt="assessment"
          className="home-page-image"
        />
      </div>
    </>
  )
}

export default Home
