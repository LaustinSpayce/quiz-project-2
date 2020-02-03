const React = require('react')
const DefaultLayout = require('./layouts/defaultlayout')

class Game extends React.Component {
  render () {
    const questionCards = this.props.questions.map(question => {
      const editURL = '/question/' + question.id + '/edit'
      return (
        <div className='card mb-3'>
          <div className='card-body'>
            <h5 className='card-title'>{question.id} - {question.question}</h5>
            <hr/>
            <ol>
              <li>{question.answer_1}</li>
              <li>{question.answer_2}</li>
              <li>{question.answer_3}</li>
              <li>{question.answer_4}</li>
            </ol>
            <a href={editURL} className="btn btn-primary">Edit this question</a>
          </div>
        </div>
      )
    })

    let optionalMessage = <div></div>
    console.log('the message:')
    console.log(this.props.message)

    if (this.props.message) {
      optionalMessage =  (
        <div className='alert alert-success' role='alert'>
          <h4>Success!</h4>
          <p>{this.props.message}</p>
        </div> )
      }

    return (
      <DefaultLayout>
        {optionalMessage}
        <h3>Questions</h3>
        {questionCards}
      </DefaultLayout>
    )
  }
}

module.exports = Game
