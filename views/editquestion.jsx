const React = require('react')
const DefaultLayout = require('./layouts/defaultlayout')

class editQuestion extends React.Component {

  render () {
    return (
      <DefaultLayout>
      <div>
        <div className="row">
          <form >
            <div className='form-group'>
              <label for='question'>Question No.</label>
              <input type='text' className='form-control' id='question' name='question' defaultValue={this.props.id} readOnly/>
            </div>
            <div className='form-group'>
              <label for='question'>Question</label>
              <input type='text' className='form-control' id='question' name='question' defaultValue={this.props.question}/>
            </div>
            <div className="form-group">
              <label for='answer_1'>Answer One (The correct answer)</label>
              <input type='text' className='form-control' id='answer1' name='answer_1' defaultValue={this.props.answer_1} required/>
            </div>
            <div className="form-group">
              <label for='answer_2'>Answer Two</label>
              <input type='text' className='form-control' id='answer1' name='answer_2' defaultValue={this.props.answer_2} required/>
            </div>
            <div className="form-group">
              <label for='answer_3'>Answer Three</label>
              <input type='text' className='form-control' id='answer1' name='answer_3' defaultValue={this.props.answer_3} required/>
            </div>
            <div className="form-group">
              <label for='answer_4'>Answer Four</label>
              <input type='text' className='form-control' id='answer1' name='answer_4' defaultValue={this.props.answer_4} required/>
            </div>
            <input type='submit' className='btn btn-primary'/>
          </form>
        </div>
      </div>
      </DefaultLayout>
    )
  }
}

module.exports = editQuestion
