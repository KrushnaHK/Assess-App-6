import {Component} from 'react'

import './index.css'

class Questions extends Component {
  state = {
    index: 0,
  }

  renderFourOption = option => <li className="text-option">{option.text}</li>

  renderImageOption = option => (
    <img src={option.image_url} alt={option.text} className="image-option" />
  )

  renderSelectOption = option => (
    <option value={option.text}>{option.text}</option>
  )

  renderOption = questionInfo => {
    switch (questionInfo.optionType) {
      case 'DEFAULT':
        return (
          <div className="options">
            {questionInfo.options.map(eachOption =>
              this.renderFourOption(eachOption),
            )}
          </div>
        )
      case 'IMAGE':
        return questionInfo.options.map(eachOption =>
          this.renderImageOption(eachOption),
        )
      case 'SINGLE_SELECT':
        return (
          <select className="single-select-option">
            {questionInfo.options.map(eachOption =>
              this.renderSelectOption(eachOption),
            )}
          </select>
        )
      default:
        return null
    }
  }

  onClickNextQuestion = () => {
    const {index} = this.state
    if (index < 9) {
      this.setState(prevState => ({
        index: prevState.index + 1,
      }))
    } else {
      this.setState(prevState => ({
        index: prevState.index + 0,
      }))
    }
  }

  render() {
    const {questionList} = this.props
    const {index} = this.state

    return (
      <div className="question-container">
        <h1 className="question-text">
          {index + 1}.{questionList[index].questionText}
        </h1>
        {this.renderOption(questionList[index])}
        <div className="button-container">
          <button
            className="next-question-button"
            type="button"
            onClick={this.onClickNextQuestion}
          >
            Next Question
          </button>
        </div>
      </div>
    )
  }
}

export default Questions
