const React = require('react')
// const DefaultLayout = require('../layouts/defaultlayout')

class question extends React.Component {

  render () {
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    // create an array with the 4 answers
    const answer1 = <div id='answer_1' className='answer h4'>{this.props.answer_1}</div>
    const answer2 = <div id='answer_2' className='answer h4'>{this.props.answer_2}</div>
    const answer3 = <div id='answer_3' className='answer h4'>{this.props.answer_3}</div>
    const answer4 = <div id='answer_4' className='answer h4'>{this.props.answer_4}</div>
    const answerArray = [answer1, answer2, answer3, answer4]
    // shuffle the array
    shuffle(answerArray)
    // Display it below

    return (
      <div>
        <div className="row">
        <h1 id='question'>{this.props.question}</h1>
        </div>
        <div className="row text-center">
          <div className="col-md-6 bg-primary border rounded p-1">
            {answerArray[0]}
          </div>
          <div className="col-md-6 bg-danger border rounded p-1">
            {answerArray[1]}
          </div>
          <div className="col-md-6 bg-info border rounded p-1">
            {answerArray[2]}
          </div>
          <div className="col-md-6 bg-warning border rounded p-1">
            {answerArray[3]}
          </div>
        </div>
      </div>
    )
  }
}

module.exports = question
