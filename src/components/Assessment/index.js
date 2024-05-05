import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

import Questions from '../Questions'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Assessment extends Component {
  state = {
    questionList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getQuestions()
  }

  updateOptionsByType = (options, optionsType) => {
    switch (optionsType) {
      case 'DEFAULT':
        return options.map(option => ({
          id: option.id,
          text: option.text,
          is_correct: option.is_correct,
        }))
      case 'IMAGE':
        return options.map(option => ({
          id: option.id,
          text: option.text,
          image_url: option.image_url,
          is_correct: option.is_correct,
        }))
      case 'SINGLE_SELECT':
        return options.map(option => ({
          id: option.id,
          text: option.text,
          is_correct: option.is_correct,
        }))
      default:
        return options
    }
  }

  getQuestions = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/assess/questions'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.questions.map(eachQuestion => ({
        id: eachQuestion.id,
        options: this.updateOptionsByType(
          eachQuestion.options,
          eachQuestion.options_type,
        ),
        optionType: eachQuestion.options_type,
        questionText: eachQuestion.question_text,
      }))
      console.log(updatedData)
      this.setState({
        questionList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderQuestions = () => {
    const {questionList} = this.state
    return <Questions questionList={questionList} />
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/djifdyfkd/image/upload/v1712222035/Group_7519_gry_chyyhk.png"
        className="failure-image"
        alt="failure img"
      />
      <h1 className="failure-heading">Oops! Something went wrong</h1>
      <p className="failure-desc">We are having some trouble</p>
      <button
        type="button"
        data-testid="button"
        className="failure-button"
        onClick={this.getQuestions}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#263868" height="50" width="50" />
    </div>
  )

  renderQuestionsList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderQuestions()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div>{this.renderQuestionsList()}</div>
      </div>
    )
  }
}

export default Assessment
