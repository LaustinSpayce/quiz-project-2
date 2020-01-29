var React = require('react')

class question extends React.Component {
  render () {
    console.log(this.props.types)
    return (
      <html>
        <head />
        <body>
          <h2 id='question'>{this.props.question}</h2>
          <ul>
            <li id='answer_1' className='answer'>{this.props.answer_1}</li>
            <li id='answer_2' className='answer'>{this.props.answer_2}</li>
            <li id='answer_3' className='answer'>{this.props.answer_3}</li>
            <li id='answer_4' className='answer'>{this.props.answer_4}</li>
          </ul>
          <script src='/quizscript.js' />
        </body>
      </html>
    )
  }
}

module.exports = question
