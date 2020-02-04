const React = require('react')
const DefaultLayout = require('./layouts/defaultlayout')

class EditQuestion extends React.Component {

  render () {

    const editURL = '/question/'+this.props.id+'?_method=put'
    return (
      <DefaultLayout>
      <div>
        <div className="row">
          <form method='POST' action={editURL} className='w-100' >
            <div className='form-group'>
              <label htmlFor='question'>Question No.</label>
              <input type='text' className='form-control' id='question' name='id' defaultValue={this.props.id} readOnly/>
            </div>
            <div className='form-group'>
              <label htmlFor='question'>Question</label>
              <input type='text' className='form-control' id='question' name='question' defaultValue={this.props.question} required/>
            </div>
            <div className="form-group">
              <label htmlFor='answer_1'>Answer One (The correct answer)</label>
              <input type='text' className='form-control' id='answer1' name='answer_1' defaultValue={this.props.answer_1} required/>
            </div>
            <div className="form-group">
              <label htmlFor='answer_2'>Answer Two</label>
              <input type='text' className='form-control' id='answer1' name='answer_2' defaultValue={this.props.answer_2} required/>
            </div>
            <div className="form-group">
              <label htmlFor='answer_3'>Answer Three</label>
              <input type='text' className='form-control' id='answer1' name='answer_3' defaultValue={this.props.answer_3} required/>
            </div>
            <div className="form-group">
              <label htmlFor='answer_4'>Answer Four</label>
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

module.exports = EditQuestion
