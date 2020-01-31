const React = require('react')
// const DefaultLayout = require('../layouts/defaultlayout')

class question extends React.Component {

  // create an array with the 4 answers
  // shuffle the array
  // Display it below
  
  render () {
    return (
      <div>
        <div className="row">
        <h2 id='question'>{this.props.question}</h2>
        </div>
        <div className="row text-center">
          <div className="col-md-6 bg-primary border rounded p-1">
            <div id='answer_1' className='answer display-2'>{this.props.answer_1}</div>
          </div>
          <div className="col-md-6 bg-danger border rounded p-1">
            <div id='answer_2' className='answer display-2'>{this.props.answer_2}</div>
          </div>
          <div className="col-md-6 bg-info border rounded p-1">
            <div id='answer_3' className='answer display-2'>{this.props.answer_3}</div>
          </div>
          <div className="col-md-6 bg-warning border rounded p-1">
            <div id='answer_4' className='answer display-2'>{this.props.answer_4}</div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = question
