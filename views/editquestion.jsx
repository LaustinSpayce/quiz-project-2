const React = require('react')
// const DefaultLayout = require('../layouts/defaultlayout')

class editQuestion extends React.Component {

  render () {
    return (
      <div>
        <div className="row">
          <form>
            <div className='form-group'>
              <label for='question'>Question</label>
              <input type='text' className='form-control' id='question' name='question' defaultValue={this.props.question} required/>
            </div>
            <div className="form-group">
              // TODO: Finish this off.s
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
          </form>
        </div>
      </div>
    )
  }
}

module.exports = editQuestion
