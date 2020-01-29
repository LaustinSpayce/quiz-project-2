var React = require('react')

class question extends React.Component {
  render () {
    console.log(this.props.types)
    return (
      <html>
        <head />
        <body>
          <h3>{this.props.question}</h3>
          <ul>
            <li>{this.props.answer_1}</li>
            <li>{this.props.answer_2}</li>
            <li>{this.props.answer_3}</li>
            <li>{this.props.answer_4}</li>
          </ul>
        </body>
      </html>
    )
  }
}

module.exports = question
