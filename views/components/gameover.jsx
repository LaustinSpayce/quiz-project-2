const React = require('react')
// const DefaultLayout = require('../layouts/defaultlayout')

class GameOver extends React.Component {
  render () {
    const scorelist = this.props.scores.map((element) => {
      let tableclass = ""
      if (element.name === this.props.playerName) {
        tableclass = 'table-info'
      }
      return(<tr className={tableclass}><th scope='row'>{element.name}</th><td>{element.score}</td></tr>)
    })
    const answersList = this.props.playerAnswers.map((question) => {
      let tableclass = ""
      if (question.answerSelectedText === question.correctAnswerText) {
        tableclass = 'table-success'
      } else {
        tableclass = 'table-danger'
      }
      return(<tr className={tableclass}><th scope='row'>{question.questionID}</th><td>{question.answerSelectedText}</td><td>{question.correctAnswerText}</td></tr>)
    })
    return (
      <div>
        <div className="row">
        <h1 id='GameOver'>Scores:</h1>
        </div>
        <div>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Score</th>
              </tr>
            </thead>
            <tbody>
            {scorelist}
            </tbody>
          </table>
          <hr/>
          <h1>Answers:</h1>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Answer Chosen</th>
                <th scope='col'>Correct Answer</th>
              </tr>
            </thead>
            <tbody>
              {answersList}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

module.exports = GameOver
